# Max Excursion Before Retest — Plain-English Table

After the 9:30 candle closes, price often expands AWAY from its range before pulling back to retest. This stat measures: **how far does it travel away before it retraces?**

We measure the distance as a percentage of the 9:30 candle's range. So "50%" means price extended an extra half of the opening candle's range past the high (or below the low) before pulling back.

## Headline table

(Sample = 223 trading days. v2 corrected — see AUDIT.md.)

| Distance traveled before retest | Days in sample | % of days |
|---|---|---|
| 0-25% past the candle's range | 100 | **44.84%** |
| 25-50% past the range | 62 | 27.80% |
| 50-100% past the range (up to 1x range) | 48 | 21.52% |
| 100-200% past the range (1-2x range) | 13 | 5.83% |
| 200%+ past the range | 0 | 0.00% |
| Never retested by end of day | 0 | 0.00% |

**Average distance traveled before retest: ~37.5% of the opening range.**

**Plain reading:** Most days (45%) the price barely overshoots before retracing — less than a quarter of the candle's own range. Only **6% of days** does price extend more than the full opening range before pulling back. Almost never (0%) does it extend more than 2x.

## Trade implication

If you're using a stop placed at 1x the opening range past the wick, you'll be stopped out on only ~6% of days before the retest happens. That's a defendable stop placement.

## How reliable?

223 days, ~11 months. Aggregate ±2-3pp.

## Glossary

- **Excursion**: the maximum distance price travels in one direction before reversing.
- **% of opening range**: the distance traveled past the candle's high (or below its low) divided by the candle's own high-low range. So if the 9:30 candle had a range of 100 points, "50%" excursion means price went 50 points past the extreme before retracing.
