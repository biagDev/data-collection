# NQ 11:00 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 11:00-11:15 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 11:00-11:15 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 11:15):

- **By 11:30** — the 11:15-11:30 candle (1 candle after subject closes)
- **By 11:45** — adds 11:30-11:45 (2 candles)
- **By 12:00** — adds 11:45-12:00 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 11:30 | By 11:45 | By 12:00 |
|---|---|---|---|
| **Either side** | 199 (89.64%) | 214 (96.40%) | **220 (99.10%)** |
| **Both sides** | 20 (9.01%) | 59 (26.58%) | **74 (33.33%)** |
| High only | 94 (42.34%) | 83 (37.39%) | 80 (36.04%) |
| Low only | 85 (38.29%) | 72 (32.43%) | 66 (29.73%) |
| Neither | 23 (10.36%) | 8 (3.60%) | 2 (0.90%) |
| **High touched (any)** | 114 (51.35%) | 142 (63.96%) | 154 (69.37%) |
| **Low touched (any)** | 105 (47.30%) | 131 (59.01%) | 140 (63.06%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 11:30 | 86.67 | 84.44 | 93.33 | 95.35 | 88.64 |
| By 11:45 | 95.56 | 95.56 | 97.78 | 97.67 | 95.45 |
| By 12:00 | 97.78 | 97.78 | 100.00 | 100.00 | 100.00 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 11:30 | 13.33 | 6.67 | 8.89 | 6.98 | 9.09 |
| By 11:45 | 31.11 | 26.67 | 26.67 | 20.93 | 27.27 |
| By 12:00 | 35.56 | 31.11 | 35.56 | 30.23 | 34.09 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1130 / Lo1130 | 19 / 14 | 21 / 14 | 15 / 23 | 22 / 16 | 17 / 18 |
| Hi1145 / Lo1145 | 20 / 9 | 15 / 16 | 14 / 18 | 19 / 14 | 15 / 15 |
| Hi1200 / Lo1200 | 20 / 8 | 16 / 14 | 13 / 16 | 16 / 14 | 15 / 14 |

## Files

- `pine/1100_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
