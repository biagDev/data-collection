# +15 First-Hit Bias — Easy Read

## What this answers

"For each magnet candle bucket on the leaderboard, **which side is more likely to get hit first within the next 15 minutes** — the high or the low?"

The site's main leaderboard answers the same question for **45 minutes**. That's the wrong question if you're scalping a setup that must close inside 15. This page is the 15-minute version.

## How to read the leaderboard.csv

| Column | Plain English |
|---|---|
| **analysis_id** | Which source analysis the bucket came from (e.g. `1000-candle-hit-stats`) |
| **label** | Which candle / session this row describes (e.g. `10:00`, `asia 8:00 PM`) |
| **n** | Number of trading days in the sample. Below 100 = treat as preliminary |
| **armable** | `true` if the sample is big enough AND the prior is not "balanced". These are the only rows worth trading from |
| **high_only_15** | % of days where ONLY the high was hit within 15 min (low never touched) |
| **low_only_15** | % of days where ONLY the low was hit within 15 min |
| **high_any_15** | % of days where the high was hit at all (alone or in combination with the low) |
| **low_any_15** | % of days where the low was hit at all |
| **both_15** | % of days where both extremes were hit (a full sweep) inside 15 min |
| **first_hit_high_pct** | Of the days where exactly one side was hit, the % that were the high. This is the cleanest "which side first" number |
| **first_hit_n** | Sample size behind `first_hit_high_pct` (i.e. days where only one side was hit) |
| **any_hit_edge** | `high_any_15 − low_any_15`, in percentage points. Positive = high-leaning. Universally available |
| **any_hit_side** | `high`, `low`, or `balanced` from the any-hit calculation |
| **prior_source** | Which calculation was used as the official prior: `first_hit` (preferred) or `any_hit` (fallback) |
| **prior_side** | The bias side the entry model should use: `high`, `low`, or `balanced` |
| **prior_edge** | Magnitude of the lean, in pct points. Larger = stronger prior |

## Jargon

- **Magnet candle**: the 15-minute candle whose high and low are likely to get retested within the next 15–45 minutes. The leaderboard ranks these.
- **First hit**: which extreme (high or low) gets tagged by price *first* after the candle closes. The thing a scalper actually needs to predict.
- **Hit / touched / retested / tagged**: a later candle's wick reaches back to the magnet candle's high or low.
- **Prior**: the historical baseline probability — what we expect *before* looking at today's price action. The entry model combines this with live features to make a final call.
- **Armable**: bucket has enough sample and a clear enough lean to be worth trading. Non-armable buckets should be skipped, not faded.
- **Edge** (in this file): just the percentage-point gap between the high-side rate and the low-side rate. Not a P&L edge.

## How to use this in the entry model

1. When a magnet candle closes, look up its bucket in `leaderboard.csv`.
2. If `armable = false`, **pass** — no trade.
3. If `armable = true`, take `prior_side` as the default lean.
4. Score the live price-action features (proximity to high/low, HTF trend, liquidity pools, opening drive).
5. **Trade only when the live features agree with `prior_side`**, and size by how strongly they agree.

The whole point of this file is step 3 — making sure the lean you start with reflects the 15-minute reality, not a 45-minute average.
