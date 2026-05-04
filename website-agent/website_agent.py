#!/usr/bin/env python3
"""AI Website Generator — generates complete websites from a text description."""

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

import anthropic

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


def make_output_dir(description: str, custom: str | None) -> Path:
    if custom:
        d = Path("output") / custom
    else:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        slug = "".join(c if c.isalnum() else "_" for c in description[:40]).strip("_").lower()
        d = Path("output") / f"{slug}_{timestamp}"
    d.mkdir(parents=True, exist_ok=True)
    return d


def execute_tool(name: str, inputs: dict, output_dir: Path) -> str:
    if name == "create_file":
        filename = Path(inputs["filename"]).name  # strip any path traversal
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


def _set_cache_on_last_block(messages: list) -> None:
    """Add cache_control to the last content block of the last message.

    This caches the full conversation prefix so subsequent turns reuse it.
    """
    if not messages:
        return
    content = messages[-1].get("content", [])
    if not isinstance(content, list) or not content:
        return
    last = content[-1]
    if isinstance(last, dict):
        last["cache_control"] = {"type": "ephemeral"}


def generate_website(description: str, output_dir: Path, verbose: bool = False) -> None:
    client = anthropic.Anthropic()

    # System prompt with cache_control — tools render before system, so this
    # caches (tools + system) together on every call.
    system = [
        {
            "type": "text",
            "text": SYSTEM_PROMPT,
            "cache_control": {"type": "ephemeral"},
        }
    ]

    messages: list[dict] = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": (
                        f"Please create a complete website for the following description:\n\n"
                        f"{description}\n\n"
                        "Create all necessary HTML, CSS, and JavaScript files using the "
                        "create_file tool. Make it look great and work in the browser."
                    ),
                }
            ],
        }
    ]

    print(f"\n🤖  Generating website: {description[:70]}...")
    print(f"📁  Output → {output_dir.resolve()}\n")

    total_input = total_output = total_cache_read = total_cache_write = 0

    for iteration in range(1, 25):
        # Cache the growing conversation prefix before each call
        _set_cache_on_last_block(messages)

        if verbose:
            print(f"[iter {iteration}] → API call")

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=8192,
            system=system,
            tools=TOOLS,
            messages=messages,
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

        # Collect tool calls and print any text blocks
        tool_calls = []
        for block in response.content:
            if block.type == "text" and block.text.strip():
                print(f"Claude: {block.text}\n")
            elif block.type == "tool_use":
                tool_calls.append(block)

        # Append assistant turn
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "end_turn" or not tool_calls:
            break

        # Execute tools and feed results back
        tool_results = []
        for tc in tool_calls:
            fname = tc.input.get("filename", tc.name)
            print(f"  📝  {tc.name}: {fname}")
            result = execute_tool(tc.name, tc.input, output_dir)
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

    print(
        f"\n📊  Token usage — input: {total_input:,} | output: {total_output:,} | "
        f"cache read: {total_cache_read:,} | cache write: {total_cache_write:,}"
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="AI Website Generator — describe a website, get working HTML/CSS/JS files",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
examples:
  python website_agent.py "A portfolio site for a photographer"
  python website_agent.py "A landing page for a coffee shop" --verbose
  python website_agent.py --interactive
        """,
    )
    parser.add_argument("description", nargs="?", help="Website description")
    parser.add_argument("-v", "--verbose", action="store_true", help="Show token usage per iteration")
    parser.add_argument("-i", "--interactive", action="store_true", help="Prompt for description interactively")
    parser.add_argument("-o", "--output", metavar="DIR", help="Custom output sub-directory name")
    args = parser.parse_args()

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

    try:
        generate_website(description, output_dir, verbose=args.verbose)
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
