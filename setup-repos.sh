#!/bin/bash
# تشغيل هذا السكريبت من أي مجلد خارج -B
# المتطلبات: git + gh CLI مسجّل الدخول
# الاستخدام: bash setup-repos.sh

set -e

GITHUB_USER="oalsuhail"
SOURCE_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "📁 المصدر: $SOURCE_DIR"
echo ""

# ── 1. studio-site ──────────────────────────────────────────
echo "🚀 إنشاء oalsuhail/studio-site ..."
gh repo create "$GITHUB_USER/studio-site" \
  --public \
  --description "Animated studio/agency marketing site — React 19, Framer Motion, Vite"

SITE_DIR="$(dirname "$SOURCE_DIR")/studio-site"
mkdir -p "$SITE_DIR"

git -C "$SITE_DIR" init
git -C "$SITE_DIR" checkout -b main

# نسخ ملفات studio-site
cp "$SOURCE_DIR/index.html"     "$SITE_DIR/"
cp "$SOURCE_DIR/package.json"   "$SITE_DIR/"
cp "$SOURCE_DIR/package-lock.json" "$SITE_DIR/"
cp "$SOURCE_DIR/vite.config.js" "$SITE_DIR/"
cp "$SOURCE_DIR/.gitignore"     "$SITE_DIR/"
cp "$SOURCE_DIR/src/CLAUDE.md"  "$SITE_DIR/CLAUDE.md"
cp -r "$SOURCE_DIR/src"         "$SITE_DIR/"
rm "$SITE_DIR/src/CLAUDE.md"    # موجود في الجذر

git -C "$SITE_DIR" add .
git -C "$SITE_DIR" commit -m "Initial commit — studio-site (React 19, Framer Motion, Vite)"
git -C "$SITE_DIR" remote add origin "https://github.com/$GITHUB_USER/studio-site.git"
git -C "$SITE_DIR" push -u origin main

echo "✅ studio-site جاهز → https://github.com/$GITHUB_USER/studio-site"
echo ""

# ── 2. website-agent ────────────────────────────────────────
echo "🚀 إنشاء oalsuhail/website-agent ..."
gh repo create "$GITHUB_USER/website-agent" \
  --public \
  --description "AI website generator CLI — Python, Anthropic SDK"

AGENT_DIR="$(dirname "$SOURCE_DIR")/website-agent-repo"
mkdir -p "$AGENT_DIR"

git -C "$AGENT_DIR" init
git -C "$AGENT_DIR" checkout -b main

# نسخ ملفات website-agent
cp "$SOURCE_DIR/website-agent/website_agent.py" "$AGENT_DIR/"
cp "$SOURCE_DIR/website-agent/requirements.txt"  "$AGENT_DIR/"
cp "$SOURCE_DIR/website-agent/CLAUDE.md"         "$AGENT_DIR/CLAUDE.md"

# .gitignore للـ Python
cat > "$AGENT_DIR/.gitignore" <<'EOF'
output/
__pycache__/
*.pyc
.env
venv/
.venv/
EOF

git -C "$AGENT_DIR" add .
git -C "$AGENT_DIR" commit -m "Initial commit — website-agent (Python, Anthropic SDK)"
git -C "$AGENT_DIR" remote add origin "https://github.com/$GITHUB_USER/website-agent.git"
git -C "$AGENT_DIR" push -u origin main

echo "✅ website-agent جاهز → https://github.com/$GITHUB_USER/website-agent"
echo ""

# ── 3. ملخص ─────────────────────────────────────────────────
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ الفصل اكتمل"
echo ""
echo "   https://github.com/$GITHUB_USER/studio-site"
echo "   https://github.com/$GITHUB_USER/website-agent"
echo ""
echo "الخطوة التالية: أرشف أو احذف مستودع -B"
echo "   gh repo archive $GITHUB_USER/-B"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
