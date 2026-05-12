# NQ 15:45 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 15:45-16:00 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 15:45-16:00 ET
- **Sample**: 214 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 16:00):

- **By 16:15** — the 16:00-16:15 candle (1 candle after subject closes)
- **By 16:30** — adds 16:15-16:30 (2 candles)
- **By 16:45** — adds 16:30-16:45 (3 candles)

## Aggregate Results (n=214)

| Outcome | By 16:15 | By 16:30 | By 16:45 |
|---|---|---|---|
| **Either side** | 160 (74.77%) | 173 (80.84%) | **179 (83.64%)** |
| **Both sides** | 11 (5.14%) | 16 (7.48%) | **19 (8.88%)** |
| High only | 77 (35.98%) | 83 (38.79%) | 84 (39.25%) |
| Low only | 72 (33.64%) | 74 (34.58%) | 76 (35.51%) |
| Neither | 54 (25.23%) | 41 (19.16%) | 35 (16.36%) |
| **High touched (any)** | 88 (41.12%) | 99 (46.26%) | 103 (48.13%) |
| **Low touched (any)** | 83 (38.79%) | 90 (42.06%) | 95 (44.39%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 42 | 45 | 44 | 41 | 42 |
| By 16:15 | 69.05 | 64.44 | 81.82 | 87.80 | 71.43 |
| By 16:30 | 73.81 | 80.00 | 84.09 | 90.24 | 76.19 |
| By 16:45 | 78.57 | 82.22 | 86.36 | 95.12 | 76.19 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 16:15 | 2.38 | 2.22 | 6.82 | 12.20 | 2.38 |
| By 16:30 | 2.38 | 8.89 | 11.36 | 12.20 | 2.38 |
| By 16:45 | 2.38 | 8.89 | 13.64 | 14.63 | 4.76 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1615 / Lo1615 | 11 / 17 | 15 / 13 | 17 / 16 | 18 / 13 | 16 / 13 |
| Hi1630 / Lo1630 | 12 / 18 | 17 / 15 | 18 / 14 | 19 / 13 | 17 / 14 |
| Hi1645 / Lo1645 | 12 / 20 | 17 / 16 | 18 / 14 | 20 / 13 | 17 / 13 |

## Files

- `pine/1545_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
