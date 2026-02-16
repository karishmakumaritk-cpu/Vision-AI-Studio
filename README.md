# Vision AI Studio

This repository implements an MVP frontend for the Vision AI product vision.

## Implemented user flow

1. Landing page with product positioning and clear CTA
2. Automation catalog with click-to-start cards
3. Setup wizard per automation (3 questions)
4. Live generation screen with progress bar
5. Result preview with sample outputs
6. Trial activation form (email capture)
7. Custom automation request form
8. Pricing section (Starter, Pro, Business)
9. CX query AI chatbot for quick customer query resolution

## New additions while keeping previous layout

- Previous website layout/design is preserved
- New automation-focused methods section added
- New automation products section added
- Free CX Query Assistant chatbot added (rule-based, no paid API)
- Premium visual effects added without changing flow: particle background, parallax hero, tilt cards, magnetic CTA buttons, reveal-on-scroll sections, and custom cursor

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

## Content protection note

Basic front-end content protection is enabled for static sections (disable right-click, copy, cut, drag, and common copy/save shortcuts).
This prevents casual copying but no browser-only method can guarantee 100% protection against advanced users.
