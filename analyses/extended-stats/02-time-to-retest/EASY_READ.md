# Time-to-Retest — Plain-English Table

After the 9:30 candle (9:30-9:45 ET) closes, how long does it take for price to come back to touch its high or low?

## Headline table

(Sample = 223 trading days. v2 corrected — see AUDIT.md for details on a denominator bug fixed in the original version.)

| When the retest happened | Days in sample | % of days |
|---|---|---|
| **Within first 15 minutes (9:45-10:00)** | **203 days** | **91.03%** |
| Within next 15 min (10:00-10:15) | 15 | 6.73% |
| Within next 15 min (10:15-10:30) | 3 | 1.35% |
| Within next 15 min (10:30-10:45) | 2 | 0.90% |
| 60 min - 4 hours later | 0 | 0.00% |
| 4+ hours later | 0 | 0.00% |
| Never hit by end of day | 0 | 0.00% |

**Average time-to-retest (when it does happen): ~16.8 minutes.**

**Plain reading:** **91% of retests happen in the first 15 minutes after close.** If the 9:30 candle hasn't been wicked within 30 minutes, it almost never gets retested at all (only 2-3% of cases extend past that window).

## How reliable?

223 days, ~11 months. Aggregate ±2-3pp. The 91% figure is solid.

## Glossary

- **Retest**: price wicks back to touch the candle's high or low.
- **Bar**: a 15-minute candle.
