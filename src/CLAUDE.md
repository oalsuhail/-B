# studio-site — قاعدة المعرفة

## ما هذا المشروع
موقع تسويقي متحرك لاستوديو تصميم — React 19, Framer Motion, Vite.

---

## البنية

```
src/
├── animations.js       ← مصدر واحد لكل variants — لا تكتب variants داخل component
├── App.jsx             ← يجمع: Nav → Hero → Features → Work → Testimonials → CTA
├── main.jsx            ← نقطة الدخول
├── index.css           ← reset + dark theme + font (يؤثر على كل شيء)
├── components/
│   └── Nav.jsx         ← مستقل، scroll-driven blur، لا يستورد من sections
└── sections/
    ├── Hero.jsx        ← parallax orbs, stagger reveal
    ├── Features.jsx    ← 6 cards, hover lift + icon wiggle
    ├── Work.jsx        ← 4 مشاريع متناوبة، accent-line animation
    ├── Testimonials.jsx← ticker لا نهائي (صفان، اتجاهان)
    └── CTA.jsx         ← gradient-glow box + footer
```

---

## نظام الأنيميشن (animations.js)

| Export | متى تستخدمه |
|--------|------------|
| `fadeUp` | عناوين الأقسام، عناصر فردية |
| `fadeIn` | opacity فقط |
| `fadeLeft` / `fadeRight` | انزلاق أفقي |
| `staggerContainer` | parent يرتّب ظهور أبنائه |
| `staggerItem` | ابن مباشر لـ staggerContainer |
| `scaleIn` | بطاقات تظهر من 0.85 |
| `viewport` | `{ once: true, amount: 0.2 }` — مشترك لكل whileInView |

---

## الملفات المرتبطة

### إذا عدّلت `animations.js` → راجع أولاً:
- `Hero.jsx` — `staggerContainer`, `staggerItem`
- `Features.jsx` — `staggerContainer`, `staggerItem`, `fadeUp`, `viewport`
- `Work.jsx` — `fadeUp`, `fadeLeft`, `fadeRight`, `scaleIn`, `staggerContainer`, `staggerItem`, `viewport`
- `Testimonials.jsx` — `fadeUp`, `viewport`
- `CTA.jsx` — `scaleIn`, `staggerContainer`, `staggerItem`, `viewport`

### إذا عدّلت `index.css` → يؤثر على كل المشروع → راجع `main.jsx`
### إذا عدّلت `App.jsx` → راجع كل sections + Nav.jsx

---

## توكنز التصميم

```
خلفية:        #0a0a0f
بطاقة:        #13131a
حدود:         #1e1e2e
نص أساسي:    #f1f5f9
نص ثانوي:    #94a3b8
نص خافت:     #64748b
بنفسجي:       #7c3aed
بنفسجي فاتح: #a78bfa
أزرق:         #3b82f6
```

---

## أوامر التطوير

```bash
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview  # معاينة البناء
```

---

## قرارات مقررة

- `animations.js` مصدر واحد — لا variants داخل components
- CSS كـ template literal داخل كل component — لا ملفات CSS منفصلة
- Design tokens كـ inline styles أو CSS variables — لا مكتبة theming خارجية

---

## المهارات المناسبة لهذا المشروع

| المهارة | متى |
|---------|-----|
| `/ui-ux-pro-max` | تصميم section جديدة |
| `/design-system` | توسيع نظام الـ tokens |
| `/ui-styling` | إضافة shadcn/ui components |
| `/review` | مراجعة كود قبل الدمج |
