# Clause — Performance and SEO

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 11. Performance

**Budgets (lab, mobile emulation; reviewed 2026-11-20).** LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 200ms. INP (field metric, ≤ 200ms) cannot be asserted in lab; monitor in the field after launch. A JavaScript size budget is **not** asserted (the commonly quoted figure is unverified); report first-load JS from `next build` and justify anything above ≈ 200 KB gzip.

**Practices.** Server Components by default; client islands minimal; `LazyMotion` + `m`; fonts WOFF2, Latin subset, ≤ 4 weights, preloaded via `next/font`; explicit width/height on any image; animate transform/opacity only; counters reserve width; nothing is injected above existing content; off-screen loops paused.

**Results (2026-11-20, Lighthouse 13.6.0, mobile preset, simulated throttling, production build, `?nopreload=1`, 5 runs).**

| Run | LCP | CLS | TBT | Perf |
|---|---|---|---|---|
| 1 | 0.9s | 0 | 351ms | 0.92 |
| 2 | 0.9s | 0 | 244ms | 0.95 |
| 3 | 0.9s | 0 | 316ms | 0.93 |
| 4 | 0.9s | 0 | 360ms | 0.92 |
| 5 | 0.9s | 0 | 340ms | 0.92 |

LCP and CLS are within budget. **TBT misses the ≤200ms budget** (median 340ms; earlier runs ranged 50–460ms). Long tasks are the React/Next runtime chunk (≈72 KB gzip, 722ms scripting under 4× throttle) and the Motion chunk. First-load JavaScript on `/` is ≈285 KB gzip across 12 script chunks, above the ≈200 KB guideline. Candidate fixes, not applied: lazy-hydrate below-the-fold islands, defer Lenis and FloatingAvatars to idle, reduce the number of Motion islands. Lab numbers are not field INP.

**Measurement.**
```bash
pnpm build && pnpm start &
npx lighthouse http://localhost:3000 --output json --output-path ./reference/out/lh.json --quiet --chrome-flags="--headless"
node -e "const r=require('./reference/out/lh.json').audits;console.log('LCP',r['largest-contentful-paint'].displayValue,'CLS',r['cumulative-layout-shift'].displayValue,'TBT',r['total-blocking-time'].displayValue)"
```
Results below. If LCP exceeds budget, check in order: font preload/swap, preloader gating (`?nopreload`), h1 reveal blur cost, hydration delay.

## 12. SEO

Per-route `metadata` (unique title and description; soft limits ≈ 60/155 characters: warn only); canonical; Open Graph and Twitter; generated 1200×630 OG image; `robots.ts`; `sitemap.ts` with absolute canonical URLs; icons from the Logo SVG; JSON-LD `Organization` and `WebSite` matching visible content; server-rendered content; no `noindex` outside stubs the owner chooses to hide. Policy on AI/training crawlers is an owner decision (default: allowed; recorded in `DECISIONS.md`). Do not promise FAQ/HowTo rich results. Search Console and sitemap submission are post-launch tasks.
