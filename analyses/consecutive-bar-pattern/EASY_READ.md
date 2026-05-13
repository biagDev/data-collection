# NQ Consecutive-Bar Pattern — Plain-English Table

If price just printed N green bars in a row (or N red bars in a row), what's the probability the *next* 15-min bar is the same color?

(Sample = 20,102 bars of CME_MINI:NQ1! 15-min data, ~11 months)

| If the prior streak is... | ... how often does the next bar continue? | (n) |
|---|---|---|
| **1 same-color bar** | 49.28% | 10,181 |
| **2 same-color bars** | 48.88% | 5,096 |
| **3 same-color bars** | 50.02% | 2,453 |
| **4 same-color bars** | 49.96% | 1,193 |
| **5+ same-color bars** | 49.79% | 1,179 |


## Plain reading

**No meaningful streak-length edge.** Continuation hovers at 49-50% across all streak lengths 1-5+. The classic 'buy after 3 red bars / sell after 3 green bars' heuristic has **zero statistical basis** on NQ 15m bars. Slight reversal bias overall (50.66%), but well within sampling noise.

## How reliable?

Each streak-length bin has n=1,000-10,000+. Confidence intervals are tight (±1-3pp). The findings here are statistically reliable — the lack of an edge is *also* a finding.
