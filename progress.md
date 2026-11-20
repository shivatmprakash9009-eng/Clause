# progress

Evidence log. Only `feature.json` `passes` flags change, and only with evidence below.

## 2026-11-20 — Phases 0–2
- `pnpm lint`, `pnpm typecheck`, `pnpm build` exit 0 (Next 16.4.6; 12 static pages).
- Visual diff round 1–2 at 1440 (see D-05): full-page height 5293px vs 5278px reference.

## 2026-11-20 — Phases 3–4
- Visual diff 1440 (2 rounds), 375 sheet inspected; residuals in `docs/10-testing-qa.md`.
- Gate: only G-01 fails (reported). Lint/typecheck/build/test pass; `pnpm audit` clean.
- Lighthouse x5 (mobile, simulated): LCP 0.9s, CLS 0, TBT 244/316/340/351/360ms (over budget), perf 0.92–0.95, a11y 1, SEO 1. JS ≈285 KB gzip.
- README and docs/01–15 written from the template with build values.
- `feature.json`: `passes:true` for items evidenced by the gate (per-route/viewport checks, axe), screenshots and code review. Not individually hand-tested: per-state hover/active styling and timing details (e.g. "Saved" 1.5s). `false`: skip-link-first-Tab (G-01), axe on sheet/form-error states with `incomplete` review, Lighthouse TBT budget, gate pass.
