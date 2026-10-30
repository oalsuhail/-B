#!/usr/bin/env python3
"""AI Website Generator — generates complete websites from a text description.

Improvements over v1:
  - Session persistence: save/resume/list sessions so you can refine iteratively.
  - Two-phase generation: Plan phase (structured JSON plan) → Build phase (tool calls).
    Claude codes with a roadmap, reducing wasted back-and-forth turns.
  - Context compaction: old file-content tool results are compressed to stubs so the
    growing conversation stays token-lean without losing structural context.
  - Multi-checkpoint prompt caching: cache after system+tools AND after the plan phase,
    not just on the last message block.
"""

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

import anthropic

# ---------------------------------------------------------------------------
# Prompts
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """You are an expert web developer AI agent. Your job is to generate complete, \
production-ready websites based on user descriptions.

When generating a website:
1. Always create `index.html` as the main entry point
2. Create a separate `styles.css` for all styling
3. Create a separate `app.js` for interactivity (only if needed)
4. Write clean, semantic HTML5 with proper meta tags and accessibility attributes
5. Use modern CSS (flexbox, grid, custom properties, responsive design)
6. Make the site mobile-friendly with a viewport meta tag
7. Use CDN-hosted libraries (via <script src="..."> tags) when helpful — no build tools
8. After creating all files, give a short summary of what you built

Create every file using the `create_file` tool. Be thorough — the user expects a \
fully working website they can open directly in a browser."""

PLAN_PROMPT = """\
Before writing any code, produce a structured JSON build plan for this website.
Output ONLY valid JSON — no markdown fences, no prose.

Schema:
{
  "title": "short site title",
  "pages": ["index.html", ...],
  "sections": ["hero", "about", ...],
  "color_scheme": {"primary": "#hex", "secondary": "#hex", "background": "#hex", "text": "#hex"},
  "fonts": ["Font Name", ...],
  "js_features": ["feature description", ...],
  "cdn_libs": ["lib + version", ...],
  "file_plan": [{"filename": "index.html", "purpose": "..."}, ...]
}"""

# ---------------------------------------------------------------------------
# Tool definitions
# ---------------------------------------------------------------------------

TOOLS = [
    {
        "name": "create_file",
        "description": (
            "Create or overwrite a file in the output directory. "
            "Use this to write HTML, CSS, JavaScript, images references, etc."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "filename": {
                    "type": "string",
                    "description": "File name including extension, e.g. 'index.html', 'styles.css', 'app.js'",
                },
                "content": {
                    "type": "string",
                    "description": "Complete file content to write",
                },
            },
            "required": ["filename", "content"],
        },
    },
    {
        "name": "read_file",
        "description": "Read a file that was previously created, useful for reviewing or cross-referencing content.",
        "input_schema": {
            "type": "object",
            "properties": {
                "filename": {
                    "type": "string",
                    "description": "File name to read",
                },
            },
            "required": ["filename"],
        },
    },
]

# ---------------------------------------------------------------------------
# Session management
# ---------------------------------------------------------------------------

SESSIONS_DIR = Path("sessions")


def _session_path(session_id: str) -> Path:
    return SESSIONS_DIR / f"{session_id}.json"


def save_session(session_id: str, description: str, messages: list, output_dir: Path) -> None:
    SESSIONS_DIR.mkdir(exist_ok=True)
    data = {
        "id": session_id,
        "description": description,
        "output_dir": str(output_dir),
        "updated_at": datetime.now().isoformat(),
        "messages": _serialise_messages(messages),
    }
    _session_path(session_id).write_text(json.dumps(data, indent=2), encoding="utf-8")


def load_session(session_id: str) -> dict:
    path = _session_path(session_id)
    if not path.exists():
        raise FileNotFoundError(f"Session '{session_id}' not found.")
    return json.loads(path.read_text(encoding="utf-8"))


def list_sessions() -> list[dict]:
    if not SESSIONS_DIR.exists():
        return []
    sessions = []
    for p in sorted(SESSIONS_DIR.glob("*.json"), key=lambda x: x.stat().st_mtime, reverse=True):
        try:
            d = json.loads(p.read_text(encoding="utf-8"))
            sessions.append({"id": d["id"], "description": d["description"], "updated_at": d["updated_at"]})
        except Exception:
            pass
    return sessions


def _serialise_messages(messages: list) -> list:
    """Convert Anthropic content block objects to plain dicts for JSON storage."""
    result = []
    for msg in messages:
        content = msg.get("content", [])
        if isinstance(content, list):
            blocks = []
            for block in content:
                if isinstance(block, dict):
                    blocks.append(block)
                else:
                    # Anthropic SDK model objects → dict
                    blocks.append(block.model_dump() if hasattr(block, "model_dump") else dict(block))
            result.append({"role": msg["role"], "content": blocks})
        else:
            result.append(msg)
    return result


# ---------------------------------------------------------------------------
# Context compaction
# ---------------------------------------------------------------------------

_STUB_THRESHOLD = 2000  # characters — results longer than this get compressed


def compact_old_tool_results(messages: list, keep_last_n: int = 2) -> list:
    """Replace file content in old tool_result blocks with a short stub.

    Keeps the last `keep_last_n` user turns untouched so Claude still sees
    recent context in full detail.
    """
    # Find indices of user turns that contain tool_results
    user_turn_indices = [i for i, m in enumerate(messages) if m["role"] == "user"]
    cutoff = len(user_turn_indices) - keep_last_n

    compacted = []
    for i, msg in enumerate(messages):
        if msg["role"] != "user" or i not in user_turn_indices:
            compacted.append(msg)
            continue

        turn_index = user_turn_indices.index(i)
        if turn_index >= cutoff:
            # Recent turn — keep as-is
            compacted.append(msg)
            continue

        # Older turn — compress large tool_result content blocks
        new_content = []
        for block in msg.get("content", []):
            if isinstance(block, dict) and block.get("type") == "tool_result":
                inner = block.get("content", "")
                if isinstance(inner, str) and len(inner) > _STUB_THRESHOLD:
                    block = {**block, "content": f"[content compressed — {len(inner):,} chars]"}
            new_content.append(block)
        compacted.append({**msg, "content": new_content})

    return compacted


# ---------------------------------------------------------------------------
# Prompt caching helpers
# ---------------------------------------------------------------------------


def _add_cache_point(block: dict) -> dict:
    return {**block, "cache_control": {"type": "ephemeral"}}


def _set_cache_on_last_block(messages: list) -> None:
    """Add cache_control to the last content block of the last message."""
    if not messages:
        return
    content = messages[-1].get("content", [])
    if not isinstance(content, list) or not content:
        return
    last = content[-1]
    if isinstance(last, dict) and "cache_control" not in last:
        last["cache_control"] = {"type": "ephemeral"}


# ---------------------------------------------------------------------------
# Two-phase generation
# ---------------------------------------------------------------------------


def run_plan_phase(client: anthropic.Anthropic, description: str, verbose: bool) -> dict | None:
    """Phase 1 — ask Claude for a structured JSON build plan before any file creation."""
    print("📋  Phase 1/2: Planning…")

    system = [
        {
            "type": "text",
            "text": SYSTEM_PROMPT,
            "cache_control": {"type": "ephemeral"},
        }
    ]

    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": (
                        f"Website description:\n\n{description}\n\n"
                        f"{PLAN_PROMPT}"
                    ),
                    "cache_control": {"type": "ephemeral"},
                }
            ],
        }
    ]

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=system,
        messages=messages,
    )

    if verbose:
        u = response.usage
        print(
            f"[plan] in={u.input_tokens} out={u.output_tokens} "
            f"cache_read={u.cache_read_input_tokens or 0} "
            f"cache_write={u.cache_creation_input_tokens or 0}"
        )

    raw = ""
    for block in response.content:
        if block.type == "text":
            raw += block.text

    try:
        plan = json.loads(raw.strip())
        print(f"  ✓  Plan: {plan.get('title', '(untitled)')} | files: {[f['filename'] for f in plan.get('file_plan', [])]}")
        return plan
    except json.JSONDecodeError:
        print("  ⚠️  Could not parse plan JSON — skipping planning phase.")
        return None


def _build_user_message_with_plan(description: str, plan: dict | None) -> dict:
    plan_section = ""
    if plan:
        plan_section = (
            f"\n\nHere is the structured build plan you must follow:\n"
            f"```json\n{json.dumps(plan, indent=2)}\n```\n"
            "Stick to this plan. Create every file listed in `file_plan`."
        )

    return {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": (
                    f"Please create a complete website for the following description:\n\n"
                    f"{description}"
                    f"{plan_section}\n\n"
                    "Create all necessary HTML, CSS, and JavaScript files using the "
                    "create_file tool. Make it look great and work in the browser."
                ),
                "cache_control": {"type": "ephemeral"},
            }
        ],
    }


# ---------------------------------------------------------------------------
# Main generation loop
# ---------------------------------------------------------------------------


def generate_website(
    description: str,
    output_dir: Path,
    verbose: bool = False,
    resume_messages: list | None = None,
    session_id: str | None = None,
) -> list:
    client = anthropic.Anthropic()

    system = [
        {
            "type": "text",
            "text": SYSTEM_PROMPT,
            "cache_control": {"type": "ephemeral"},
        }
    ]

    if resume_messages:
        messages = resume_messages
        plan = None
        print(f"\n🔁  Resuming session '{session_id}' ({len(messages)} messages in history)")
        print(f"📁  Output → {output_dir.resolve()}\n")
    else:
        # Phase 1 — plan
        plan = run_plan_phase(client, description, verbose)

        print(f"\n🤖  Phase 2/2: Building — {description[:70]}…")
        print(f"📁  Output → {output_dir.resolve()}\n")

        messages: list[dict] = [_build_user_message_with_plan(description, plan)]

    total_input = total_output = total_cache_read = total_cache_write = 0

    for iteration in range(1, 25):
        # Compact old turns to keep context lean
        working_messages = compact_old_tool_results(messages)

        # Cache the growing conversation prefix before each API call
        _set_cache_on_last_block(working_messages)

        if verbose:
            print(f"[iter {iteration}] → API call (context msgs: {len(working_messages)})")

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=8192,
            system=system,
            tools=TOOLS,
            messages=working_messages,
        )

        u = response.usage
        total_input += u.input_tokens
        total_output += u.output_tokens
        total_cache_read += u.cache_read_input_tokens or 0
        total_cache_write += u.cache_creation_input_tokens or 0

        if verbose:
            print(
                f"[iter {iteration}] stop={response.stop_reason} | "
                f"in={u.input_tokens} out={u.output_tokens} "
                f"cache_read={u.cache_read_input_tokens or 0} "
                f"cache_write={u.cache_creation_input_tokens or 0}"
            )

        tool_calls = []
        for block in response.content:
            if block.type == "text" and block.text.strip():
                print(f"Claude: {block.text}\n")
            elif block.type == "tool_use":
                tool_calls.append(block)

        # Append assistant turn to the canonical (uncompacted) messages list
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "end_turn" or not tool_calls:
            break

        tool_results = []
        for tc in tool_calls:
            fname = tc.input.get("filename", tc.name)
            print(f"  📝  {tc.name}: {fname}")
            result = _execute_tool(tc.name, tc.input, output_dir)
            if verbose:
                print(f"       → {result[:120]}")
            tool_results.append(
                {
                    "type": "tool_result",
                    "tool_use_id": tc.id,
                    "content": result,
                }
            )

        messages.append({"role": "user", "content": tool_results})

        # Persist session after each successful round
        if session_id:
            save_session(session_id, description, messages, output_dir)

    cache_savings_pct = (
        round(total_cache_read / (total_input + total_cache_read) * 100, 1)
        if (total_input + total_cache_read) > 0
        else 0
    )
    print(
        f"\n📊  Token usage — input: {total_input:,} | output: {total_output:,} | "
        f"cache read: {total_cache_read:,} | cache write: {total_cache_write:,} "
        f"({cache_savings_pct}% served from cache)"
    )

    return messages


# ---------------------------------------------------------------------------
# File system tool executor
# ---------------------------------------------------------------------------


def _execute_tool(name: str, inputs: dict, output_dir: Path) -> str:
    if name == "create_file":
        filename = Path(inputs["filename"]).name
        content = inputs["content"]
        path = output_dir / filename
        path.write_text(content, encoding="utf-8")
        return f"Created {filename} ({len(content):,} bytes)"

    if name == "read_file":
        filename = Path(inputs["filename"]).name
        path = output_dir / filename
        if not path.exists():
            return f"Error: '{filename}' not found"
        return path.read_text(encoding="utf-8")

    return f"Error: unknown tool '{name}'"


# ---------------------------------------------------------------------------
# Output dir helpers
# ---------------------------------------------------------------------------


def make_output_dir(description: str, custom: str | None) -> Path:
    if custom:
        d = Path("output") / custom
    else:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        slug = "".join(c if c.isalnum() else "_" for c in description[:40]).strip("_").lower()
        d = Path("output") / f"{slug}_{timestamp}"
    d.mkdir(parents=True, exist_ok=True)
    return d


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def main() -> None:
    parser = argparse.ArgumentParser(
        description="AI Website Generator — describe a website, get working HTML/CSS/JS files",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
examples:
  python website_agent.py "A portfolio site for a photographer"
  python website_agent.py "A landing page for a coffee shop" --verbose
  python website_agent.py --interactive
  python website_agent.py --resume my-session-id --refine "Add a dark mode toggle"
  python website_agent.py --list-sessions
        """,
    )
    parser.add_argument("description", nargs="?", help="Website description")
    parser.add_argument("-v", "--verbose", action="store_true", help="Show token usage per iteration")
    parser.add_argument("-i", "--interactive", action="store_true", help="Prompt for description interactively")
    parser.add_argument("-o", "--output", metavar="DIR", help="Custom output sub-directory name")
    parser.add_argument("-s", "--session", metavar="ID", help="Save under a named session ID")
    parser.add_argument("--resume", metavar="SESSION_ID", help="Resume a previous session")
    parser.add_argument("--refine", metavar="INSTRUCTION", help="Refinement instruction when resuming a session")
    parser.add_argument("--list-sessions", action="store_true", help="List saved sessions and exit")
    args = parser.parse_args()

    # -- list sessions -------------------------------------------------------
    if args.list_sessions:
        sessions = list_sessions()
        if not sessions:
            print("No saved sessions found.")
        else:
            print(f"{'ID':<36}  {'Updated':<20}  Description")
            print("─" * 90)
            for s in sessions:
                print(f"{s['id']:<36}  {s['updated_at'][:19]:<20}  {s['description'][:50]}")
        return

    # -- resume session -------------------------------------------------------
    if args.resume:
        try:
            sess = load_session(args.resume)
        except FileNotFoundError as e:
            print(f"Error: {e}")
            sys.exit(1)

        description = sess["description"]
        output_dir = Path(sess["output_dir"])
        output_dir.mkdir(parents=True, exist_ok=True)
        messages = sess["messages"]
        session_id = args.resume

        # Optionally append a refinement instruction
        if args.refine:
            messages.append(
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": args.refine,
                            "cache_control": {"type": "ephemeral"},
                        }
                    ],
                }
            )

        try:
            messages = generate_website(
                description, output_dir, verbose=args.verbose,
                resume_messages=messages, session_id=session_id,
            )
        except anthropic.AuthenticationError:
            print("Error: invalid API key. Set ANTHROPIC_API_KEY.")
            sys.exit(1)
        except KeyboardInterrupt:
            print("\nInterrupted.")
            sys.exit(0)

        save_session(session_id, description, messages, output_dir)
        _print_output_summary(output_dir)
        return

    # -- new generation -------------------------------------------------------
    if args.interactive or not args.description:
        print("🌐  AI Website Generator")
        print("─" * 40)
        description = input("Describe the website you want:\n> ").strip()
        if not description:
            print("Error: no description provided.")
            sys.exit(1)
    else:
        description = args.description

    output_dir = make_output_dir(description, args.output)

    session_id = args.session or (
        "".join(c if c.isalnum() else "-" for c in description[:30]).strip("-").lower()
        + "-" + datetime.now().strftime("%Y%m%d%H%M%S")
    )

    try:
        messages = generate_website(
            description, output_dir, verbose=args.verbose, session_id=session_id,
        )
    except anthropic.AuthenticationError:
        print("Error: invalid API key. Set ANTHROPIC_API_KEY.")
        sys.exit(1)
    except anthropic.RateLimitError:
        print("Error: rate limit hit. Try again in a moment.")
        sys.exit(1)
    except anthropic.APIError as e:
        print(f"API error: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nInterrupted.")
        sys.exit(0)

    save_session(session_id, description, messages, output_dir)
    print(f"\n💾  Session saved: {session_id}")
    print(f"    Resume later with: python website_agent.py --resume {session_id}")
    print(f"    Refine with:       python website_agent.py --resume {session_id} --refine \"your change\"")

    _print_output_summary(output_dir)


def _print_output_summary(output_dir: Path) -> None:
    files = sorted(output_dir.iterdir())
    if files:
        print(f"\n✅  Done! Files in {output_dir}/")
        for f in files:
            print(f"   {f.name}  ({f.stat().st_size:,} bytes)")
        print(f"\n💡  Open {output_dir}/index.html in your browser.")
    else:
        print("\n⚠️  No files were created.")


if __name__ == "__main__":
    main()
