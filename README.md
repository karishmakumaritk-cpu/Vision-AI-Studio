# HerBalance AI Studio

This repository now implements an MVP frontend for the HerBalance AI product vision.

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

## Next backend integration steps

1. Replace trial form handler with API call: `POST /api/trials/start`
2. Persist automations using `POST /api/automations/create`
3. Read generated previews from backend response instead of static sample arrays
4. Connect billing action to Razorpay checkout endpoint
5. Add authentication and dashboard routes
