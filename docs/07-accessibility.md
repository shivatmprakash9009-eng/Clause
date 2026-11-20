# Clause — Accessibility

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 10. Accessibility

**Target.** WCAG 2.2 level AA.

**Implemented measures.** Landmarks, one `h1` per route, no skipped levels; skip link first in tab order; visible focus (2px ink/lime ring) everywhere; sticky header never obscures focus (`scroll-padding-top: 96px`, 2.4.11); targets ≥ 24px (2.5.8); no drag-only interaction (2.5.7); no cognitive-test authentication (3.3.8); contrast ≥ 4.5:1 text, 3:1 large text and UI in both themes; reduced-motion honoured; marquee pause control (2.2.2); chart with text alternative and focusable bars; labelled form controls with associated errors; decorative graphics hidden from assistive technology; one accessible label on split-word headings.

**Automated result (2026-11-20).** axe (wcag2a/2aa/21aa/22aa) reports no violations on every route at 1280 in light, with the menu open, in dark, and under reduced motion; Lighthouse accessibility 1.0 and SEO 1.0.

**Test procedure.**
1. Automated: gate runs axe with `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa` at 1280 on every route, again with the menu open, in dark mode and under reduced motion. Tags are not cumulative.
2. Hidden regions: open the Solutions menu, mobile sheet and a failed form; rerun axe (axe skips hidden regions).
3. Review axe `incomplete` results by hand; list them in the final report.
4. Keyboard: Tab from the top; first stop is the skip link; every stop shows a focus indicator; menus operable with Enter/Space/arrows/Esc; switches with Space.
5. Screen reader spot checks (VoiceOver + NVDA or TalkBack): headline reads once; chart summary; marquee list; form errors announced.
6. Zoom/reflow: 200% and 400% zoom, 320px width, no horizontal scroll.
7. Motion: toggle OS reduced motion; verify §7.6.

**Known limitations.** (1) Gate item G-01: with the Solutions menu used first, the next Tab from the page start lands on "Customers", not the skip link (browser sequential-focus start point). Fixing it by forcing focus would break WCAG 2.4.3, so it is reported, not worked around (`DECISIONS.md`). From a fresh page load the skip link is the first stop. (2) Screen-reader, forced-colours, 200%/400% zoom and real-device passes were **not performed** in this build. (3) axe `incomplete` results were not triaged by hand. **Accessibility statement:** standard targeted WCAG 2.2 AA; last automated audit 2026-11-20; contact: owner to fill.
