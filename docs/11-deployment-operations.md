# Clause — Deployment and operations

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 16. Deployment

**Target.** Vercel (static rendering where possible; `/` revalidates daily so the footer year stays current, D-14). The agent prepares; the owner deploys. Nothing has been deployed.

1. Create the project from the Git repository; framework preset Next.js; Node per `.nvmrc`.
2. Set environment variables (Production and Preview): `NEXT_PUBLIC_SITE_URL`, optional Turnstile keys and `LEAD_WEBHOOK_URL`.
3. Build command `pnpm build`; install `pnpm install --frozen-lockfile`.
4. Attach the domain; enforce HTTPS and a single canonical host (www or apex) with a redirect.
5. After the first deploy run the gate against the preview URL (`BASE_URL=https://… node scripts/check.mjs`) and Lighthouse on production.
6. Verify headers: `curl -I https://your-domain/` shows the security headers of §13.
7. Submit `sitemap.xml` to search consoles.

**Environments.** Local (`pnpm dev`), Preview (per pull request), Production (main). Rollback: promote the previous deployment in the platform dashboard.

**Release checklist.** Lint, typecheck, build, gate, Lighthouse, `pnpm audit`, changelog entry, tag.

## 17. Operations runbook and troubleshooting

| Symptom | Likely cause | Resolution |
|---|---|---|
| Tokens do not apply | `tokens.css` stale | `pnpm tokens`; restart dev |
| Raw-colour gate failure | Literal hex/oklch in a component | Move to `tokens.json`; use utility |
| Self-referencing CSS variable | Token name equals Tailwind theme name | Source vars are `--c-*`, `--r-*`, `--sh-*`, `--e-*`; keep the prefix scheme |
| Flash of wrong theme | Head script removed or deferred | Restore inline script (Charter B3) |
| Preloader appears on every load | `sessionStorage` blocked | Acceptable; or add a cookie-free fallback flag in memory |
| Preloader appears in tests | Missing `?nopreload=1` | Add the parameter; the head script also skips `navigator.webdriver` |
| Layout shift in stats | Width not reserved | Keep `min-width` in `ch` on `Counter` |
| Marquee gap/jump | List narrower than panel, or padding mismatch | Repeat items until list ≥ panel width; keep `padding-right` equal to gap |
| Smooth scroll fights anchors | Lenis intercepts | Use `lenis.scrollTo` on anchor clicks or rely on `scroll-padding-top` with native hash handling |
| Smooth scroll stuck under Sheet | Lenis not stopped | Call `lenis.stop()` on open, `start()` on close |
| Jank on mid-range phones | Blur filters on large text | Reduce blur radius or limit to hero h1 |
| Lighthouse LCP high | Font swap, overlay, hydration | See §11 |
| axe misses issues in menus | Hidden regions are skipped | Open the region, then rerun |
| Forms always succeed locally | No webhook set | Expected; set `LEAD_WEBHOOK_URL` |
| Build then start fails with 500 chunk errors | `pnpm build` ran while `pnpm start` was serving | Stop the server, `rm -rf .next`, rebuild, restart |
| Font fails to load | Wrong `next/font/local` path | Verify `/public/fonts` and `src` entries; fallback Geist is logged |

**Monitoring after launch.** Field Core Web Vitals (including INP), uptime check on `/`, form endpoint error rate, dependency alerts.
