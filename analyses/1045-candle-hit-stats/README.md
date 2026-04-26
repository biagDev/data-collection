# NQ 10:45 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 10:45-11:00 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 10:45-11:00 ET
- **Sample**: 232 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 11:00):

- **By 11:15** — the 11:00-11:15 candle (1 candle after subject closes)
- **By 11:30** — adds 11:15-11:30 (2 candles)
- **By 11:45** — adds 11:30-11:45 (3 candles)

## Aggregate Results (n=232)

| Outcome | By 11:15 | By 11:30 | By 11:45 |
|---|---|---|---|
| **Either side** | 192 (82.76%) | 219 (94.40%) | **226 (97.41%)** |
| **Both sides** | 18 (7.76%) | 46 (19.83%) | **65 (28.02%)** |
| High only | 97 (41.81%) | 98 (42.24%) | 92 (39.66%) |
| Low only | 77 (33.19%) | 75 (32.33%) | 69 (29.74%) |
| Neither | 40 (17.24%) | 13 (5.60%) | 6 (2.59%) |
| **High touched (any)** | 115 (49.57%) | 144 (62.07%) | **157 (67.67%)** |
| **Low touched (any)** | 95 (40.95%) | 121 (52.16%) | **134 (57.76%)** |

### Key observations

- **High-bias returns** — after the 10:30 candle's brief flip, the 10:45 candle is back to high-touched (67.67%) > low-touched (57.76%) — actually the **highest high-touched rate** of any candle so far.
- **Sweep rate 28%** — slightly off the 10:30 peak but still strong.
- **17.24% neither rate by 11:15** is the highest single-window neither rate observed — the 10:45-11:00 candle has more "expand-and-go" days than other candles.

## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 47 | 47 | 47 | 45 | 46 |
| By 11:15 | 76.60 | 82.98 | 87.23 | 84.44 | 82.61 |
| By 11:30 | 91.49 | 95.74 | 95.74 | 91.11 | **97.83** |
| By 11:45 | 93.62 | 95.74 | **100.00** | 97.78 | **100.00** |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 11:15 | 10.64 | 4.26 | 6.38 | **11.11** | 6.52 |
| By 11:30 | 17.02 | 12.77 | **23.40** | **24.44** | 21.74 |
| By 11:45 | 25.53 | 19.15 | 25.53 | 31.11 | **39.13** |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1115 / Lo1115 | **20 / 11** | **22 / 15** | 19 / 19 | 19 / 14 | 17 / 18 |
| Hi1130 / Lo1130 | **22 / 13** | **23 / 16** | 18 / 16 | 17 / 13 | 18 / 17 |
| Hi1145 / Lo1145 | **20 / 12** | **20 / 16** | 19 / 16 | 17 / 13 | 16 / 12 |

### Notable

- **Friday hits 39.13% sweep rate by 11:45** — the highest single DOW-window sweep figure in the entire series so far. After the 10:45 candle on Fridays, both sides get tagged nearly 4 in 10 times.
- **Monday and Tuesday lean bullish** at this candle — high-only hits clearly outpace low-only.
- **Wednesday and Friday hit 100% retest** by 11:45 — every Wed/Fri in the sample retested at least one side.

## Files

- `pine/1045_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
