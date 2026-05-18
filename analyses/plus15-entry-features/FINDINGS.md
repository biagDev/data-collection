# +15 Entry Features — First-Hit Conditional Analysis

Total rows: **240** | Tradable (first ∈ {high, low}): **210** | Dropped (none/ambiguous): **30**

Base rate (high first | tradable): **51.0%**

Lift = (conditional high%) − (base high%). Positive = feature pushes prior toward "high first." Threshold for meaningful: |lift| ≥ 8 and n ≥ 20.


## Close location (within magnet candle)

| Bin | n | high% | lift |
|---|---:|---:|---:|
| lower third (≤ 0.33) | 80 | 10 | -41 ⚑ |
| middle third (0.33-0.67) | 51 | 58.8 | +7.9 |
| upper third (≥ 0.67) | 79 | 87.3 | +36.4 ⚑ |

## VWAP side at magnet close

| Bin | n | high% | lift |
|---|---:|---:|---:|
| below VWAP (-1) | 120 | 41.7 | -9.3 ⚑ |
| above VWAP (+1) | 90 | 63.3 | +12.4 ⚑ |

## HTF EMA trend (15m EMA20 vs EMA50)

| Bin | n | high% | lift |
|---|---:|---:|---:|
| down (-1) | 125 | 48 | -3 |
| neutral (0) | 0 | — | — |
| up (+1) | 85 | 55.3 | +4.3 |

## Distance to PDH (ATR units, smaller = closer above)

| Bin | n | high% | lift |
|---|---:|---:|---:|
| PDH near/above (|d| < 1) | 18 | 33.3 | -17.6 |
| PDH moderate (1-3) | 67 | 59.7 | +8.7 ⚑ |
| PDH far (≥ 3) | 125 | 48.8 | -2.2 |

## Distance to PDL (ATR units, smaller = closer below)

| Bin | n | high% | lift |
|---|---:|---:|---:|
| PDL near/below (|d| < 1) | 0 | — | — |
| PDL moderate (1-3) | 23 | 43.5 | -7.5 |
| PDL far (≥ 3) | 187 | 51.9 | +0.9 |

## Opening drive @ +90s (ATR units)

| Bin | n | high% | lift |
|---|---:|---:|---:|
| strong down (< -0.25) | 36 | 13.9 | -37.1 ⚑ |
| mild (-0.25 to +0.25) | 141 | 53.9 | +2.9 |
| strong up (> +0.25) | 33 | 78.8 | +27.8 ⚑ |

## Top buckets by deviation from base rate (n ≥ 4)

| bkt | n | high% | dev |
|---|---:|---:|---:|
| 1415 | 4 | 0 | -51 |
| 1530 | 4 | 0 | -51 |
| 1000 | 4 | 100 | +49 |
| 1100 | 4 | 100 | +49 |
| 1145 | 4 | 100 | +49 |
| 1245 | 4 | 100 | +49 |
| 1330 | 4 | 100 | +49 |
| 1430 | 4 | 100 | +49 |
| 1500 | 4 | 25 | -26 |
| 1115 | 4 | 75 | +24 |
| 1515 | 4 | 75 | +24 |
| 930 | 4 | 50 | -1 |
| 1030 | 4 | 50 | -1 |
| 1045 | 4 | 50 | -1 |
| 1200 | 4 | 50 | -1 |
| 1215 | 4 | 50 | -1 |
| 1230 | 4 | 50 | -1 |
| 1300 | 4 | 50 | -1 |
| 1345 | 4 | 50 | -1 |
| 1445 | 4 | 50 | -1 |

## Caveats

- Sample is only ~2 trading days × 2 symbols, 210 tradable events. Confidence intervals are very wide — any single-bucket result here is anecdotal. Treat bin-level lifts ≥ 8 with n ≥ 20 as **hypotheses to retest**, not edges.
- The default magnet sample is also up-trending (large "high" base rate may reflect a regime, not a structural feature).
- Need 10x more events (run on 1m timeframe for deeper history, or accumulate 30s data over many sessions) before any of this should drive sizing.
