# NQ 9:30 Opening Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 9:30-9:45 ET opening candle within the next 15 / 30 minutes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 9:30-9:45 ET (regular session opening 15m candle)
- **Sample**: 232 trading days (data depth limited by TradingView's 15m history for NQ1!)
- **Data captured**: 2026-04-25
- **Method**: Pine Script indicator running across all loaded chart history; counts emitted via on-chart tables read back over the MCP

## Definitions

A "hit" = a subsequent candle's wick traded back to the opening candle's high (≥ H) or low (≤ L).

| Bucket | Meaning |
|---|---|
| **Either side** | High OR low was retraced |
| **Both sides** | High AND low were both retraced (full sweep of the opening range) |
| **High only** | High retraced, low did NOT |
| **Low only** | Low retraced, high did NOT |
| **Neither** | Neither extreme was retraced |
| **High touched (any)** | High was retraced (regardless of whether low also was) — i.e. `high_only + both` |
| **Low touched (any)** | Low was retraced (regardless of whether high also was) — i.e. `low_only + both` |

Two windows are measured:
- **By 10:00** — only the 9:45-10:00 candle
- **By 10:15** — the 9:45-10:00 AND 10:00-10:15 candles (cumulative)

## Aggregate Results (n=232)

| Outcome | By 10:00 | By 10:15 |
|---|---|---|
| Either side | **209 (90.09%)** | **225 (96.98%)** |
| Both sides (full sweep) | 14 (6.03%) | 37 (15.95%) |
| High only | 102 (43.97%) | 99 (42.67%) |
| Low only | 93 (40.09%) | 89 (38.36%) |
| Neither | 23 (9.91%) | 7 (3.02%) |
| High touched (any) | 116 (50.00%) | 136 (58.62%) |
| Low touched (any) | 107 (46.12%) | 126 (54.31%) |

### Key takeaways

- **Almost every day (97%)** retraces to one of the opening candle's extremes within 45 minutes of the open.
- The market is **slightly biased to the high side** — the opening high is touched ~58.6% of the time vs. the low at ~54.3% within 45 minutes.
- A **full sweep of both sides** within the first 45 minutes happens **~16% of the time** (37/232 days).
- Within the first 15 minutes after the open candle (i.e. just the 9:45-10:00 candle), full sweeps are rare at **6%**.

## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 47 | 47 | 47 | 45 | 46 |
| By 10:00 | 85.11 | 91.49 | 93.62 | 93.33 | 86.96 |
| By 10:15 | 93.62 | **100.00** | 97.87 | 97.78 | 95.65 |

### Both sides hit / full sweep (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 10:00 | 6.38 | 4.26 | 4.26 | 8.89 | 6.52 |
| By 10:15 | 6.38 | 14.89 | **21.28** | **22.22** | 15.22 |

### Directional split (counts; either-side cases)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| HiOnly10 | **27** | 17 | 18 | 15 | **25** |
| LoOnly10 | 10 | **24** | **24** | **23** | 12 |
| HiOnly15 | **29** | 17 | 17 | 14 | **22** |
| LoOnly15 | 12 | **23** | 19 | **20** | 15 |

### Day-of-week observations

- **Monday & Friday lean bullish on the open** — high gets retraced far more often than the low (Mon: 27 hi-only vs. 10 lo-only; Fri: 25 vs. 12 by 10:00).
- **Tuesday/Wednesday/Thursday lean bearish on the open** — low gets retraced more often (e.g. Tue: 24 lo-only vs. 17 hi-only).
- **Wednesday and Thursday are the "sweep" days** — full retracement of both sides happens 21-22% of the time by 10:15, vs. 6-15% on other days.
- **Tuesday is the most reliable** — every Tuesday in the sample retraced at least one side by 10:15 (100%).

## Caveats

- **Limited history**: TradingView's 15m chart history for NQ1! is capped around mid-2025, so the sample is ~11 months. A larger sample would smooth out the day-of-week effects, especially for the sweep stats.
- **Continuous contract roll noise**: NQ1! splices front-month contracts. Roll days can introduce small artificial gaps that may register as "hits" even though no real trade touched the level.
- **Wick definition**: a "hit" only requires the candle's wick to reach the level — not a sustained close or reaction. Many of these hits are momentary.
- **Tie-breaking**: if a candle's high or low EQUALS the opening candle's level (`>=` / `<=`), that counts as a hit.

## Files

- `pine/930_hit_stats.pine` — Pine Script source that produced the numbers
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown

## Reproducing

1. Open `CME_MINI:NQ1!` on a 15m chart in TradingView Desktop with the MCP debug port enabled.
2. Scroll back to load as much history as your data feed allows.
3. Add `pine/930_hit_stats.pine` as an indicator on the chart.
4. Read the on-chart tables, or use the MCP: `data_get_pine_tables(study_filter="930 Hit Stats")`.
