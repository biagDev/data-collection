# NQ 15:00 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 15:00-15:15 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 15:00-15:15 ET
- **Sample**: 214 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 15:15):

- **By 15:30** — the 15:15-15:30 candle (1 candle after subject closes)
- **By 15:45** — adds 15:30-15:45 (2 candles)
- **By 16:00** — adds 15:45-16:00 (3 candles)

## Aggregate Results (n=214)

| Outcome | By 15:30 | By 15:45 | By 16:00 |
|---|---|---|---|
| **Either side** | 190 (88.79%) | 207 (96.73%) | **212 (99.07%)** |
| **Both sides** | 15 (7.01%) | 49 (22.90%) | **87 (40.65%)** |
| High only | 87 (40.65%) | 78 (36.45%) | 66 (30.84%) |
| Low only | 88 (41.12%) | 80 (37.38%) | 59 (27.57%) |
| Neither | 24 (11.21%) | 7 (3.27%) | 2 (0.93%) |
| **High touched (any)** | 102 (47.66%) | 127 (59.35%) | 153 (71.50%) |
| **Low touched (any)** | 103 (48.13%) | 129 (60.28%) | 146 (68.22%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 42 | 45 | 44 | 41 | 42 |
| By 15:30 | 85.71 | 95.56 | 86.36 | 85.37 | 90.48 |
| By 15:45 | 97.62 | 97.78 | 95.45 | 95.12 | 97.62 |
| By 16:00 | 97.62 | 100.00 | 100.00 | 97.56 | 100.00 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 15:30 | 7.14 | 13.33 | 2.27 | 7.32 | 4.76 |
| By 15:45 | 26.19 | 28.89 | 13.64 | 19.51 | 26.19 |
| By 16:00 | 40.48 | 48.89 | 31.82 | 43.90 | 38.10 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1530 / Lo1530 | 12 / 21 | 21 / 16 | 21 / 16 | 12 / 20 | 21 / 15 |
| Hi1545 / Lo1545 | 11 / 19 | 17 / 14 | 22 / 14 | 14 / 17 | 14 / 16 |
| Hi1600 / Lo1600 | 10 / 14 | 14 / 9 | 19 / 11 | 11 / 11 | 12 / 14 |

## Files

- `pine/1500_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
