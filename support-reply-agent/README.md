# Support Reply Agent (helper)

Drafts a polite, on-brand reply to a guest review, DM, or complaint — in
English or Arabic, in the tone you choose. This one isn't meant to be sold;
it's a time-saver for daily front-desk/support work.

## Setup
```bash
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-ant-...
```

## Use
```bash
python support_agent.py "Guest says AC was broken and check-in was slow" --tone apologetic
python support_agent.py --file message.txt --lang ar --tone "professional and brief"
```
