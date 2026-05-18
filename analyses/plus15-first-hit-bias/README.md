# +15 First-Hit Bias

Re-derives the directional prior used by the magnet leaderboard, but using **only the +15 minute window** instead of +45.

## Why

The leaderboard's `bias` column (`high` / `low` / `balanced`) is computed from `hi_any_+45` vs `lo_any_+45`. That answers: *over a 45-minute window, which side gets touched at all more often.*

For a scalp that must resolve inside +15 minutes, that prior is the wrong question. We need: *within the first 15 minutes, which side gets hit first.*

The two answers can differ — both in magnitude (almost always smaller at +15) and occasionally in direction. This analysis recomputes the prior from each bucket's +15 data so it can feed an entry model intended for 15-minute scalps.

## How

For every `analyses/*/data/results.json` (including nested asset folders like `es/`, `gc/`), extract whatever +15 directional fields are available and compute two priors:

| Prior | Formula | Available where |
|---|---|---|
| **first_hit** | `high_only_15 / (high_only_15 + low_only_15)` | NQ nested aggregate shape only — has `high_only` / `low_only` |
| **any_hit** | `hi_any_15 − lo_any_15` (edge, in pct points) | Everywhere with directional +15 data |

The script prefers `first_hit` when usable (n ≥ 30 first-hit days), falling back to `any_hit` otherwise. `first_hit` is the cleaner signal because it excludes both-side days where the order of touch is unknown from candle data alone.

A bucket is marked **armable** when `n ≥ 100` (matches the leaderboard "prelim" threshold) and the chosen prior is not `balanced` (|edge| ≥ 3 pct points).

## Outputs

- `data/results.json` — full structured output, sorted by `|prior_edge|` desc
- `data/leaderboard.csv` — flat row per bucket for spreadsheet inspection

## Rebuild

```sh
node analyses/plus15-first-hit-bias/build.mjs
```

No collection needed — pure transform over existing analyses.

## Caveats

- Where only `any_hit` is available, the edge is biased upward by both-side days. Treat its magnitude as approximate; the sign is reliable.
- The intraday NQ buckets show a persistent `high` lean at +15. That's a property of the data (high gets hit first more often than low across most regular-hours candles), not a bug. It means "trade the high-side magnet by default" is the baseline — the entry model's job is to *override* the prior when live features disagree, not to confirm it.
- Bias here is unconditional. Conditioning on candle color, location vs VWAP, or HTF trend (the v2 entry-model features) will likely flip the prior in a meaningful subset of cases. That's the next analysis.
