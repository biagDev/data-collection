# GC Stats — Plain-English Summary

Replication of the NQ candle hit-stats series on **GC (Gold Futures, COMEX)**. Same methodology, same time windows, same Pine logic — just running on `COMEX:GC1!` instead of `NQ1!`.

Time windows mirror NQ literally (NY-anchored: 9:30 AM through 15:45 ET). This is **deliberate** so cross-market comparisons stay clean — but note that gold's natural session anchors are London (3 AM ET) and the COMEX pit open (8:20 AM ET), NOT the NY 9:30 equity open. Expect the headline retest rates here to differ from NQ/ES.

## What's covered (this batch)

**14 of NQ's 35 analyses** — the full intraday candle hit-stats series (8 morning + 8 afternoon... well, 6 + 8 since GC didn't have an afternoon batch on NQ until last commit):

| GC analysis | Folder | GC retest +15 | NQ retest +15 | Delta |
|---|---|---|---|---|
| 9:30 candle | `930-candle-hit-stats/` | 80.18% | ~90% | **-10pp** (no NY anchor) |
| 9:45 candle | `945-candle-hit-stats/` | 90.09% | ~88% | match |
| 10:00 candle | `1000-candle-hit-stats/` | 80.18% | ~85% | -5pp |
| 10:15 candle | `1015-candle-hit-stats/` | 83.78% | ~86% | match |
| 10:30 candle | `1030-candle-hit-stats/` | 85.14% | ~89% | -4pp |
| 10:45 candle | `1045-candle-hit-stats/` | 89.19% | ~83% | **+6pp** |
| 11:00 candle | `1100-candle-hit-stats/` | 85.14% | ~90% | -5pp |
| 11:30 candle | `1130-candle-hit-stats/` | 84.23% | ~87% | match |
| 12:00 candle | `1200-candle-hit-stats/` | 85.14% | ~86% | match |
| 12:30 candle | `1230-candle-hit-stats/` | 80.00% | ~87% | -7pp |
| 13:00 candle | `1300-candle-hit-stats/` | 85.84% | ~87% | match |
| 14:00 candle | `1400-candle-hit-stats/` | 78.60% | ~84% | -5pp |
| 15:00 candle | `1500-candle-hit-stats/` | 84.19% | ~89% | -5pp |
| 15:45 candle | `1545-candle-hit-stats/` | 71.16% | ~75% | match |

(NQ numbers are approximate, sourced from each NQ analysis's `data/aggregate.csv`.)

## What's NOT yet covered (future batches)

NQ has these; GC does not yet:
- Extended-stats (9 themes — prior-day H/L, time-to-retest, max excursion, conditional-on-color, etc.)
- Daily-patterns v1+v2 (27 years of daily history)
- Weekly-patterns v1+v2
- Pre-market range break-and-go
- Session retests (London, Asia, Globex 6pm)
- 9:30 followthrough chain (followthrough, retest-conditional, setup-b)
- Multi-timeframe candles (9am-1h, 6am-4h)

Ask if you want any of these next.

## Big takeaways from GC vs NQ comparison

### 1. The NY 9:30 magnet is an equity-index thing — not universal

NQ + ES both get ~90% retest on the 9:30 candle within 15 min. GC gets **80%**. The 9:30 ET timestamp isn't a market-structural event for gold the way it is for SPX/NDX. The retest pattern still exists in gold — gold also mean-reverts intraday — it's just not anchored to 9:30.

### 2. GC's 9:45 candle slightly beats its 9:30

GC 9:30 candle: 80% retest by +15. GC 9:45 candle: 90% retest by +15. On NQ/ES, 9:30 is the strongest of the morning candles; on GC, **9:45 is**. Gold seems to need a candle to "settle" after the 9:30 timestamp before mean-reversion kicks in.

### 3. By +45 min, retest rates converge

By the +45 min window, GC retest rates are **97-99%** for almost every NY-hours candle — essentially identical to NQ. Gold mean-reverts on intraday timescales just like equity indices — the 9:30 anchor advantage just disappears at this longer horizon.

### 4. 15:45 candle: same pattern as NQ (cash close breaks the magnet)

GC 15:45 candle: 71% retest +15, 84% +30, 94% +45. NQ: 75% / 81% / 84%. Both markets see a clear weakening at the cash-close window. For gold, the COMEX globex session continues post-16:00 just like CME equity index futures, but gold's "true" close is 17:00 ET — so 15:45 is closer to mid-session than end-of-session for gold. The pattern still appears though.

### 5. Lunch zone (12:00-13:00) — bigger sweep rates than NQ

GC 12:30 has a 36% sweep rate by 13:30 — comparable to NQ's lunch peak (~35%). GC 13:00 has 33%. Gold appears to chop around midday just like indices, possibly more so.

## How reliable?

Each analysis: n = 214-222 trading days (~11 months of 15m data on `COMEX:GC1!`), as of 2026-05-11. Aggregate ±2pp, day-of-week ±7-10pp. Same Pine source as the NQ analyses (only the chart symbol changes).
