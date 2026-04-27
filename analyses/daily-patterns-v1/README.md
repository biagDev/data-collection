# NQ Daily Patterns — Vol. 1

Five starter statistics on NQ daily candles. Sample = ~6,700 trading days (~27 years of NQ daily history available on TradingView).

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: Daily (full Globex session per TV default)
- **Sample**: ~6,700 daily bars (~1999-2026; per-stat sample sizes vary, see below)
- **Method**: Single Pine indicator with all 5 stats; output via on-chart tables

## Caveats up front

- **Continuous-contract rolls** introduce ~4 small artificial gaps per year — these inflate the "gap < 25 pts" bucket in stat 4.
- **Pre-2001 NQ data** is electronic-trading-only with thin liquidity. Modern era (post-2010) is the cleaner sub-sample.
- **NQ1! is futures, not cash NDX/QQQ**. Gap behavior is muted vs. cash equities because futures trade ~24h.
- **Sample is huge for aggregates** (CIs ~±1-2pp) but conditional sub-samples (e.g. n=153) have wider CIs (~±8pp).

---

## Stat 1: Streak conditional next-day color

| Streak ending yesterday | n | P(reverse) | P(continue) | Edge vs 50/50 |
|---|---|---|---|---|
| 1 green | 1690 | 46.92% | 53.08% | **+3.08% continue** |
| 2 green | 888 | 44.59% | 55.41% | **+5.41% continue** |
| 3 green | 488 | 46.31% | 53.69% | **+3.69% continue** |
| **4 green** | **259** | **40.15%** | **59.85%** | **+9.85% continue** ← strongest |
| 5+ green | 351 | 42.74% | 57.26% | **+7.26% continue** |
| 1 red | 1681 | 54.49% | 45.51% | **+4.49% reverse** |
| 2 red | 755 | 52.45% | 47.55% | **+2.45% reverse** |
| 3 red | 358 | 56.15% | 43.85% | **+6.15% reverse** |
| 4 red | 153 | 53.59% | 46.41% | +3.59% reverse |
| **5+ red** | **122** | **57.38%** | **42.62%** | **+7.38% reverse** ← strongest |

### Findings

- **Bull streaks tend to continue, not reverse.** Every green-streak length shows >50% continuation (53-60%). The "3 bullish then bearish" reversion idea **does not hold** for NQ daily.
- **Red streaks tend to reverse** — opposite asymmetry. After 5+ red, 57% next day green.
- **Asymmetric drift is the underlying cause.** Long-term NQ has positive expectation (~+0.04% per day base rate). That base bias shows up across all conditioned cells. Bull streaks ride the drift; bear streaks fight it.
- **The 4-green case is a curious outlier** at 60% continue. Could be noise (n=259) or a real "trending market" signature.

### Trade implication

The classic "fade the streak" mental model is **wrong for NQ daily** on the bull side, and **right but weak** on the bear side. If you'd been fading every 3-day green streak for 27 years, you'd have lost money on 54% of trades.

---

## Stat 2: Close-quartile follow-through

Conditioning on the previous day's close position within its own range:

| Yesterday's close was in… | n | Higher high today | Green today |
|---|---|---|---|
| **Top 25% of yesterday's range** | 2419 | **85.61%** | 53.82% |
| **Bot 25% of yesterday's range** | 1598 | LL today: 82.48% | 45.06% red |

### Findings

- **Higher-high probability is huge — 85.6%.** A close near yesterday's high almost always sees today take out yesterday's high.
- **But "higher high" ≠ "green day."** Only 53.8% of those days actually close green. Today's high is taken out then price often retreats.
- Symmetric on the down side: 82.5% lower-low after a bottom-quartile close.

### Trade implication

This is a **breakout setup confirmation stat**. After a strong-close day, you're trading with a reliable stop placement (yesterday's high) and 86% probability of breakout extension intraday — but lower probability that the day finishes green (only 54%). Best read for intraday traders who can fade after the high tag.

---

## Stat 3: NR7 expansion

| Stat | n=1044 |
|---|---|
| **Next day expands range** | **83.52%** |
| **Average next-day range / NR7 range** | **1.68x** |
| Next day green | 55.94% |
| Next day red | 43.39% |

### Findings

- **NR7 → expansion is robust** (84% rate) and well-replicated here.
- **Avg expansion is 1.68x** — meaningful expansion when it happens.
- **Direction has slight bull bias** (56/43) — consistent with general NQ drift.
- The pattern doesn't strongly predict direction. Use it for **volatility expansion** trades, not directional trades.

---

## Stat 4: Gap fill probability

| Gap size (absolute, NQ pts) | n | Filled | % filled |
|---|---|---|---|
| < 25 pts | 5884 | 5593 | **95.05%** |
| 25-50 pts | 176 | 119 | **67.61%** |
| 50-100 pts | 77 | 52 | **67.53%** |
| 100-200 pts | 17 | 8 | 47.06% (small n) |
| 200+ pts | 17 | 9 | 52.94% (small n) |
| Gap up (any) | 2919 | 2715 | 93.01% |
| Gap down (any) | 3252 | 3066 | 94.28% |

### Findings

- **Small gaps (<25 pts) almost always fill — 95%.** Likely inflated by contract-roll micro-gaps that aren't real "gaps" in the trader sense, but still: small gaps are noise.
- **Mid-size gaps (25-100 pts) fill ~67% of the time.** Real edge for fade trades, but not 90%+.
- **Large gaps (100+ pts) fill <53%** — gap-and-go is the more likely outcome. Don't reflexively fade 100+ pt gaps.
- **Gap up vs gap down is essentially symmetric** (93% vs 94% fill). No directional asymmetry in fill rates.

### Trade implication

The retail "always fade gaps" rule is **only valid for small gaps**. For mid-size gaps it's a 2:1 edge. For large gaps, it's worse than a coin flip.

---

## Stat 5: Range-position fade

| Yesterday's close was in… | n | Next day result |
|---|---|---|
| Top 10% of last 20-day range | 1632 | **43.69% red** (56.31% green) |
| Bot 10% of last 20-day range | 517 | **55.51% green** (44.49% red) |

### Findings

- **Top 10% does NOT mean-revert.** When NQ closes near a 20-day high, the next day is **green 56%** of the time — slight continuation, not reversal.
- **Bot 10% does mean-revert mildly.** Close near 20-day low → 55.5% green next day. Modest bounce edge.
- **Asymmetry again confirms the drift bias.** Highs are made to be exceeded; lows are made to be bought.

### Trade implication

The classic "buy oversold, sell overbought" symmetric strategy **doesn't work** on NQ daily. Selling 20-day highs is fading a trend that's still in motion. Buying 20-day lows has a real (but small) edge.

---

## Cross-stat synthesis

Three patterns that emerge clearly:

1. **NQ has strong upward drift** (~50.5% green base rate at the daily level). Every conditional stat that has a directional component shows this drift on top of the conditioning. Don't fade strength reflexively.

2. **Range-extension (NR7, top-quartile close) is reliable** at ~85% rates. **Direction prediction is much weaker** at ~55% rates. This is a clean trader insight: **expansion is predictable, direction is not.**

3. **Mean reversion is asymmetric.** Modest edge buying lows; **anti-edge** selling highs. Overbought is not the same as overdone.

## What I'd run next (Vol. 2 ideas)

Based on what these stats surface:

- **Filter Stat 1 by trend regime** (above/below 200-day MA). The continuation bias should be stronger in uptrends, possibly absent or flipped in bear markets.
- **Stat 2 + Stat 1 combined** — "after 3 green AND top-quartile close" — should produce the strongest continuation read of all.
- **NR7 + bias filter** — what's the directional edge of NR7-expansion conditional on prior-week direction?
- **Gap fill + same-day color** — if the gap fills, what's the daily P&L?
- **Day-of-week splits** for streak stats — does Monday after 3 green behave like Wednesday after 3 green?

## Files

- `pine/daily_patterns_v1.pine` — Pine analytical core
- `data/results.json` — full structured results (12 stats × multiple buckets)
- `data/streaks.csv` — Stat 1 table
- `data/gap_fill.csv` — Stat 4 table
