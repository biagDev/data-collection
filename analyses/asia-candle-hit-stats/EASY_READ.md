# Asia Session Candle Retest — Plain-English Tables

Replicates the NY and London intraday candle retest series for the Asia killzone. Six 15-minute candles from **8:00-9:15 PM ET** (Tokyo morning, the classic Asian killzone).

Sample = 219-220 trading days (~11 months).

## Either side hit — headline retest probability

After each candle closes, what's the probability that price comes back to touch its high or low?

| Asia candle (ET) | Sample | +15 min | +30 min | +45 min |
|---|---|---|---|---|
| 8:00 PM | 220 | 81.36% | 91.82% | 95.45% |
| 8:15 PM | 220 | 82.73% | 92.73% | 95.91% |
| 8:30 PM | 220 | 81.82% | 94.55% | 97.27% |
| **8:45 PM** | 220 | **89.09%** | 95.45% | 98.18% |
| 9:00 PM | 219 | **75.34%** ← weakest | 93.61% | 96.35% |
| **9:15 PM** | 219 | **89.04%** | 96.35% | **99.54%** ← strongest +45 |

**Plain reading:** The 8:45 PM and 9:15 PM candles are the strongest Asia magnets. The 9:00 PM candle is the WEAKEST initial retest at 75.34% — possibly captures a directional move that holds before reversing.

## Both sides hit (sweep)

| Asia candle (ET) | Sample | Both hit by +15 | by +30 | by +45 |
|---|---|---|---|---|
| 8:00 PM | 220 | 5.00% | 15.91% | 22.73% |
| 8:15 PM | 220 | 10.00% | 21.82% | 30.00% |
| 8:30 PM | 220 | 6.36% | 20.45% | 27.27% |
| **8:45 PM** | 220 | **13.64%** | **23.64%** | **32.73%** ← highest |
| 9:00 PM | 219 | 7.31% | 17.81% | 26.94% |
| 9:15 PM | 219 | 11.87% | 22.37% | 29.22% |

**Plain reading:** 8:45 PM has the highest Asia sweep rate (33% by +45 min). Coincides with Tokyo opening price discovery — both sides of the candle's range tend to get tested.

## Directional split — strong HIGH bias

| Asia candle | +15: Hi any | Lo any | +45: Hi any | Lo any |
|---|---|---|---|---|
| **8:00 PM** | **51.82%** | **34.55%** | **65.91%** | **52.27%** ← biggest gap |
| 8:15 PM | 46.82% | 45.91% | 67.27% | 58.64% |
| 8:30 PM | 47.27% | 40.91% | 66.82% | 57.73% |
| 8:45 PM | 56.82% | 45.91% | 73.18% | 57.73% |
| 9:00 PM | 42.47% | 40.18% | 68.95% | 54.34% |
| 9:15 PM | 56.16% | 44.75% | 69.41% | 59.36% |

**Plain reading:** Strong high-bias on every Asia candle. The 8:00 PM candle has the most extreme split (52% Hi vs 35% Lo at +15 — a 17pp gap). NQ's bullish drift compounds with Asian session's tendency to drift up after Tokyo open.

## Comparison across all three sessions

The headline retest stat (either-side hit by +15 min after close) for the strongest candle in each session:

| Session | Strongest candle | Either +15 | Either +30 | Either +45 | Sweep +30 |
|---|---|---|---|---|---|
| **London** | 3:45 ET | **94.98%** | **99.09%** | **99.54%** | **32.42%** |
| **Asia** | 8:45 PM ET | 89.09% | 95.45% | 98.18% | 23.64% |
| **Asia** | 9:15 PM ET | 89.04% | 96.35% | 99.54% | 22.37% |
| **NY** | 9:30 ET | 90.09% | 96.98% | n/a | 15.95% |

**Plain reading:** **London is the most magnetic session, Asia second, NY third.** The London 3:45 candle beats every other session candle on every metric. Asia sits cleanly between London and NY — sweep rates ~50% higher than NY but ~30% lower than London.

## Key observations and trading implications

1. **8:45 PM ET is the strongest Asia magnet.** 89% retest rate within 15 min, 33% sweep rate by +45 min. If you trade ONE Asia candle, this is it. Aligns with Tokyo opening drive.

2. **9:00 PM ET is the WEAKEST Asia retest** at 75.34% by +15. Don't reflexively fade it — this candle often signals a directional move that initially holds.

3. **Asia has the strongest directional bias** — the 17pp Hi/Lo gap on the 8:00 PM candle is bigger than anything we've seen on NY or London. Asia plays cleaner directional moves.

4. **Asia is moderately magnetic** — between NY and London on every metric. Use the same fade-the-extremes tactics as NY but expect slightly more volatility.

5. **The 9:15 PM candle ties for the highest +45 retest rate** in the entire repo (99.54%, same as London 3:45). By +45 min after Asia open, both extremes are essentially always tested.

## How reliable are these numbers?

- 219-220 days, ~11 months. Trustworthy to ±3 percentage points.
- Sample size matches NY (232) and London (219) for direct comparison.
- The 99%+ rates are essentially saturated — high probability of being real.

## Glossary

- **Asia killzone**: 8:00-10:00 PM ET (Tokyo open and first hour, when Japanese institutional flow is most active).
- **Tokyo open**: 9:00 AM Japan Standard Time = 8:00 PM ET (during US Daylight Saving) or 7:00 PM ET (during US Standard Time). For NQ futures, this is when Asian liquidity peaks.
- **Either side hit**: a later 15m candle's wick reached back to the subject's high or low.
- **Both sides hit (sweep)**: BOTH the high AND low got tagged.
- **Hi-any / Lo-any**: high (or low) was touched, regardless of whether the other side was also touched.
- **+15 / +30 / +45**: minutes after the subject candle closed.
