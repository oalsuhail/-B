#!/usr/bin/env python3
"""AI Real Estate Marketing Agent — turns raw property details into a full
marketing kit for Saudi real estate agents: a listing description, 3 social
captions, a WhatsApp broadcast message, and a cold-outreach message —
in English and Arabic.

Sellable as a service to individual Saudi real estate agents/brokers who need
fast marketing copy per listing (aligned with Vision 2030 real-estate growth).

Usage:
    python realestate_agent.py "4BR villa, Riyadh Al Narjis, 450 sqm, new build, private pool"
    python realestate_agent.py --file property.txt --lang both -o kit.json
"""

import argparse
import json
import sys
from pathlib import Path

import anthropic

MODEL = "claude-sonnet-4-6"

SYSTEM_PROMPT = """You are an expert real estate marketing copywriter for the Saudi market \
(Riyadh, Jeddah, Dammam and other cities). Given raw property details, produce a full \
marketing kit for an agent to post immediately.

Rules:
- Listing description: 3-4 persuasive, scannable paragraphs highlighting location, size, \
  key features, and lifestyle appeal. Mention nearby landmarks/districts only if given.
- 3 social captions: short, punchy, each for a different platform feel (Instagram, X/Twitter, \
  Snapchat), each with 3-5 relevant hashtags (e.g. #عقار #الرياض #عقارات_السعودية).
- WhatsApp broadcast: 2-3 lines, friendly and direct, ends with a clear call to action \
  (call/DM/schedule viewing).
- Cold outreach message: short message an agent can send to a cold lead who might be interested,
  personalized-feeling but generic enough to reuse.
- If Arabic is requested, write naturally for Saudi buyers (not literal translation) — use \
  Gulf-appropriate real estate terms, keep numbers/units as digits.

Return ONLY valid JSON matching this schema, no markdown fences, no prose:
{
  "english": {"listing_description": "", "social_captions": ["", "", ""], "whatsapp_broadcast": "", "cold_outreach": ""},
  "arabic":  {"listing_description": "", "social_captions": ["", "", ""], "whatsapp_broadcast": "", "cold_outreach": ""}
}
Omit the "arabic" key entirely if Arabic was not requested; omit "english" if only Arabic was requested."""


def build_user_prompt(notes: str, lang: str) -> str:
    lang_instruction = {
        "en": "Generate the marketing kit in English only.",
        "ar": "Generate the marketing kit in Arabic only.",
        "both": "Generate the marketing kit in both English and Arabic.",
    }[lang]
    return f"Property details:\n\n{notes}\n\n{lang_instruction}"


def generate_kit(notes: str, lang: str, verbose: bool = False) -> dict:
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


def print_kit(kit: dict) -> None:
    for lang_key, label in (("english", "ENGLISH"), ("arabic", "ARABIC")):
        block = kit.get(lang_key)
        if not block:
            continue
        print(f"\n{'=' * 60}\n{label}\n{'=' * 60}")
        print(f"\nLISTING DESCRIPTION:\n{block['listing_description']}")
        print("\nSOCIAL CAPTIONS:")
        for c in block["social_captions"]:
            print(f"  • {c}")
        print(f"\nWHATSAPP BROADCAST:\n{block['whatsapp_broadcast']}")
        print(f"\nCOLD OUTREACH:\n{block['cold_outreach']}")
    if "raw" in kit:
        print(kit["raw"])


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate a bilingual real-estate marketing kit from property details.")
    parser.add_argument("notes", nargs="?", help="Raw property details")
    parser.add_argument("--file", metavar="PATH", help="Read property details from a file instead")
    parser.add_argument("--lang", choices=["en", "ar", "both"], default="both", help="Output language(s)")
    parser.add_argument("-o", "--output", metavar="PATH", help="Save JSON output to this file")
    parser.add_argument("-v", "--verbose", action="store_true", help="Print token usage")
    args = parser.parse_args()

    if args.file:
        notes = Path(args.file).read_text(encoding="utf-8")
    elif args.notes:
        notes = args.notes
    else:
        print("Error: provide property details as an argument or via --file.")
        sys.exit(1)

    try:
        kit = generate_kit(notes, args.lang, verbose=args.verbose)
    except anthropic.AuthenticationError:
        print("Error: invalid API key. Set ANTHROPIC_API_KEY.")
        sys.exit(1)
    except anthropic.APIError as e:
        print(f"API error: {e}")
        sys.exit(1)

    if args.output:
        Path(args.output).write_text(json.dumps(kit, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Saved to {args.output}")
    else:
        print_kit(kit)


if __name__ == "__main__":
    main()
