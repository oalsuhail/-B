# Project Knowledge Base

## What this repo is

Two independent deliverables that live together:

| Folder | What it is | Stack |
|--------|-----------|-------|
| `src/` + root config | Animated studio/agency marketing site | React 19, Framer Motion, Vite |
| `website-agent/` | CLI tool — describe a site, get HTML/CSS/JS | Python 3, Anthropic SDK |

---

## Site — `src/`

### Architecture

```
src/
├── animations.js          # All Framer Motion variants (single source of truth)
├── App.jsx                # Root — assembles Nav + sections in order
├── main.jsx               # ReactDOM entry
├── index.css              # Global reset + base styles (dark theme, font)
└── components/
│   └── Nav.jsx            # Fixed header, scroll-driven blur + border
└── sections/
    ├── Hero.jsx           # Full-height hero, parallax orbs, stagger reveal
    ├── Features.jsx       # 6-card grid, hover lift + icon wiggle
    ├── Work.jsx           # 4-project alternating layout, accent-line animation
    ├── Testimonials.jsx   # Infinite ticker (two rows, opposite directions)
    └── CTA.jsx            # Gradient-glow box + footer
```

### Animation system (`animations.js`)

All variants are exported from one file and imported everywhere — do not inline variants inside components.

| Export | Use for |
|--------|---------|
| `fadeUp` | Section headers, single elements entering |
| `fadeIn` | Opacity-only reveal |
| `fadeLeft` / `fadeRight` | Horizontal slides |
| `staggerContainer` | Parent that staggers children (delay 0.1s, stagger 0.12s) |
| `staggerItem` | Direct child of a staggerContainer |
| `scaleIn` | Cards or boxes that scale from 0.85 |
| `viewport` | `{ once: true, amount: 0.2 }` — shared config for whileInView |

### Design tokens (in CSS / inline styles)

```
Background base:   #0a0a0f
Card background:   #13131a
Border:            #1e1e2e
Text primary:      #f1f5f9
Text secondary:    #94a3b8
Text muted:        #64748b
Brand purple:      #7c3aed
Brand purple light:#a78bfa
Brand blue:        #3b82f6
```

### Dev commands

```bash
npm run dev      # Vite dev server → http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Serve the build locally
```

---

## Website Agent — `website-agent/`

### What it does

Agentic loop: takes a plain-text site description → calls Claude with `create_file` / `read_file` tools → writes a complete static site (HTML + CSS + JS) into `output/<slug>_<timestamp>/`.

### Setup

```bash
cd website-agent
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-...
```

### Usage

```bash
# Positional description
python website_agent.py "A portfolio site for a photographer"

# Interactive prompt
python website_agent.py --interactive

# Verbose (shows token counts per iteration)
python website_agent.py "Coffee shop landing page" --verbose

# Custom output directory name
python website_agent.py "Blog" --output my-blog
```

Output goes to `website-agent/output/<dir>/index.html` — open directly in a browser.

### Key design decisions

- **Prompt caching**: system prompt and growing conversation history are cached with `cache_control: ephemeral` to cut costs on multi-turn loops.
- **Max 24 iterations**: safety cap; most sites complete in 3–6 turns.
- **No path traversal**: `Path(filename).name` strips any directory components from tool inputs.
- **Model**: `claude-sonnet-4-6` (can be changed in `generate_website()`).

---

## Git branches

| Branch | Purpose |
|--------|---------|
| `claude/organize-conversations-files-v34l8` | Current working branch |
| `claude/add-skills-feature-P9NQA` | Previous skills integration work |

## Skills installed (`.claude/skills/`)

`banner-design`, `brand`, `design`, `design-system`, `slides`, `ui-styling`, `ui-ux-pro-max`

---

## الملفات المرتبطة (File Dependencies)

قاعدة: قبل أي تعديل راجع الملفات المرتبطة أولاً.

### إذا عدّلت `animations.js`
أثّر على كل الأجزاء — راجع:
- `src/sections/Hero.jsx` — يستخدم `staggerContainer`, `staggerItem`
- `src/sections/Features.jsx` — يستخدم `staggerContainer`, `staggerItem`, `fadeUp`, `viewport`
- `src/sections/Work.jsx` — يستخدم `fadeUp`, `fadeLeft`, `fadeRight`, `scaleIn`, `staggerContainer`, `staggerItem`, `viewport`
- `src/sections/Testimonials.jsx` — يستخدم `fadeUp`, `viewport`
- `src/sections/CTA.jsx` — يستخدم `scaleIn`, `staggerContainer`, `staggerItem`, `viewport`

### إذا عدّلت `index.css`
- يؤثر على كل المشروع (reset + dark theme + font)
- راجع: `src/main.jsx` (نقطة استيراده)

### إذا عدّلت `App.jsx`
- راجع: كل ملفات `src/sections/` و `src/components/Nav.jsx`
- ترتيب الأقسام: Nav → Hero → Features → Work → Testimonials → CTA

### إذا عدّلت `Nav.jsx`
- مستقل — لا يستورد من sections
- يعتمد على: `framer-motion` فقط (scroll-driven animation)

---

## قرارات المشروع (Decisions Log)

سجل للقرارات التقنية المهمة — لا تعيد النقاش، نفّذ مباشرة.

### التنظيم العام
- **قرار:** `animations.js` مصدر واحد لكل variants — لا تكتب variants داخل الكومبوننت
- **قرار:** CSS داخل كل component كـ template literal (`const css = \`...\``) — لا ملفات CSS منفصلة لكل section
- **قرار:** design tokens محفوظة كـ CSS variables أو inline styles — لا مكتبة خارجية للـ theming

### website-agent
- **قرار:** الـ model هو `claude-sonnet-4-6` — يمكن تغييره في `generate_website()`
- **قرار:** الحد الأقصى 24 iteration — كافي، معظم المواقع تنتهي في 3–6
- **قرار:** `Path(filename).name` يمنع path traversal — لا تزيله

### مستقبلاً (خطوات مقررة لم تُنفَّذ بعد)
- فصل المشروعين إلى ريبوهات مستقلة: `studio-site` و `website-agent`
- إنشاء `main` branch وتعيينه كـ default بدلاً من `claude/add-skills-feature-P9NQA`
- تغيير اسم الريبو من `-B` إلى اسم واضح

---

## كيف تضيف محادثة جديدة لهذا الملف

1. بعد أي محادثة مفيدة — لا تحفظ المحادثة كاملة
2. استخرج القرار أو الدرس في جملة واحدة
3. أضفه تحت القسم المناسب أعلاه
4. مثال: `- **قرار:** استخدم ease [0.22, 1, 0.36, 1] بدل easeOut على العناصر الكبيرة`
