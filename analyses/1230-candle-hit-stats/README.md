# NQ 12:30 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 12:30-12:45 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 12:30-12:45 ET
- **Sample**: 214 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 12:45):

- **By 13:00** — the 12:45-13:00 candle (1 candle after subject closes)
- **By 13:15** — adds 13:00-13:15 (2 candles)
- **By 13:30** — adds 13:15-13:30 (3 candles)

## Aggregate Results (n=214)

| Outcome | By 13:00 | By 13:15 | By 13:30 |
|---|---|---|---|
| **Either side** | 187 (87.38%) | 200 (93.46%) | **206 (96.26%)** |
| **Both sides** | 22 (10.28%) | 52 (24.30%) | **74 (34.58%)** |
| High only | 81 (37.85%) | 72 (33.64%) | 61 (28.50%) |
| Low only | 84 (39.25%) | 76 (35.51%) | 71 (33.18%) |
| Neither | 27 (12.62%) | 14 (6.54%) | 8 (3.74%) |
| **High touched (any)** | 103 (48.13%) | 124 (57.94%) | 135 (63.08%) |
| **Low touched (any)** | 106 (49.53%) | 128 (59.81%) | 145 (67.76%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 42 | 45 | 44 | 41 | 42 |
| By 13:00 | 85.71 | 86.67 | 86.36 | 85.37 | 92.86 |
| By 13:15 | 97.62 | 91.11 | 93.18 | 90.24 | 95.24 |
| By 13:30 | 97.62 | 95.56 | 93.18 | 97.56 | 97.62 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 13:00 | 4.76 | 13.33 | 15.91 | 12.20 | 4.76 |
| By 13:15 | 16.67 | 24.44 | 31.82 | 31.71 | 16.67 |
| By 13:30 | 26.19 | 33.33 | 50.00 | 39.02 | 23.81 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1300 / Lo1300 | 22 / 12 | 16 / 17 | 16 / 15 | 11 / 19 | 16 / 21 |
| Hi1315 / Lo1315 | 20 / 14 | 13 / 17 | 16 / 11 | 8 / 16 | 15 / 18 |
| Hi1330 / Lo1330 | 16 / 14 | 13 / 15 | 11 / 8 | 8 / 16 | 13 / 18 |

## Files

- `pine/1230_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
