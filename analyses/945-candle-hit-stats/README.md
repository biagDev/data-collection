# NQ 9:45 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 9:45-10:00 ET candle (the 2nd 15-minute candle of the regular session) within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 9:45-10:00 ET
- **Sample**: 232 trading days (same chart history as the 9:30 analysis)
- **Data captured**: 2026-04-25
- **Method**: Pine Script indicator across all loaded chart history; counts emitted via on-chart tables read back over the MCP

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L).

| Bucket | Meaning |
|---|---|
| Either side | High OR low was retraced |
| Both sides | High AND low both retraced (full sweep) |
| High only | High retraced, low did NOT |
| Low only | Low retraced, high did NOT |
| Neither | Neither extreme was retraced |
| High touched (any) | `high_only + both` |
| Low touched (any) | `low_only + both` |

Three forward windows are measured (each cumulative from 10:00):

- **By 10:15** — the 10:00-10:15 candle (1 candle after subject closes)
- **By 10:30** — the 10:00-10:15 + 10:15-10:30 candles (2 candles)
- **By 10:45** — the 10:00-10:15 + 10:15-10:30 + 10:30-10:45 candles (3 candles)

## Aggregate Results (n=232)

| Outcome | By 10:15 | By 10:30 | By 10:45 |
|---|---|---|---|
| **Either side** | 189 (81.47%) | 216 (93.10%) | **225 (96.98%)** |
| **Both sides** | 6 (2.59%) | 23 (9.91%) | 34 (14.66%) |
| High only | 103 (44.40%) | 111 (47.84%) | 108 (46.55%) |
| Low only | 80 (34.48%) | 82 (35.34%) | 83 (35.78%) |
| Neither | 43 (18.53%) | 16 (6.90%) | 7 (3.02%) |
| High touched (any) | 109 (46.98%) | 134 (57.76%) | 142 (61.21%) |
| Low touched (any) | 86 (37.07%) | 105 (45.26%) | 117 (50.43%) |

### Key takeaways

- **The 9:45 candle is a slightly weaker magnet than the 9:30 candle.** By 15 min after close, only ~81% of days retest a side, vs. 90% for the 9:30 candle. By 45 min, both converge to ~97%.
- **High-bias persists.** Across all three windows, the high gets touched more often than the low (61.2% vs 50.4% by 10:45). Same directional skew as the 9:30 stats.
- **Full sweeps are rare in the first 15 min** (2.59%) but climb to 14.66% by 10:45 — slightly less than the 9:30 candle's 15.95% by 10:15.
- **18.5% of days never retest the 9:45 candle within 15 min after it closes** — meaningful price expansion away from this range is common right at the 10:00 mark.

## Comparison vs. 9:30 candle

For the same observation cutoff (45 min after candle close):

| Metric | 9:30 candle (by 10:15) | 9:45 candle (by 10:45) |
|---|---|---|
| Either hit | 96.98% | 96.98% |
| Both sides | 15.95% | 14.66% |
| High touched | 58.62% | 61.21% |
| Low touched | 54.31% | 50.43% |

Almost identical retrace rates — the 9:45 candle behaves like a slightly more high-skewed version of the 9:30 range.

## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 47 | 47 | 47 | 45 | 46 |
| By 10:15 | 80.85 | 76.60 | 85.11 | 75.56 | **89.13** |
| By 10:30 | 91.49 | 91.49 | 93.62 | 91.11 | **97.83** |
| By 10:45 | 95.74 | 91.49 | **100.00** | 97.78 | **100.00** |

### Both sides hit / full sweep (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 10:15 | 2.13 | **8.51** | 2.13 | 0.00 | 0.00 |
| By 10:30 | 8.51 | **19.15** | 8.51 | 11.11 | 2.17 |
| By 10:45 | 14.89 | **25.53** | 8.51 | 17.78 | 6.52 |

### Directional split — High-only / Low-only counts
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi15 / Lo15 | **28 / 9** | 16 / 16 | 22 / 17 | 16 / 18 | 21 / 20 |
| Hi30 / Lo30 | **27 / 12** | 19 / 15 | 22 / 18 | 20 / 16 | 23 / 21 |
| Hi45 / Lo45 | **26 / 12** | 16 / 15 | 23 / 20 | 21 / 15 | 22 / 21 |

### Day-of-week observations

- **Monday strongly bullish** at the 10:00 mark — the high gets retested ~3× as often as the low (28 vs 9 in the 10:15 window). Same Monday-bullish pattern seen in the 9:30 analysis.
- **Tuesday is the sweep day** — full retraces of both sides happen 25.5% of the time by 10:45, the highest of any DOW for either analysis.
- **Wednesday and Friday are 100% retest days** by 10:45 — every Wed and Fri in the sample touched at least one side within 45 min.
- **Friday is balanced directionally** — high and low retests are nearly equal across all windows (e.g. 22 / 21 by 10:45), unlike Friday's bullish-lean for the 9:30 candle.

## Caveats

- **Same 232-day sample** as the 9:30 analysis — limited by TradingView's 15m history depth for NQ1!.
- **Continuous contract roll noise** is included; not filtered.
- **Wick definition**: a "hit" only requires the candle's wick to reach the level, not a sustained close.

## Files

- `pine/945_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown

## Reproducing

1. Open `CME_MINI:NQ1!` on a 15m chart in TradingView Desktop with the MCP debug port enabled.
2. Scroll back to load full available history.
3. Add `pine/945_hit_stats.pine` as an indicator.
4. Read the on-chart tables via MCP: `data_get_pine_tables(study_filter="945 Hit Stats")`.
