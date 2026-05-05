# Pre-Market Range Break-and-Go — Plain-English Tables

The pre-market session (4:00 AM - 9:30 AM ET) sets a high (PMH) and a low (PML) before the regular session opens. Day traders watch these levels constantly. Question: **how does the regular session interact with them?**

Sample = 229 trading days.

## The big surprise: only 1 day in 229 stayed inside

| Outcome by end of day | Days | % of days |
|---|---|---|
| **Either PMH or PML broken** | 228 | **99.56%** |
| Both PMH AND PML broken (full sweep) | 92 | 40.17% |
| Neither broken (contained day) | **1** | **0.44%** |

**Plain reading:** RTH almost always takes out at least one side of pre-market. **Only 1 day in 229 stayed inside the PM range** — making "PM range survives RTH" essentially never. The PM levels are magnetic.

## Break rates by time window

How fast does each side break?

| | PMH broken | PML broken |
|---|---|---|
| By 10:00 | 49.34% | 49.34% |
| By 10:30 | 57.64% | 55.90% |
| By 11:00 | 61.57% | (not tracked) |
| By EOD | **71.18%** | **68.56%** |

**Plain reading:** Each side has roughly 70% chance of getting broken by EOD. About half of breakouts happen in the first 30 minutes after the open.

## Pre-market color is a clean directional signal

| PM session | Days | PMH broken | PML broken |
|---|---|---|---|
| **Green PM** (RTH opens above PM open) | 127 | **84.25%** | 56.69% |
| **Red PM** (RTH opens below PM open) | 102 | 54.90% | **83.33%** |

**Plain reading:** Mirror pattern. **After a green pre-market, the PMH breaks 84% of the time.** After a red pre-market, the PML breaks 83% of the time. PM direction is one of the cleanest directional signals we've measured.

The mirror nature here is striking — symmetric ~84% on both sides means it's not just NQ's bullish drift. The PM session's direction genuinely predicts which side of the range RTH will break first.

## First-break direction without conditioning is a coin flip

- PMH first: 48.91%
- PML first: 47.60%
- Both same bar: ~3%

**Plain reading:** Without knowing the PM color, you can't predict which side breaks first. The directional edge comes from conditioning on PM color, not from inherent timing asymmetry.

## PM range size affects sweep rate (counter-intuitively)

| PM range size | Days | Both sides broken (sweep) |
|---|---|---|
| Small (< 100 pts) | 75 | **53.33%** ← high sweep rate |
| Medium (100-300 pts) | 138 | 35.51% |
| Large (> 300 pts) | 16 | 18.75% (small sample) |

**Plain reading:** Tighter pre-markets → MORE likely to sweep both sides (53%). Wider pre-markets → LESS likely to sweep (19%).

The mechanism: tight PM = compressed price → RTH releases that compression by hitting both sides. Wide PM = strong directional move overnight → RTH usually continues that direction without reversing.

## Average sizes

- Average PM range: **154 NQ points**
- Average RTH range: **308 NQ points**
- PM range averages **54% of RTH range**

The pre-market session establishes about half of the day's total price action.

## What this means for day trading

Three concrete decision rules from this data:

1. **PM levels are tradeable.** With 99.56% of days breaking at least one side, plan that PMH or PML gets traded. Don't get caught flat-footed.

2. **Trade WITH the PM color, not against it.** Green PM → expect PMH break (84% rate). Red PM → expect PML break (83% rate). Combined with our earlier 9:30-color stat (extended-stats #04), if both signals align (e.g., green PM + green 9:30 candle), you have a strong directional read.

3. **Tight PM = expect a sweep day.** If the PM range is under 100 points, expect both sides to get hit (~53%). Reload-and-fade strategy possible. Wide PM → expect a directional day, fade-the-extreme will likely fail.

## How reliable are these numbers?

- 229 days, ~11 months. Aggregate stats with n>100 are trustworthy to ±5pp.
- Small sub-buckets (large PM range, n=16) have wider CIs (~±15pp). Treat as suggestive.
- The 99.56% "either broken" stat is overwhelmingly robust — even at smaller samples this would hold.

## Glossary

- **PMH (Pre-market High)**: highest price between 4:00 AM and 9:30 AM ET.
- **PML (Pre-market Low)**: lowest price in the same window.
- **PM color**: green if 9:30 RTH open is above the 4:00 AM PM open; red if below.
- **Sweep**: both PMH and PML get broken in RTH.
- **Contained day**: RTH stays inside PM range entirely.
- **By EOD**: by the close of the 15:45-16:00 RTH bar.
