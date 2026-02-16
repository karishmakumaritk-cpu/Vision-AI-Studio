# HerBalance AI Studio

This repository implements an MVP landing page and automation setup flow for HerBalance AI.

## Implemented user flow

1. Landing page with premium hero, trust indicators, and CTA
2. Automation catalog with 6 clickable cards
3. Setup wizard (3 questions)
4. Live generation screen with animated progress
5. Result preview + trial email capture
6. Custom automation request form
7. Pricing section

## Visual redesign highlights

- Glassmorphism containers and subtle animated background blobs
- Scroll reveal animations using IntersectionObserver
- High-quality Unsplash visuals for hero and automation cards
- Improved spacing, hierarchy, and responsive behavior

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel deployment

- Framework preset: Vite
- Root directory: `./`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

## Image notes

This environment blocks external downloads, so `scripts/download-images.sh` is included for local use.
When run in a normal network environment, it downloads Unsplash assets into `public/images`.

```bash
bash scripts/download-images.sh
```

After downloading, switch image URLs in `src/main.js` to local paths (`/images/...`) if needed.
