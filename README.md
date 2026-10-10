# Menace World Tech — Website

Static marketing website for **Menace World Tech**, a Zimbabwe-based social media and digital growth agency.

Built with [Astro](https://astro.build) (v7.3.8), plain TypeScript, and custom CSS. No framework runtime in the browser.

---

## Prerequisites

- Node.js ≥ 22.12.0
- npm (included with Node)

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

The dev server supports hot reload. All pages rebuild on save.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run verify` | Rebuild + run content/quality checks |
| `npm run astro -- ...` | Pass raw Astro CLI commands |

---

## Project structure

```
src/
  components/         Shared Astro components
    visuals/          Hero and showcase SVG/CSS artwork
  data/               Typed content — services, packages, site constants
  layouts/            BaseLayout.astro — shared HTML shell, SEO, nav
  lib/                whatsapp.ts — WA URL helpers
  pages/              One .astro file per route
  styles/             global.css — brand tokens and base styles
public/
  brand/              SVG logo mark and social card
  favicon.svg
scripts/
  verify-build.mjs    Build quality assertion script
```

---

## Deployment

The build output is in `dist/` — a fully static site with no server requirement.

**Any static host works:** Netlify, Vercel, Cloudflare Pages, GitHub Pages, or a plain file server.

Upload the contents of `dist/` to your host after running `npm run build`.

### Optional: set a canonical domain

The site works without a domain configured, but Open Graph and canonical URLs are emitted only when `SITE_URL` is set.

Set the environment variable before building:

```bash
SITE_URL=https://menaceworldtech.co.zw npm run build
```

Or add it to your host's environment variable panel.

---

## Updating content

### Contact number
`src/data/site.ts` — `PHONE_DISPLAY` and `PHONE_E164` and `WHATSAPP_NUMBER`.

### Service list and descriptions
`src/data/services.ts` — edit `services` array.

### Package tiers, add-ons, pricing, and FAQ
`src/data/packages.ts` — edit the relevant arrays.

### Page copy
Each page lives in `src/pages/`. Open the relevant `.astro` file and edit the copy directly. Data-driven sections (services, packages, FAQs) update automatically from the data files.

### Navigation
`src/data/site.ts` — `navigation` array.

---

## Replacing concept artwork with real campaign images

The `CampaignShowcase` component (`src/components/visuals/CampaignShowcase.astro`) currently shows original SVG/CSS concept creative clearly labelled as illustrative — not client work.

To replace it with real campaign images:

1. Add optimised images to `public/campaigns/` (WebP recommended, ≤ 200 KB each).
2. Open `src/components/visuals/CampaignShowcase.astro`.
3. Replace the SVG compositions with `<img>` elements pointing to `/campaigns/your-image.webp`.
4. Add descriptive `alt` text describing what is shown and its marketing context.
5. Remove the "Concept creative / not client work" label from `src/pages/index.astro` once the images represent real, permissioned work.

---

## Brand tokens

All brand colours, spacing, typography, and radii are CSS custom properties defined at the top of `src/styles/global.css`. Edit them once; everything updates site-wide.

Key tokens:
- `--color-violet` `#7C21F5` — primary brand accent
- `--color-magenta` `#F20ECF` — secondary accent / CTAs
- `--color-cyan` `#12DDF3` — highlights and focus states
- `--color-base` `#05030A` — page background

---

## Verify before deploying

```bash
npm run verify
```

Runs a full rebuild and checks for required content, WhatsApp numbers, pricing, prohibited placeholder text, and guarantee language. Exits with code 0 on pass, 1 on failure.
