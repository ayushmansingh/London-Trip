# London, with love.

A scrollytelling visualization of a sixteen-day trip through England & Scotland (May 2026), built from a Google Sheet and rendered as a single-page web experience.

## What's inside

Four acts, scroll-driven:

- **Act I — Hero**: full-bleed UK map with the rail route and live stats counters (days, cities, kilometres, total spent).
- **Act II — The Journey**: sticky map with sixteen day-cards. Scrolling each card flies the camera to that day's stay.
- **Act III — The Numbers**: D3 dashboard — budget treemap, per-night stay strip, schematic rail network with cost-weighted lines, cumulative spend chart, tour cards.
- **Act IV — Two travelers**: who-paid-what breakdown, animated payment-flow ribbons (Sankey-style), settlement, and a passport-stamp closer.

## Tech

- Vite + React 18 + TypeScript
- MapLibre GL JS (free OSM raster tiles, sepia-filtered for a vintage feel)
- D3 v7 — all charts hand-built
- Framer Motion — entry animations
- Lenis — smooth scroll
- Tailwind CSS v4
- Editorial-light theme: parchment background, paper-grain SVG overlay, Cormorant Garamond / Lora / EB Garamond serifs

## Run

```sh
npm install
npm run dev
```

Open <http://localhost:5173>.

## Optional: prettier map tiles

By default the map uses free OpenStreetMap raster tiles with a CSS sepia filter. For the hand-painted *Stamen Watercolor* look, get a free key from <https://stadiamaps.com/> (no card required) and add to `.env`:

```
VITE_STADIA_KEY=your_key_here
```

The map style auto-switches.

## Build

```sh
npm run build
npm run preview
```

`dist/` is a static deployable bundle.

## Data

All numbers in `src/data/*` are sourced from the original Google Sheet:

- `itinerary.ts` — 16 days
- `stays.ts` — per-night cost (INR thousands)
- `rail.ts` — 11 segments + Railcard (INR raw)
- `tours.ts` — Man City, Skye, Storr, Glenfinnan
- `spends.ts` — Ayushman vs Dhwani per-line ledger
- `budget.ts` — category totals
- `locations.ts` — hand-coded city coordinates
