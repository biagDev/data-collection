# Weekly Patterns Vol. 1 — Plain-English Tables

Five starter stats on NQ weekly candles. Sample = ~1,398 weekly bars (~27 years).

---

## Stat 1: What happens after a winning or losing streak of weeks?

| Streak ending last week | Weeks in sample | Next week green | Next week red | Edge vs 50/50 |
|---|---|---|---|---|
| 1 green | 348 | 54.60% | 45.40% | +4.6% lean green |
| 2 green | 190 | 50.53% | 49.47% | +0.5% lean green (basically coin flip) |
| **3 green** | **96** | **59.38%** | 40.63% | **+9.4% lean green** |
| 4 green | 56 | 55.36% | 44.64% | +5.4% lean green |
| **5+ green** | **88** | **65.91%** | 34.09% | **+15.9% lean green ← strongest** |
| 1 red | 346 | 55.78% | 44.22% | +5.8% lean green (bounce) |
| 2 red | 153 | 59.48% | 40.52% | +9.5% lean green |
| **3 red** | **62** | **41.94%** | 58.06% | **-8.1% NO BOUNCE** ← counter-intuitive |
| **4 red** | **36** | **66.67%** | 33.33% | **+16.7% strong bounce** |
| 5+ red | 23 | 52.17% | 47.83% | +2.2% (small sample) |

**Plain reading:** Bull streaks get stronger over time. **5+ green weeks → 66% another green next week** — far stronger than the daily equivalent (57%). Red streaks bounce as expected... except at the 3-red bucket, which oddly continues red 58% of the time. That's worth flagging — could be small-sample noise or a real "bear momentum kicks in" pattern.

---

## Stat 2: What happens after a quiet (NR4) week?

NR4 = the smallest weekly range of the last 4 weeks. Quiet/compressed week.

| What happens next week | Probability | Sample = 369 |
|---|---|---|
| Range expands (bigger than NR4 week) | **74.25%** |  |
| How much bigger on average | 1.37x |  |
| Closes green | 56.64% |  |
| Closes red | 43.36% |  |

**Plain reading:** Compressed weeks usually expand the next week — 74% rate (vs daily NR7 at 84%, so weaker on weekly). Direction lean is mild bullish (~57%).

---

## Stat 3: What happens after a strong-close or weak-close week?

| Last week's close was… | Weeks in sample | Next week takes out last week's high | Next week closes green |
|---|---|---|---|
| Near its high (top 25%) | 543 | **88.58%** | 58.20% |
| Near its low (bot 25%) | 331 | (Lower low) **86.10%** | 47.13% red |

**Plain reading:** Massive breakout signal. After a strong close, next week takes out the previous week's high almost 9 times out of 10. But "takes out the high" isn't the same as "closes green" — only 58%. The high gets tagged then often pulls back.

---

## Stat 4: Inside week vs outside week — what comes next?

**Inside week** = entire week's range stays within the previous week. Compression.

**Outside week** = the week engulfs the previous week's range entirely (sweeps both sides).

| Setup | Weeks in sample | Result |
|---|---|---|
| **After inside week** | 112 | **63.39%** break the prior week's high; 50% break the low |
| After inside week — close color | 112 | 54.46% close green |
| **After outside-RED week** | **82** | Only **41.46% close red** ← reversal! 58.54% green |
| After outside-GREEN week | 73 | 56.16% close green (slight continuation) |
| After outside (any color) | 155 | 57.42% green |

**Plain reading:**
- **Inside weeks tend to break UPWARD.** 63% break the high vs 50% break the low — net bullish on resolution.
- **Outside-red weeks reverse strongly.** Only 41% follow with another red, meaning 58.5% bounce. This is the strongest reversal signal in the table.
- Outside-green weeks continue mildly (56% green).

---

## Stat 5: Do weekly gaps fill?

A weekly "gap" = this week's open vs last week's close. For NQ futures (which trades nearly 24h), most weekly gaps are tiny.

| Gap size in NQ points | Weeks in sample | Times it filled | Fill rate |
|---|---|---|---|
| Tiny (under 50 pts) | 1,235 | 93.68% | almost always (likely inflated by contract-roll noise) |
| Small (50-150 pts) | 56 | 80.36% |  |
| Medium (150-300 pts) | 10 | 80.00% (small sample) |  |
| Big (300+ pts) | 7 | 71.43% (tiny sample) |  |

| Direction | Weeks | Filled | Week ends in same direction |
|---|---|---|---|
| Gap up (any size) | 652 | **91.41%** | 57.36% green close |
| Gap down (any size) | 656 | **94.36%** | 46.19% red close |

**Plain reading:** Almost all weekly gaps fill, even larger ones (80%+ for the 50-300 point range). This is much more reliable than daily gap fill at the same size. Weekly gap fades are reliable.

But: be careful interpreting the "gap up + 57% green" line — that means the gap fills AND the week tends to still close green afterward. So the "fade the gap then ride the trend" sequence works.

---

## Big-picture takeaways across all 5 stats

1. **Weekly bull streaks compound stronger than daily.** 5+ green weeks → 66% chance of another green vs 57% on daily. Trend persistence is a weekly phenomenon.

2. **The 3-red anomaly.** After 3 red weeks, the bounce DOESN'T happen — momentum continues red 58%. By week 4 it snaps back at 67%. If real, this is a "lose patience" pattern where 3 weeks down sucks in fading retail buyers, then the 4th week catches them.

3. **Strong-close weeks are nearly always followed by a high break** (89%). Easiest breakout signal in the toolkit.

4. **Outside-red is the cleanest reversal pattern.** 58% bounce after a wide-range red week.

5. **Weekly gaps fill more reliably than daily gaps** (91-94% vs 67% daily). Don't try to trade weekly gap-and-go.

---

## How reliable are these numbers?

- 1,398 weeks total (~27 years). Aggregate stats with n>500 are trustworthy to ±2pp.
- Sub-buckets in the 100-200 range have ±5-7pp confidence intervals.
- Smallest buckets (gap >300 pts at n=7, 5+ red streaks at n=23) are anecdotal — treat as suggestive, not actionable.
- The "3-red continues red" finding (n=62) has ±10pp wide CI — could be 32-52%. Worth replicating on more data.

## Glossary

- **Streak**: consecutive same-color weeks (using close > open as "green").
- **NR4**: Narrowest Range of last 4 weeks — the quietest week.
- **Top quartile close**: close in the upper 25% of the week's range.
- **Inside week**: this week's high < last week's high AND low > last week's low. Compression.
- **Outside week**: this week's high > last week's high AND low < last week's low. Range expansion sweeping both extremes.
- **Higher high (HH)**: next week's high exceeds this week's high.
- **Gap fill**: this week's price returns to the prior week's closing level at some point.
