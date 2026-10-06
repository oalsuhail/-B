# Real Estate Marketing Agent

Turns raw property details into a full marketing kit for Saudi real estate
agents — listing description, 3 social captions, a WhatsApp broadcast, and a
cold-outreach message — in English, Arabic, or both.

## Setup
```bash
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-ant-...
```

## Use
```bash
python realestate_agent.py "4BR villa, Riyadh Al Narjis, 450 sqm, new build, private pool"
python realestate_agent.py --file property.txt --lang both -o kit.json
```

## Monetize it
- Sell per-listing: agents pay a flat fee per property for a ready-to-post kit.
- Monthly retainer for brokers with high listing volume (e.g. 20 listings/month).
- Position around **Vision 2030** real-estate growth (Riyadh expansion, giga-projects)
  as a differentiator when pitching to agents.
- Bundle with product-listing-agent and support-reply-agent as an "AI content pack".
