# ES London Session Candle Retest — Easy Read

## What this answers

"For each 15-minute candle during the London open killzone on ES1!, how likely is its high or low to get touched again within the next 15, 30, or 45 minutes — and which side leans first?"

## When the data was collected

- **As of**: 2026-05-17 (replaces the older 2026-05-04 dataset, which lacked directional split)
- **Sample**: 227 trading days
- **Symbol**: CME_MINI:ES1!
- **Timeframe**: 15-minute candles
- **Session window**: 3:00 AM – 4:30 AM ET (six subject candles)

## How to read the rows

Each subject candle (3:00 AM through 4:15 AM ET) has its own row in `data/results.json` under three sections:

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
- **`lo_any_15`** — low was touched at all.
- **`+30` / `+45`** — same metrics but over a longer forward window.
- **First-hit edge** — `hi_only / (hi_only + lo_only)` − 0.5, expressed in pct points × 2.

## Where this feeds

These results are consumed by [analyses/plus15-first-hit-bias/build.mjs](../../plus15-first-hit-bias/build.mjs), which writes priors into `leaderboard.csv`. The Magnet Compass entry model then bakes those into its prior table.

**4 of the 6 ES London candles are armable** in the entry model:

| Candle | Side | Edge |
|---|---|---:|
| 3:00 AM | HIGH | +3.1 |
| 3:30 AM | HIGH | +11.1 |
| **3:45 AM** | HIGH | **+16.6** (strongest London bucket on ES) |
| 4:00 AM | HIGH | +5.4 |

The 3:15 AM and 4:15 AM candles came in balanced/weak and are excluded from priors.

The 3:45 AM candle stands out — same time of day as the strongest NQ London magnet, virtually identical retest profile.

## How to re-collect

The Pine collector that produced this data is at [analyses/es/rth-afternoon-candle-hit-stats/pine/es_rth_london_retest_directional.pine](../rth-afternoon-candle-hit-stats/pine/es_rth_london_retest_directional.pine) — it bundles London + RTH afternoon in a single pass. Run on a 15m ES1! chart, load all available history, read the table via MCP, update `results.json` rows for the London candles.
