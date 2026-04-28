# 9:30 Candle Followthrough — Plain-English Tables

We previously found that the 9:30 candle's color predicts which side gets retested:
- Green 9:30 → ~74% chance the high gets retested by 10:00
- Red 9:30 → ~74% chance the low gets retested by 10:00

Now we ask: **when the predicted side actually gets retested, does today close in that direction?** And how big is the move?

Sample = 232 trading days.

---

## Setup × retest × day-close direction

| Setup | Days in sample | Probability today closes in the predicted direction |
|---|---|---|
| **Green 9:30 + the HIGH gets retested** | 85 | **71.76% close green** ← strong continuation |
| Green 9:30 + the LOW gets retested instead | 25 | 52.00% close green | (coin flip — wrong side retest) |
| **Red 9:30 + the LOW gets retested** | 80 | **70.00% close red** ← strong continuation |
| Red 9:30 + the HIGH gets retested instead | 25 | 40.00% close red | (the day actually closes UP — wrong side retest reverses the bias) |

**Plain reading:** When the candle color predicts correctly AND the predicted side gets retested, **the day finishes in that direction ~70-72% of the time**. When the wrong side gets retested instead, the directional edge disappears entirely.

In other words: **the color predicts WHICH side gets retested, and the side that gets retested predicts how the day closes.** Both ingredients matter.

---

## Body size matters a lot

Splitting by whether the 9:30 candle had a "wide body" (close-to-open distance is at least half of the high-to-low range) or a "narrow body" (less than half):

| Setup | Days in sample | % closing in predicted direction |
|---|---|---|
| **Green 9:30 with WIDE body + high retest** | 39 | **76.92% close green** ← strongest bullish setup |
| Green 9:30 with NARROW body + high retest | 46 | 67.39% close green |
| **Red 9:30 with WIDE body + low retest** | 49 | **79.59% close red** ← strongest bearish setup |
| Red 9:30 with NARROW body + low retest | 31 | 54.84% close red |

**Plain reading:** Wide-body 9:30 candles produce stronger continuation than narrow-body. The red-side asymmetry is huge — wide-body red gives **80% follow-through**, narrow-body red gives only 55% (basically coin flip).

If you're going to act on the 9:30 color signal, **filter for wide-body candles**.

---

## How far does price travel after the high gets retested?

For Green 9:30 + high retest days only (n=85), measuring how far price extends past the 9:30 high during the rest of the session:

| Distance past 9:30 high | Days | % of cases |
|---|---|---|
| Less than 25% of the 9:30 candle's range | 11 | 12.94% |
| 25-50% past | 5 | 5.88% |
| 50-100% past | 27 | 31.76% |
| **100-200% past (1-2x the range)** | 27 | **31.76%** |
| **More than 2x the range past** | 15 | **17.65%** |

**Average distance traveled past the high: 1.21x the 9:30 candle's range.**

**Plain reading:** Strong follow-through. **About 81% of these days extend MORE than half the 9:30 range past the high.** Almost half (49.4%) extend more than 1x the range. About 17.6% of days extend more than 2x — these are the big trend days.

---

## Plain-English trade implications

1. **Wait for confirmation.** The 9:30 candle's color is only stage 1 of the signal. Stage 2 is "did the predicted side actually get retested by 10:00?" Don't trade purely on color.

2. **Filter for wide-body candles.** A narrow-body green 9:30 produces 67% follow-through; a wide-body green 9:30 produces 77%. The body-size filter adds 10 percentage points of edge.

3. **Targets can be ambitious when the setup confirms.** Mean follow-through is 1.2x the 9:30 candle's range — meaning if the 9:30 candle was 100 points wide, the day on average extends 120 points past the high.

4. **The opposite-side retest is a warning.** If you saw a green 9:30 but then the LOW gets retested first, the directional edge is gone. Step aside.

---

## How reliable are these numbers?

- Sample = 232 days (~11 months of NQ history).
- Headline cells (n=80-85): trustworthy to ~±5pp.
- Body-size sub-splits (n=31-49): trustworthy to ~±10pp. Treat as directional indicators, not precise figures.
- The 76.92% wide-body green and 79.59% wide-body red are striking but with ~±10pp margins — could realistically be anywhere from 67-87%.

---

## Glossary

- **9:30 candle**: the 15-minute candle from 9:30 to 9:45 ET (the regular session opening candle).
- **Retest**: a later 15-minute candle's wick reaches back to the 9:30 candle's high or low.
- **Day closes green/red**: the RTH session's closing price (15:45 candle close, ~16:00 ET) is above (green) or below (red) the 9:30 candle's open.
- **Wide body**: the distance from the candle's open to its close is at least half of its full range (high - low). A bullish/bearish push that closed near the day's extreme.
- **Narrow body**: the open-to-close distance is less than half the range. A more indecisive candle with long wicks.
- **Excursion past the high**: how far above the 9:30 candle's high price reached during the rest of the session. Measured as a % of the 9:30 candle's own high-to-low range.
