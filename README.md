# micro-app-lite

Minimal template for shipping AI-powered micro apps fast.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **AI:** Claude API (Anthropic)
- **Deploy:** Vercel

## Quick Start

```bash
# 1. Clone this template
git clone https://github.com/aaronvle/micro-app-lite my-app
cd my-app

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# 4. Run locally
npm run dev
```

## Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts    ← Your AI endpoint
│   ├── layout.tsx          ← Metadata & fonts
│   ├── page.tsx            ← Main UI
│   └── globals.css         ← Styles
└── lib/
    └── ai.ts               ← AI helper functions
```

## Customization Checklist

- [ ] Update `app/layout.tsx` — title, description, OG tags
- [ ] Update `app/page.tsx` — UI, copy, branding
- [ ] Update `app/api/generate/route.ts` — system prompt & logic
- [ ] Add your domain to Vercel

## Deploy

1. Push to GitHub
2. Connect repo to Vercel
3. Add `ANTHROPIC_API_KEY` to Vercel environment variables
4. Deploy 🚀

## Adding Features

**Need a database?** Add Supabase:
```bash
npm install @supabase/supabase-js
```

**Need auth?** Add Supabase Auth or Clerk:
```bash
npm install @clerk/nextjs
```

**Need payments?** Add Stripe:
```bash
npm install stripe @stripe/stripe-js
```

---

Built by [@AaronVLe](https://twitter.com/AaronVLe) + [Alfred](https://github.com/alfred-promontory) 🎩
