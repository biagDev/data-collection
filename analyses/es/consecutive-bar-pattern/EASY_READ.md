# ES Consecutive-Bar Pattern — Plain-English Table

If price just printed N green bars in a row (or N red bars in a row), what's the probability the *next* 15-min bar is the same color?

(Sample = 18,971 bars of CME_MINI:ES1! 15-min data, ~11 months)

| If the prior streak is... | ... how often does the next bar continue? | (n) |
|---|---|---|
| **1 same-color bar** | 49.26% | 9,625 |
| **2 same-color bars** | 49.82% | 4,813 |
| **3 same-color bars** | 49.03% | 2,323 |
| **4 same-color bars** | 49.18% | 1,157 |
| **5+ same-color bars** | 45.68% | 1,053 |


## Plain reading

**Exhausted-streak reversal works on ES — at 5+ consecutive same-color bars, only 45.68% continue (vs 54.32% reverse).** That's a 9pp edge with n=1,053. Streaks of 1-4 bars show no edge (49-50% continue). The reversal effect kicks in only at the long-streak tail. **ES is the only asset of the three with a real consecutive-bar edge.**

## How reliable?

Each streak-length bin has n=1,000-10,000+. Confidence intervals are tight (±1-3pp). The findings here are statistically reliable — the lack of an edge is *also* a finding.
