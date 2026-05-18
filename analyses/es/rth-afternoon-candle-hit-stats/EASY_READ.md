# ES RTH Afternoon Candle Retest — Easy Read

## What this answers

"For each 15-minute candle from 11 AM to market close on ES1!, how likely is its high or low to get touched again within the next 15, 30, or 45 minutes — and which side leans first?"

Filled a gap: ES had directional data for 9:30–10:45 AM RTH only. This adds the rest of the regular session.

## When the data was collected

- **As of**: 2026-05-17
- **Sample**: 218–226 trading days per candle
- **Symbol**: CME_MINI:ES1!
- **Timeframe**: 15-minute candles
- **Window**: 11:00 AM – 4:00 PM ET (eight subject candles, 15m apart)

## How to read the rows

Each subject candle has its own row in `data/results.json` under three sections:

| Section | What it tells you |
|---|---|
| `either_side_retest` | % of days where EITHER the high OR low got touched (by +15 min) |
| `both_sides_sweep` | % of days where BOTH sides got touched (full sweep) inside +15 min |
| `directional_split` | Per-side breakdown — which extreme got hit and how often, broken into "first-hit only" and "any-hit" flavors |

## Jargon

- **Subject candle** — the 15m candle whose H/L we're measuring against.
- **Retest / hit / touched** — a later candle's wick reached back to the subject's high or low.
- **`hi_only_15`** — % of days where the high was retested within +15 min AND the low was NOT (cleanest "high tagged first" signal).
- **`lo_only_15`** — same for low.
- **`both_15`** — both sides touched within +15 min (full sweep).
- **`hi_any_15`** — high was touched at all (alone or with low). Equals `hi_only_15 + both_15`.
- **`lo_any_15`** — low was touched at all.
- **`+30` / `+45`** — same metrics but over a longer forward window.
- **First-hit edge** — `hi_only / (hi_only + lo_only)` − 0.5, expressed in pct points × 2. This is the prior the entry model uses.
- **Armable** — bucket has enough sample AND the edge is at least ±3 pct points (otherwise: balanced, no usable lean).

## Where this feeds

[analyses/plus15-first-hit-bias/build.mjs](../../plus15-first-hit-bias/build.mjs) reads this file and writes the per-candle prior into `leaderboard.csv`. The Magnet Compass indicator then bakes the priors into its `bias_prior()` function.

**4 of the 8 candles are armable**:

| Candle | Side | Edge |
|---|---|---:|
| 11:30 AM | HIGH | +15.2 |
| 12:00 PM | HIGH | +10.4 |
| 01:00 PM | HIGH | +8.4 |
| 02:00 PM | HIGH | +9.6 |

The 11:00 AM, 12:30 PM, 3:00 PM, and 3:45 PM candles came in balanced (essentially 50/50) and are excluded.

The 3:45 PM candle in particular is unusually weak — only 39% retest rate within +15 min vs 80–90% for every other RTH candle. Likely a quirk of pre-close behavior; not actionable.

## How to re-collect

Open [pine/es_rth_london_retest_directional.pine](pine/es_rth_london_retest_directional.pine) on a 15m ES1! chart. Load all available history. Read the table via `data_get_pine_tables`, split rows: candles 3:00 AM–4:15 AM go into `../london-candle-hit-stats/data/results.json`, candles 11:00 AM–3:45 PM update this file. Then re-run the leaderboard build.
