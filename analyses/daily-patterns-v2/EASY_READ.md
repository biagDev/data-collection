# Daily Patterns Vol. 2 — Plain-English Tables

This builds on Vol.1. Two questions:
1. Does combining streak + close-quartile signals add edge?
2. Do Vol.1's signals work the same in bull markets vs bear markets?

Sample = ~6,700 daily bars (~27 years).

---

## Combined signals: streak + close-quartile

Asks: after 3+ same-color days in a row AND yesterday's close was strong (top 25% of range) or weak (bot 25%), what does today do?

| Condition | Days in sample | Today closes green | Vol.1 streak-only baseline | Edge added |
|---|---|---|---|---|
| 3+ green days AND yesterday closed strong (top 25%) | 678 | **56.34%** | 56.30% | +0.04 (no edge) |
| 3+ green days AND yesterday closed weak (bot 25%) | 12 | 50.00% | — | tiny sample |
| 3+ red days AND yesterday closed strong (top 25%) | 11 | 54.55% | — | tiny sample |
| 3+ red days AND yesterday closed weak (bot 25%) | 345 | **58.26%** | 55.80% | +2.46% |

**Plain reading:** Combining the two signals **doesn't add real edge**. The "3+ green AND strong close" version is essentially identical to "3+ green" alone (56.3%). The bear-side combo gives a small +2.5pp uplift. The streak signal alone captures most of what's there.

---

## Bull market vs bear market — does the regime matter?

We split every Vol.1 stat into two camps:
- **Above 200-day MA** (bull regime — yesterday's close was above the 200-day moving average)
- **Below 200-day MA** (bear regime — yesterday's close was below the 200-day MA)

Note: NQ spent most of 27 years above its 200MA (bull regime ~5x more common), so below-MA samples are smaller.

| Stat | Days above MA | Above MA % | Days below MA | Below MA % | Difference |
|---|---|---|---|---|---|
| After 3+ green: % green next | 887 | **57.16%** | 177 | **49.15%** | **+8.01% above** |
| After 3+ red: % green next | 337 | 56.97% | 285 | 54.39% | +2.59% above |
| Strong close: % higher high next | 1808 | 85.90% | 536 | 83.77% | +2.13% above |
| Quiet day (NR7): % expansion next | 716 | 84.36% | 298 | 81.88% | +2.48% above |
| Medium gap (25-100 pts): % fills | 148 | 70.95% | 85 | 69.41% | +1.53% above |
| Closed near 20-day high: % green next | 1411 | **56.34%** | 162 | **49.38%** | **+6.96% above** |
| Closed near 20-day low: % green next | 180 | **60.56%** | 332 | 53.01% | **+7.54% above** |

**Plain reading: The 200-day MA matters a lot for some signals and not at all for others.**

- **Bull-streak continuation only works above 200MA.** Above MA: 57% chance of another green day. Below MA: 49% — coin flip. The "drift up" is a function of being in a bull market, not a permanent feature of NQ.
- **Closing near a 20-day high keeps going up only above MA.** Same coin-flip vs edge dynamic.
- **Closing near a 20-day low bounces in both regimes** but stronger above MA (60.6% vs 53%).
- **Range-extension signals (NR7 expansion, strong-close higher-high) are robust** — they work the same in both bull and bear markets at ~84-86%.

---

## Big-picture takeaways

1. **The 200-day MA is the most important filter we've found.** It separates "drift-driven signals" (which only work above MA) from "structural signals" (NR7, top-Q close — which work in both regimes).

2. **Combining streak + close-quartile doesn't add real edge.** If you knew about the streak, the close position adds basically nothing. They measure overlapping information.

3. **Range-extension signals are the most reliable across regimes.** NR7 → expansion holds at 82-84% in any market. If you want a regime-independent edge, focus on volatility expansion plays.

---

## How reliable are these numbers?

- Above-200MA samples are large (180-1800+) — trustworthy to within ±2-3 percentage points.
- Below-200MA samples are smaller (85-536) — trustworthy to within ±4-7 points.
- The "tiny sample" rows (12 and 11 days for combined signals) — could be off by ±20pp or more. Don't act on those.

---

## Glossary

- **3+ green days**: yesterday plus the two days before were all green-close candles. We don't care if it's exactly 3 or 5+ — anything 3+.
- **Top-quartile close**: yesterday's close was in the upper 25% of yesterday's range (close near the high).
- **Bot-quartile close**: yesterday's close was in the lower 25% of yesterday's range (close near the low).
- **200-day MA**: the average of the last 200 daily closing prices. A widely-watched trend filter — price above it = uptrend, below = downtrend.
- **Above/below 200MA**: yesterday's close position relative to the 200-day MA.
- **NR7**: Narrowest Range of last 7 days. The quietest day of the past week.
