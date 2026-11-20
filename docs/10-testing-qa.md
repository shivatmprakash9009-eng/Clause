# Clause — Testing and QA

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 15. Testing and QA

### 15.1 The gate (`scripts/check.mjs`)
Static: no raw colours outside tokens; no `href="#"`; no TODO/FIXME; no arbitrary font sizes; README has *Replace before launch*; `docs/` exists. Browser (4 viewports × every route): HTTP status; console errors; horizontal overflow; one `h1`; title, description, canonical, `og:title`, `lang`; broken images/alt; placeholder text; skip link; current footer year; targets ≥ 24px. At 1280: axe (4 tag sets), axe with menu open, first-Tab = skip link, visible focus on 40 stops, theme toggle works, dark + reduced-motion axe, marquee static under reduced motion and exactly two rows. Plus `/robots.txt`, `/sitemap.xml`, and the empty-submit error on `/start`.

**Gate status (2026-11-20).** Lint, typecheck, build, `pnpm test` (1 file, 1 test) pass. `node scripts/check.mjs` fails on exactly one assertion: G-01 (see §10). Everything else it checks passes.

### 15.2 Not covered by the gate (manual or separate commands)
Lighthouse; visual diff; sheet and form-error axe; screen reader pass; real-device pass.

### 15.3 Visual diff procedure
1. Screenshot 1440×900, `?nopreload=1`, wait 2.5s → `reference/out/full-1440.png`. 2. Scale `01-full-page.png` to 1440 wide. 3. Compare section by section (heights, widths, type size, radii, spacing, colour). 4. Fix deviations > 8px or > 10% by **editing tokens**. 5. Repeat ≤ 4 rounds. 6. Log residuals (below). 7. Inspect 768 and 375 captures.

**Residuals (2 rounds at 1440; page height 5293px vs 5278px reference).** Photo avatars replaced by initials discs (no imagery available); brand marks use simple-icons glyphs rather than the reference's exact wordmarks (Slack, Monday.com, LinkedIn use neutral lucide glyphs, D-21); sub-pixel type metrics differ slightly. 768 and 375 were inspected by capture (`reference/out/m-375*.png`), not diffed against a reference (none was supplied).

### 15.4 Manual test matrix
| Dimension | Values |
|---|---|
| Browsers | Chrome, Safari, Firefox, Edge (latest) |
| Devices | iPhone (small and large), Android mid-range, iPad, laptop 1440, desktop 1920 |
| Preferences | light, dark, reduced motion, 200% zoom, forced colours (smoke) |
| Inputs | mouse, touch, keyboard-only, screen reader |

### 15.5 Reviewer protocol
Fresh chat; the Charter's Appendix J prompt; live URL; scores 1–5 (design coherence and originality double weight); fail below 4; at most three rounds; only report gaps that affect correctness or stated requirements.

### 15.6 Defect template
`Route · Viewport · Browser · Steps · Expected · Actual · Evidence (screenshot/video) · Severity (blocker/major/minor) · Suggested fix`.
