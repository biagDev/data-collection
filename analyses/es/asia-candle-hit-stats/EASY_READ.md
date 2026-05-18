# ES Asia Candle Retest — Easy Read

## What this answers

"For each 15-minute candle during the Asia session on ES1!, how likely is its high or low to get touched again within the next 15, 30, or 45 minutes — and which side leans first?"

## When the data was collected

- **As of**: 2026-05-17
- **Sample**: 227 trading days
- **Symbol**: CME_MINI:ES1!
- **Timeframe**: 15-minute candles
- **Session window**: 8:00 PM – 9:30 PM ET (six subject candles)

## How to read the rows

Each subject candle (8:00 PM through 9:15 PM ET) has its own row in `data/results.json` under three sections:

| Section | What it tells you |
|---|---|
| `either_side_retest` | % of days where EITHER the high OR low got touched (by +15 min) |
| `both_sides_sweep` | % of days where BOTH sides got touched (full sweep) |
| `directional_split` | Per-side breakdown — which extreme got hit and how often, broken into "first-hit only" and "any-hit" flavors |

## Jargon

- **Subject candle** — the 15m candle whose H/L we're measuring against.
- **Retest / hit / touched** — a later candle's wick reached back to the subject's high or low.
- **`hi_only_15`** — % of days where the high was retested within +15 min AND the low was NOT (cleanest "high tagged first" signal).
- **`lo_only_15`** — same for low.
- **`both_15`** — both sides touched within +15 min.
- **`hi_any_15`** — high was touched at all (alone or with low). Equals `hi_only_15 + both_15`.
- **`lo_any_15`** — low was touched at all. Equals `lo_only_15 + both_15`.
- **`+30` / `+45`** — same metrics but over a longer forward window.
- **First-hit edge** — `hi_only / (hi_only + lo_only)` − 0.5, expressed in pct points × 2. This is the prior the entry model uses.

## Where this feeds

These results are consumed by [analyses/plus15-first-hit-bias/build.mjs](../../plus15-first-hit-bias/build.mjs), which computes a per-bucket "first-hit prior" and writes it into `leaderboard.csv`. The Magnet Compass indicator then bakes those priors into its [bias_prior() function](../../plus15-entry-features/pine/phase3_compass.pine).

5 of the 6 ES Asia candles are armable in the entry model. The 8:15 PM candle came in balanced (essentially 50/50) and is excluded.

## How to re-collect

The [pine collector](pine/es_asia_retest_directional.pine) runs on a 15m ES1! chart. Apply it, scroll back to load all available history, read the table via `data_get_pine_tables`, and update `results.json`.
