# website-agent — قاعدة المعرفة

## ما هذا المشروع
CLI بايثون: وصف موقع بالنص → Claude ينشئ HTML + CSS + JS كاملة.
Python 3, Anthropic SDK, agentic loop.

---

## البنية

```
website-agent/
├── website_agent.py    ← كل المنطق في ملف واحد
├── requirements.txt    ← anthropic فقط
└── output/             ← ينشأ تلقائياً — لا ترفعه لـ git
    └── <slug>_<timestamp>/
        ├── index.html
        ├── styles.css
        └── app.js
```

---

## الإعداد والتشغيل

```bash
cd website-agent
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-...

# تشغيل مباشر
python website_agent.py "موقع محفظة لمصور"

# وضع تفاعلي
python website_agent.py --interactive

# مع تفاصيل الـ tokens
python website_agent.py "landing page" --verbose

# اسم مخصص للمجلد
python website_agent.py "Blog" --output my-blog
```

---

## كيف يعمل (الـ Loop)

```
وصف نصي
    ↓
Claude (claude-sonnet-4-6)
    ↓ يستخدم tools
create_file → يكتب ملفات في output/
read_file   → يراجع ما كتبه
    ↓
يكرر حتى end_turn أو 24 iteration
    ↓
مجلد output/ جاهز — افتح index.html
```

---

## الملفات المرتبطة

### `website_agent.py` يحتوي على:
- `SYSTEM_PROMPT` — تعليمات Claude (لا تغيّر إلا بعد اختبار)
- `TOOLS` — تعريف create_file و read_file
- `generate_website()` — الـ loop الرئيسي (غيّر الـ model هنا فقط)
- `execute_tool()` — تنفيذ الـ tools (لا تزيل `Path(filename).name`)
- `_set_cache_on_last_block()` — prompt caching
- `main()` — CLI entry point

---

## قرارات مقررة — لا تغيّرها

| القرار | السبب |
|-------|-------|
| `Path(filename).name` في `execute_tool()` | يمنع path traversal — أمان |
| max 24 iterations | معظم المواقع تنتهي في 3–6 |
| `cache_control: ephemeral` | يخفض تكلفة الـ tokens في loops طويلة |
| model: `claude-sonnet-4-6` | يمكن تغييره في `generate_website()` فقط |

---

## المهارات المناسبة لهذا المشروع

| المهارة | متى |
|---------|-----|
| `/claude-api` | تطوير الـ agent، تحسين prompts، caching |
| `/security-review` | فحص أمني (path traversal، API keys) |
| `/simplify` | تنظيف الكود |
| `/review` | مراجعة PRs |
