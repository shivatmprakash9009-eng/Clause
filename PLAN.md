# PLAN — Clause marketing site

Each item is paired with its gate. Status is tracked in `progress.md` and `feature.json`.

- [x] **Phase 0 — Inquest.** View `/reference/*`, extract video frames (`reference/frames`), create PLAN / DECISIONS / progress / feature.json / routes.json / init.sh / project rules. Gate: files exist.
- [x] **Phase 1 — Foundations.** Next.js scaffold, strict TS, tokens pipeline, globals.css, head script, motion constants, SmoothScroll, shell, `scripts/check.mjs`. Gate: `pnpm lint && pnpm typecheck && pnpm build`.
- [x] **Phase 2 — Sections.** Preloader, Header, Hero, Partners, Features, Integrations, Testimonial, Stats, CTA, Footer, stub routes, LeadForm, `/api/lead`. Gate: per-section visual diff + `check.mjs`.
- [ ] **Phase 3 — The Gate.** `node scripts/check.mjs` exits 0; Lighthouse lab LCP/CLS/TBT; visual-diff loop (≤ 4 rounds).
- [ ] **Phase 4 — Documentation.** `README.md` and `docs/01…15`.
- [ ] **Phase 5 — Review.** Independent reviewer (Appendix J) run by the owner in a fresh chat.
- [ ] **Phase 6 — Final report.**
