# Dashboard (`site/`)

Static dashboard for the trading-stats data-collection repo. Built with Astro + Tailwind, deployed to GitHub Pages.

## Safety contract

This site is **strictly read-only** over `../analyses/**`. The collected data is the source of truth and must never be altered by anything here.

- `scripts/build-data.mjs` only ever **reads** `analyses/**` and only ever **writes** to `site/src/data/`. It has a hard guard (`assertWriteSafe`) that fails the build if a write target escapes `site/src/data/`.
- `scripts/validate-data.mjs` never writes anything.
- Generated data files (`src/data/*.json`) are gitignored — they are rebuilt on every `npm run build`.

## Local development

```bash
cd site
npm install
npm run dev        # runs build-data, then astro dev
```

## Build

```bash
npm run build      # validate -> build-data -> astro build  (output: dist/)
npm run preview    # serve dist/ locally
```

## Deploy

Pushing to `main` (when `analyses/**` or `site/**` changes) triggers
`.github/workflows/deploy.yml`, which validates, builds, and deploys `dist/`
to GitHub Pages.

## Custom domain (later)

In `astro.config.mjs`: set `site` to the custom domain, remove `base`, and add
`site/public/CNAME` containing the domain. No other changes needed.

## Pipeline phases

- **A** — scaffold + placeholder deploy *(current)*
- **B** — normalize all `analyses/**` into one schema (`analyses.json`, `leaderboard.json`, `compare.json`)
- **C** — home leaderboard page
- **D** — analyses index + per-analysis detail pages
- **E** — compare view + methodology page
- **F** — polish + live deploy verified
