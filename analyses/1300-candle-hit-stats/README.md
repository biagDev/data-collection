# NQ 13:00 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 13:00-13:15 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 13:00-13:15 ET
- **Sample**: 214 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 13:15):

- **By 13:30** — the 13:15-13:30 candle (1 candle after subject closes)
- **By 13:45** — adds 13:30-13:45 (2 candles)
- **By 14:00** — adds 13:45-14:00 (3 candles)

## Aggregate Results (n=214)

| Outcome | By 13:30 | By 13:45 | By 14:00 |
|---|---|---|---|
| **Either side** | 187 (87.38%) | 209 (97.66%) | **213 (99.53%)** |
| **Both sides** | 18 (8.41%) | 54 (25.23%) | **77 (35.98%)** |
| High only | 89 (41.59%) | 89 (41.59%) | 83 (38.79%) |
| Low only | 80 (37.38%) | 66 (30.84%) | 53 (24.77%) |
| Neither | 27 (12.62%) | 5 (2.34%) | 1 (0.47%) |
| **High touched (any)** | 107 (50.00%) | 143 (66.82%) | 160 (74.77%) |
| **Low touched (any)** | 98 (45.79%) | 120 (56.07%) | 130 (60.75%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 42 | 45 | 44 | 41 | 42 |
| By 13:30 | 92.86 | 86.67 | 84.09 | 85.37 | 88.10 |
| By 13:45 | 97.62 | 91.11 | 100.00 | 100.00 | 100.00 |
| By 14:00 | 100.00 | 97.78 | 100.00 | 100.00 | 100.00 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 13:30 | 11.90 | 4.44 | 6.82 | 9.76 | 9.52 |
| By 13:45 | 30.95 | 22.22 | 27.27 | 17.07 | 28.57 |
| By 14:00 | 42.86 | 37.78 | 29.55 | 21.95 | 47.62 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1330 / Lo1330 | 18 / 16 | 24 / 13 | 17 / 17 | 16 / 15 | 14 / 19 |
| Hi1345 / Lo1345 | 15 / 13 | 21 / 10 | 20 / 12 | 20 / 14 | 13 / 17 |
| Hi1400 / Lo1400 | 13 / 11 | 20 / 7 | 20 / 11 | 19 / 13 | 11 / 11 |

## Files

- `pine/1300_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
