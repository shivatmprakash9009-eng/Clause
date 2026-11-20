# Clause — Glossary and licences

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 21. Glossary

| Term | Meaning |
|---|---|
| Charter | The master system-instruction document given to the agent |
| Gate | `scripts/check.mjs`; objective definition of done |
| Token | A named design value in `tokens.json` |
| DEMO content | Placeholder content from the design; flagged `demo: true` |
| [M] / [E] / [A] | Measured / estimated / assumed value tags |
| Highlighter | The lime bar that draws under a key word |
| Scrub | Animation progress tied to scroll position |
| Island | A client component within a server-rendered page |
| LCP / CLS / INP / TBT | Largest Contentful Paint / Cumulative Layout Shift / Interaction to Next Paint / Total Blocking Time |
| WCAG | Web Content Accessibility Guidelines |
| ADR | Architecture decision record |
| Honeypot | Hidden form field that humans leave empty and bots fill |

## 22. Third-party licences and legal notes

Runtime dependency licences (`pnpm licenses list --prod`, 2026-11-20):

| Licence | Packages (examples) |
|---|---|
| MIT | next, react, react-dom, radix-ui and `@radix-ui/*`, motion, lenis, react-hook-form, zod, `@hookform/resolvers`, clsx, tailwind-merge, `@floating-ui/*`, `@babel/*` (transitive) |
| Apache-2.0 | class-variance-authority, sharp (optional image optimiser), `@swc/helpers` |
| ISC | lucide-react |
| CC0-1.0 | simple-icons (data only; brand marks remain trademarks of their owners) |
| CC-BY-4.0 | caniuse-lite (transitive build data) |
| LGPL-3.0-or-later | `@img/sharp-libvips-*` (prebuilt libvips binaries pulled in by sharp; used only by Next's image optimiser, which this site does not exercise since it has no raster images — review if you deploy somewhere that bundles them) |
| SIL OFL 1.1 | Aspekta (`public/fonts/LICENSE.txt`) |

Regenerate with `pnpm licenses list --prod`. Expected categories: React/Next.js/Tailwind/Radix/Motion/Lenis/lucide (permissive open-source licences); `simple-icons` (CC0 for the data; brand marks remain **trademarks of their owners**); Aspekta (SIL Open Font License — keep the licence file with the fonts and respect its terms; confirm against the distribution you download); Geist (fallback; SIL OFL).
Third-party brand marks appear only as factual integration marks and flagged placeholders; do not recolour them or imply endorsement. No real person's photograph is used. Confirm that you hold the right to use the supplied design.
This documentation is general information, not legal advice; consult a lawyer for licensing or trademark questions.
