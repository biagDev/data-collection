# NQ 11:30 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 11:30-11:45 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 11:30-11:45 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 11:45):

- **By 12:00** — the 11:45-12:00 candle (1 candle after subject closes)
- **By 12:15** — adds 12:00-12:15 (2 candles)
- **By 12:30** — adds 12:15-12:30 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 12:00 | By 12:15 | By 12:30 |
|---|---|---|---|
| **Either side** | 194 (87.39%) | 214 (96.40%) | **218 (98.20%)** |
| **Both sides** | 23 (10.36%) | 43 (19.37%) | **65 (29.28%)** |
| High only | 102 (45.95%) | 101 (45.50%) | 92 (41.44%) |
| Low only | 69 (31.08%) | 70 (31.53%) | 61 (27.48%) |
| Neither | 28 (12.61%) | 8 (3.60%) | 4 (1.80%) |
| **High touched (any)** | 125 (56.31%) | 144 (64.86%) | 157 (70.72%) |
| **Low touched (any)** | 92 (41.44%) | 113 (50.90%) | 126 (56.76%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 12:00 | 84.44 | 88.89 | 88.89 | 86.05 | 88.64 |
| By 12:15 | 97.78 | 100.00 | 95.56 | 93.02 | 95.45 |
| By 12:30 | 100.00 | 100.00 | 97.78 | 97.67 | 95.45 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 12:00 | 15.56 | 11.11 | 8.89 | 4.65 | 11.36 |
| By 12:15 | 24.44 | 20.00 | 15.56 | 18.60 | 18.18 |
| By 12:30 | 26.67 | 22.22 | 33.33 | 27.91 | 36.36 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1200 / Lo1200 | 19 / 12 | 24 / 11 | 20 / 16 | 20 / 15 | 19 / 15 |
| Hi1215 / Lo1215 | 20 / 13 | 24 / 12 | 19 / 17 | 17 / 15 | 21 / 13 |
| Hi1230 / Lo1230 | 21 / 12 | 23 / 12 | 16 / 13 | 15 / 15 | 17 / 9 |

## Files

- `pine/1130_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
