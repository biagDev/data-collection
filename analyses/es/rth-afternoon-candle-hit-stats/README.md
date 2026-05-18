# ES RTH Afternoon Candle Retest

## What this is

Closes a coverage gap in the ES analysis suite. Before this, ES candle-hit-stats only existed for 9:30–10:45 AM ET (six RTH morning candles). Everything from 11:00 AM through market close had no directional data, so the Magnet Compass entry model had no priors for those windows.

This analysis fills in 8 missing 15m subject candles, spanning the entire RTH afternoon:

- 11:00 AM
- 11:30 AM
- 12:00 PM
- 12:30 PM
- 1:00 PM
- 2:00 PM
- 3:00 PM
- 3:45 PM

## When the data was collected

- **As of**: 2026-05-17
- **Sample**: 218–226 trading days per candle (slightly varying)
- **Symbol**: CME_MINI:ES1!
- **Timeframe**: 15-minute candles
- **Forward windows**: +15 / +30 / +45 minutes after subject close

## How collected

Pine indicator [pine/es_rth_london_retest_directional.pine](pine/es_rth_london_retest_directional.pine) runs on a 15m ES1! chart. It captures all 14 missing buckets (London 6 + RTH afternoon 8) in a single pass. The London rows update [../london-candle-hit-stats/data/results.json](../london-candle-hit-stats/data/results.json); the RTH afternoon rows feed [data/results.json](data/results.json) in this folder.

## Outputs

| File | Content |
|---|---|
| [data/results.json](data/results.json) | Per-candle retest stats with directional split: `hi_only`, `lo_only`, `both`, `hi_any`, `lo_any` for +15, +30, +45 windows |
| [EASY_READ.md](EASY_READ.md) | Plain-English column guide + jargon definitions |

## Results in the leaderboard

4 of the 8 candles are armable in the entry model:

| Time (ET) | Side | Edge | n |
|---|---|---:|---:|
| 11:30 AM | HIGH | +15.2 | 184 |
| 12:00 PM | HIGH | +10.4 | 174 |
| 1:00 PM | HIGH | +8.4 | 179 |
| 2:00 PM | HIGH | +9.6 | 166 |

The other 4 (11:00 AM, 12:30 PM, 3:00 PM, 3:45 PM) came in balanced (|edge| < 3 pct points) and are intentionally excluded from priors.

## Re-running

```
# Re-run Pine collector on a 15m ES1! chart, read the table, update data/results.json
# Then refresh the leaderboard:
node ../../plus15-first-hit-bias/build.mjs
# Then update bias_prior() in:
#   ../../plus15-entry-features/pine/phase3_compass.pine
```
