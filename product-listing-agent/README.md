# Product Listing Agent

Turns raw product notes into a ready-to-post **Amazon.sa / Noon** listing —
title, bullets, description, backend keywords, and a social caption — in
English, Arabic, or both.

## Setup
```bash
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-ant-...
```

## Use
```bash
python listing_agent.py "Wireless earbuds, 30h battery, IPX7, ANC, black/white"
python listing_agent.py --file notes.txt --lang both -o listing.json
```

## Monetize it
- Package as a **Fiverr gig**: "I'll write your Amazon/Noon listing in English + Arabic in 24h."
- Sell as a **Gumroad self-serve tool**: seller pastes product notes, gets a JSON/PDF back.
- Offer as a retainer to Saudi Amazon/Noon sellers: 10 listings/month subscription.
- Bundle with the real-estate-agent and support-reply-agent as an "AI content pack" offer.
