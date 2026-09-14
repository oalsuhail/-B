#!/usr/bin/env python3
"""AI Product Listing Agent — turns raw product notes into a ready-to-post
Amazon / Noon listing (title, bullets, description, backend keywords, and a
short social caption) in English and Arabic.

Sellable as a service (Fiverr/Gumroad) to Saudi e-commerce sellers who need
fast, high-converting bilingual listings.

Usage:
    python listing_agent.py "Wireless earbuds, 30h battery, IPX7, noise cancelling, black/white"
    python listing_agent.py --file product_notes.txt --lang both -o listing.json
"""

import argparse
import json
import sys
from pathlib import Path

import anthropic

MODEL = "claude-sonnet-4-6"

SYSTEM_PROMPT = """You are an expert e-commerce copywriter specializing in Amazon.sa and \
Noon marketplace listings for the Saudi market. Given raw product notes, produce a \
high-converting listing.

Rules:
- Title: <=200 chars, keyword-rich, no promotional words banned by Amazon (best, #1, free).
- 5 bullet points: benefit-led, each starting with a short CAPITALIZED feature tag.
- Description: 3-4 short paragraphs, persuasive, scannable.
- Backend keywords: comma-separated, no repeats of words already in the title.
- Social caption: one short Instagram/TikTok-style caption with 5 relevant hashtags.
- If Arabic is requested, translate naturally for Saudi buyers (not literal) — use \
  Gulf-appropriate register, keep numbers/units as digits.

Return ONLY valid JSON matching this schema, no markdown fences, no prose:
{
  "english": {"title": "", "bullets": ["", "", "", "", ""], "description": "", "backend_keywords": "", "social_caption": ""},
  "arabic":  {"title": "", "bullets": ["", "", "", "", ""], "description": "", "backend_keywords": "", "social_caption": ""}
}
Omit the "arabic" key entirely if Arabic was not requested; omit "english" if only Arabic was requested."""


def build_user_prompt(notes: str, lang: str) -> str:
    lang_instruction = {
        "en": "Generate the listing in English only.",
        "ar": "Generate the listing in Arabic only.",
        "both": "Generate the listing in both English and Arabic.",
    }[lang]
    return f"Product notes:\n\n{notes}\n\n{lang_instruction}"


def generate_listing(notes: str, lang: str, verbose: bool = False) -> dict:
    client = anthropic.Anthropic()

    response = client.messages.create(
        model=MODEL,
        max_tokens=2048,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": build_user_prompt(notes, lang)}],
    )

    if verbose:
        u = response.usage
        print(f"[usage] in={u.input_tokens} out={u.output_tokens}", file=sys.stderr)

    raw = "".join(b.text for b in response.content if b.type == "text").strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        print("Warning: could not parse JSON, printing raw output.", file=sys.stderr)
        return {"raw": raw}


def print_listing(listing: dict) -> None:
    for lang_key, label in (("english", "ENGLISH"), ("arabic", "ARABIC")):
        block = listing.get(lang_key)
        if not block:
            continue
        print(f"\n{'=' * 60}\n{label}\n{'=' * 60}")
        print(f"\nTITLE:\n{block['title']}")
        print("\nBULLETS:")
        for b in block["bullets"]:
            print(f"  • {b}")
        print(f"\nDESCRIPTION:\n{block['description']}")
        print(f"\nBACKEND KEYWORDS:\n{block['backend_keywords']}")
        print(f"\nSOCIAL CAPTION:\n{block['social_caption']}")
    if "raw" in listing:
        print(listing["raw"])


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate a bilingual Amazon/Noon product listing from product notes.")
    parser.add_argument("notes", nargs="?", help="Raw product notes/description")
    parser.add_argument("--file", metavar="PATH", help="Read product notes from a file instead")
    parser.add_argument("--lang", choices=["en", "ar", "both"], default="both", help="Output language(s)")
    parser.add_argument("-o", "--output", metavar="PATH", help="Save JSON output to this file")
    parser.add_argument("-v", "--verbose", action="store_true", help="Print token usage")
    args = parser.parse_args()

    if args.file:
        notes = Path(args.file).read_text(encoding="utf-8")
    elif args.notes:
        notes = args.notes
    else:
        print("Error: provide product notes as an argument or via --file.")
        sys.exit(1)

    try:
        listing = generate_listing(notes, args.lang, verbose=args.verbose)
    except anthropic.AuthenticationError:
        print("Error: invalid API key. Set ANTHROPIC_API_KEY.")
        sys.exit(1)
    except anthropic.APIError as e:
        print(f"API error: {e}")
        sys.exit(1)

    if args.output:
        Path(args.output).write_text(json.dumps(listing, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Saved to {args.output}")
    else:
        print_listing(listing)


if __name__ == "__main__":
    main()
