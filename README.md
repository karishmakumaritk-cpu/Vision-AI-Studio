# HerBalance AI Studio

This repository implements an MVP frontend for the HerBalance AI product vision.

## Implemented user flow

1. Landing page with product positioning and clear CTA
2. Automation catalog with 6 click-to-start cards
3. Setup wizard per automation (3 questions)
4. Live generation screen with progress bar
5. Result preview with sample outputs
6. Trial activation form (email capture)
7. Custom automation request form
8. Pricing section (Starter, Pro, Business)

## Tech stack in this repo

- Vite frontend (plain JavaScript)
- Deployment config for Vercel (`vercel.json`)
- Optional GitHub Pages compatibility (`vite.config.js`)

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

## UI assets

- Current layout intentionally follows the earlier website structure.
- Hero and automation card visuals now use Unsplash free stock image URLs.
- If you want to download local copies, run:

```bash
bash scripts/download-images.sh
```

Then update image paths in `src/main.js` to `/images/...`.
