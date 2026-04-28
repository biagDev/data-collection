# Setup B R-Multiple Distribution — Plain-English Tables

Setup B was identified in the 9:30 followthrough analysis as the strongest bullish setup: **wide-body green 9:30 candle + the 9:30 high retests by 10:00**. The day closes green 77% of the time.

But "day closes green" isn't the same as "trade is profitable." This analysis simulates **actually trading the setup** with a defined entry, stop, and outcome measurement to see if the edge translates into real R-multiple returns.

## How the trade is set up

- **Entry**: when the 9:30 high gets retested in the 9:45-10:00 bar, you go long at the 9:30 high price.
- **Stop**: at the 9:30 low. The "1R" risk distance equals the full 9:30 candle's range.
- **Hold to**: the 4 PM RTH close.
- **Sample**: 39 such trades over the 232-day window.

## Headline summary

| Metric | Value | Plain reading |
|---|---|---|
| Total Setup B trades | 39 | About 1 setup every 6 trading days |
| **Stopped out (low went 1R below entry)** | **17 trades (43.59%)** | Almost half the trades hit the 9:30-low stop |
| **Average final R if held to close** | **-0.12 R** | Strategy is slightly unprofitable on average |
| Average peak favorable move (MFE) | 1.07 R | When trades work, they reach about 1R |
| Average peak adverse move (MAE) | 1.33 R | The average trade goes 1.33x the 9:30 range AGAINST you at some point |
| Winners with no drawdown | 0 (0%) | Every winning trade saw some price action below entry |
| Winners with drawdown | 19 (48.72%) | Most winners had to "survive" some red before going green |
| Losers that never recovered | 6 (15.38%) | About 1 in 7 trades just goes wrong from the start |

**The big surprise**: even though 77% of these days close green, holding the trade with a 9:30-low stop produces an average of **-0.12 R**. The strategy is **unprofitable as defined**.

## Why? The path-to-profit problem

The "day closes green" stat doesn't tell you what happens INTRADAY between entry and close. The data shows:
- Average MAE is **1.33 R** — meaning trades typically go further against entry than the 9:30 range.
- 44% of trades hit the 1R stop at some point during the day.
- Even days that ultimately close green often go to -0.5R, -0.7R, or worse before reversing.

So while the 9:30 low is a "logical" stop, **it's too tight** for this setup's average drawdown.

## Final R distribution — where do trades end up at 4 PM?

| Final R bucket | Days | % of trades |
|---|---|---|
| Worse than -1R (would have stopped before close) | 8 | 20.51% |
| -1R to 0 (red close, didn't fully stop) | 10 | 25.64% |
| 0 to +1R (modest winner) | **14** | **35.90%** ← most common |
| +1R to +2R | 3 | 7.69% |
| +2R or more | 4 | 10.26% |

**Plain reading**: A typical Setup B day finishes between flat and +1R. The big winners (+2R or more) only happen 1 in 10 trades. Big losers (worse than -1R) happen 1 in 5 trades. The math doesn't work out positive.

## MFE distribution — what's the BEST point of each trade?

| Peak favorable move during the day | Days | % of trades | Cumulative % at this level or higher |
|---|---|---|---|
| 0 to 0.5R | 7 | 17.95% | 100% |
| 0.5R to 1R | 14 | 35.90% | **82.05%** |
| 1R to 2R | 12 | 30.77% | **46.15%** |
| 2R to 3R | 5 | 12.82% | 15.38% |
| More than 3R | 1 | 2.56% | 2.56% |

**Plain reading**: 
- ~82% of trades reach AT LEAST 0.5R favorable at some point.
- ~46% reach at least 1R favorable.
- ~15% reach 2R or more.

This is the case for using a **take-profit** rather than holding to close. If you took profit at +1R (instead of holding to close), you'd capture that move on ~46% of trades.

## What this implies for trading the setup

The headline 77% "day closes green" stat **does not survive** as a simple buy-and-hold-to-close strategy with a 9:30-low stop. To make this setup tradeable you'd need:

1. **A wider stop** — 1.5R or 2R instead of 1R. The 9:30 low is tighter than the average MAE of 1.33R.
2. **OR an earlier exit** — taking profit at 0.5R or 1R captures the favorable swing on most trades before it reverses.
3. **OR additional filters** — combining with VWAP confluence (from the retest-conditional-stats analysis) might produce a higher-conviction subset.

The point of this analysis is not "Setup B is bad" — it's that **probability stats don't equal trade P&L**. The shape of the path matters as much as the final outcome.

## How reliable is this?

- 39 trades is a small sample. The 43.59% stop-out rate has a confidence interval of about ±15pp.
- The -0.12R average could realistically be anywhere from -0.40R to +0.15R given the sample size.
- But the directional finding — that the strategy isn't simply printable from the "77% close green" stat — is robust.

## Limitations

The Pine indicator tracks **peak MFE** and **peak MAE** separately, but doesn't know which came first within a 15-minute bar. So we can't perfectly simulate "if you take profit at 0.5R" because we don't know if MFE happened before MAE on each trade. The take-profit calculations above are upper bounds; real performance would be slightly worse.

To get truly accurate trade simulation you'd need tick-level data, not 15-minute bars.

## Glossary

- **R-multiple**: trade outcome expressed as a multiple of the risk amount. If you risk $100 and make $200, that's +2R.
- **MFE (Maximum Favorable Excursion)**: the peak profit point of the trade, in R units.
- **MAE (Maximum Adverse Excursion)**: the peak drawdown point of the trade, in R units (positive number = bigger drawdown).
- **Stopped out**: price reached the stop loss level (1R below entry) at some point during the trade.
- **Final R**: the trade's R-value if you held all the way to the closing bell at 4 PM.
- **Setup B**: wide-body green 9:30 candle (body ≥ 50% of range) + the 9:30 high gets retested in the 9:45-10:00 bar.
