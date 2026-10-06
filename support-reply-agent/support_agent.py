#!/usr/bin/env python3
"""AI Support Reply Agent — drafts a polite, on-brand reply to a customer
message/review/complaint (hotel guest, online buyer, tenant, etc.) in
English or Arabic, matching a chosen tone.

This one is a *helper*, not a paid product: use it to save time answering
guest reviews, DMs, and support tickets.

Usage:
    python support_agent.py "Guest says AC was broken and check-in was slow" --tone apologetic
    python support_agent.py --file message.txt --lang ar --tone professional
"""

import argparse
import sys
from pathlib import Path

import anthropic

MODEL = "claude-sonnet-4-6"

SYSTEM_PROMPT = """You are a customer support specialist for hospitality, e-commerce, and \
real estate businesses in Saudi Arabia. Given a customer message, complaint, or review, \
draft a short, warm, professional reply.

Rules:
- 3-6 sentences. No corporate jargon, no over-apologizing.
- Acknowledge the specific issue mentioned, don't be generic.
- Offer a concrete next step (refund, follow-up, discount, escalation) only if it's \
  reasonable to imply one; otherwise just reassure and invite further contact.
- Match the requested tone exactly.
- Write in the requested language only (natural Gulf Arabic if Arabic is requested, \
  not literal translation)."""


def build_user_prompt(message: str, tone: str, lang: str) -> str:
    lang_name = "Arabic" if lang == "ar" else "English"
    return (
        f"Customer message:\n\n{message}\n\n"
        f"Write a reply in {lang_name}. Tone: {tone}."
    )


def generate_reply(message: str, tone: str, lang: str, verbose: bool = False) -> str:
    client = anthropic.Anthropic()

    response = client.messages.create(
        model=MODEL,
        max_tokens=512,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": build_user_prompt(message, tone, lang)}],
    )

    if verbose:
        u = response.usage
        print(f"[usage] in={u.input_tokens} out={u.output_tokens}", file=sys.stderr)

    return "".join(b.text for b in response.content if b.type == "text").strip()


def main() -> None:
    parser = argparse.ArgumentParser(description="Draft a support/review reply from a customer message.")
    parser.add_argument("message", nargs="?", help="The customer message, complaint, or review")
    parser.add_argument("--file", metavar="PATH", help="Read the message from a file instead")
    parser.add_argument("--tone", default="professional and warm",
                         help="Tone, e.g. 'apologetic', 'professional', 'friendly and brief'")
    parser.add_argument("--lang", choices=["en", "ar"], default="en", help="Reply language")
    parser.add_argument("-v", "--verbose", action="store_true", help="Print token usage")
    args = parser.parse_args()

    if args.file:
        message = Path(args.file).read_text(encoding="utf-8")
    elif args.message:
        message = args.message
    else:
        print("Error: provide a message as an argument or via --file.")
        sys.exit(1)

    try:
        reply = generate_reply(message, args.tone, args.lang, verbose=args.verbose)
    except anthropic.AuthenticationError:
        print("Error: invalid API key. Set ANTHROPIC_API_KEY.")
        sys.exit(1)
    except anthropic.APIError as e:
        print(f"API error: {e}")
        sys.exit(1)

    print(reply)


if __name__ == "__main__":
    main()
