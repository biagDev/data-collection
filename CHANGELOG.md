# Changelog

## 2026-05-17

### New analyses

- **`analyses/plus15-first-hit-bias/`** — new sibling to the main leaderboard. Re-derives directional bias from the **+15 min** window instead of +45, since the entry model trades inside +15. Produces `leaderboard.csv` with 53 armable buckets (was 0 before this work). Walks all `analyses/*/data/results.json` and supports 4 data shapes (NQ nested aggregate, ES flat, session, gold/globex). [README](analyses/plus15-first-hit-bias/README.md) + [EASY_READ](analyses/plus15-first-hit-bias/EASY_READ.md).
- **`analyses/plus15-entry-features/`** — feature-collection + entry-model home.
  - [Phase 2 collector](analyses/plus15-entry-features/pine/phase2_features.pine) (Pine) → CSV exports of close location, VWAP side, HTF trend, opening drive, PDH/PDL distance, plus first-hit outcome.
  - [Phase 3 — Magnet Compass](analyses/plus15-entry-features/pine/phase3_compass.pine) entry model (currently v11). Scoring + agreement filter + 5 stop styles + NY-only toggle + repaint-safe HTF read. See [SYSTEM.md](analyses/plus15-entry-features/SYSTEM.md) for full rules and version history.
  - [FINDINGS.md](analyses/plus15-entry-features/FINDINGS.md) — conditional analysis of the v1 collected features.
- **`analyses/es/rth-afternoon-candle-hit-stats/`** — closes the ES coverage gap. Eight new 15m subject candles from 11:00 AM through 3:45 PM ET, n=218–226 days each. 4 armable buckets land in the leaderboard. [README](analyses/es/rth-afternoon-candle-hit-stats/README.md) + [EASY_READ](analyses/es/rth-afternoon-candle-hit-stats/EASY_READ.md).

### Re-collected (existing analyses, replaced results.json with directional split)

- **`analyses/es/asia-candle-hit-stats/`** — n bumped 219→227, added `directional_split` block with first-hit fields. 5 armable buckets. [EASY_READ](analyses/es/asia-candle-hit-stats/EASY_READ.md).
- **`analyses/es/london-candle-hit-stats/`** — same treatment. 4 armable buckets including the strongest ES London magnet (3:45 AM, +16.6). [EASY_READ](analyses/es/london-candle-hit-stats/EASY_READ.md).

### Build script enhancement

- **`analyses/plus15-first-hit-bias/build.mjs`** — Family 3 (session) adapter now reads `hi_only_plus_15` / `lo_only_plus_15` when present in `directional_split.rows`, producing cleaner first-hit priors instead of falling back to any-hit. Backward compatible with older results.json files that lack these fields.

### Magnet Compass entry-model versions (in this session)

| Version | Highlights |
|---|---|
| v2 | Non-repainting fix (HTF security `[1]` + `lookahead_on`); stop-style dropdown |
| v3 | Table position dropdowns; color customization (Style group) |
| v4 | 12-hr AM/PM time; magnet H/L lines anchored to actual extremes; execution-window background shading; "Nearest swing low/high" stop style |
| v5 | Unswept-swing tracker (array + sweep removal); pivot-based stop lookup |
| v6 | Execution-window bg gated to armed-only (was painting whole chart) |
| v7 | ES Asia priors (5 buckets) |
| v8 | Fixed float-division bug in bucket-time formatter; fixed `+#.#` format on negatives; removed marginal 15:45 buckets |
| v9 | Reclassified TIMEOUT trades by end-of-window close vs entry (WIN if past entry, LOSS otherwise); removed timeouts row from stats |
| v10 | NY-session-only toggle; gated lines/labels to priored buckets only |
| v11 | NQ London 03:45 added (+7.3); ES London (4 buckets) + ES RTH afternoon (4 buckets) priors added → 19 active ES buckets, 16 NQ, 12 GC |

### Documentation backfilled

- [SYSTEM.md](analyses/plus15-entry-features/SYSTEM.md) brought current with v11 (was stuck at v2).
- New EASY_READ files for ES Asia, ES London, ES RTH afternoon.
- Pine collector source for ES RTH+London preserved at [analyses/es/rth-afternoon-candle-hit-stats/pine/](analyses/es/rth-afternoon-candle-hit-stats/pine/) (was previously inline-only in TV editor).
