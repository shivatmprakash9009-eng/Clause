# Clause — marketing website

Marketing site for Clause, a contract-management platform for legal and operations teams. One long-scroll home page (preloader, hero, feature bento, integrations marquee, testimonial, key figures, closing CTA, footer) plus `/start`, `/demo`, `/privacy`, `/terms`.

Stack: Next.js 16.4.6 (App Router) · React 19.3.1 · TypeScript 5.9.3 strict · Tailwind CSS 4.3.5 (generated tokens) · Motion 14.14.0 · Lenis 1.3.27 · radix-ui · Aspekta.

## Quickstart

```bash
# prerequisites: Node 22 (.nvmrc), pnpm 10
pnpm install
cp .env.example .env.local        # all values optional for local use
pnpm dev                          # http://localhost:3000 (tokens compile automatically)
```

| Script | Action |
|---|---|
| `pnpm dev` | Compile tokens, start the dev server |
| `pnpm build` / `pnpm start` | Production build / serve it |
| `pnpm lint` · `pnpm typecheck` · `pnpm test` | ESLint · `tsc --noEmit` · Vitest |
| `pnpm tokens` | Recompile `tokens.json` → `src/styles/tokens.css` |
| `BASE_URL=http://localhost:3000 node scripts/check.mjs` | Quality gate (read-only script) |

`?nopreload=1` suppresses the preloader (used by the gate and visual diffs).

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | production | Canonical URLs, sitemap, Open Graph |
| `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET` | optional | Bot protection on forms (implemented, untested) |
| `LEAD_WEBHOOK_URL` | optional | Forward valid leads; unset = logged server-side only |

## Status (2026-11-20)

| Check | Result |
|---|---|
| `pnpm lint`, `typecheck`, `build`, `test` | pass |
| `pnpm audit` | no known vulnerabilities |
| `node scripts/check.mjs` | **fails on one item, G-01**: after using the Solutions menu, the next Tab lands on "Customers", not the skip link. Not worked around: forcing focus would violate WCAG 2.4.3. Details in `DECISIONS.md`. |
| Lighthouse mobile (5 runs) | LCP 0.9s ✔ · CLS 0 ✔ · **TBT 244–360ms ✘ (budget 200ms)** · perf 0.92–0.95 · a11y 1.0 · SEO 1.0 |
| First-load JS on `/` | ≈285 KB gzip (above the ≈200 KB guideline) |
| Not performed | screen-reader pass, real-device pass, forced-colours and zoom passes, Turnstile test, reviewer protocol |

## Replace before launch

Placeholders are flagged `demo: true` in `src/content/site.ts`. Do not ship them as fact.

| Item | Location | Action |
|---|---|---|
| Statistics (2021, 50K+, 1k+) | `stats.items` | Replace with verified figures or remove |
| Testimonial and attribution (Darlene Robertson, Mailchimp) | `testimonial` | Replace with a genuine, permitted quote |
| Partner marks (HubSpot, Dropbox, Square, Intercom, Grammarly) | `hero.partners` | Keep only those with permission |
| Integration marks | `integrations.row1/2` | Keep only genuinely supported integrations |
| Email, phone | `brand` | Replace |
| Privacy and Terms text | `legalStubs` | Replace with counsel-approved text |
| Social URLs | `footer.social` | Point to real profiles |
| Pricing / Blog links | `nav`, `footer` | Currently `#cta` / `#top` (D-23) |

## Imagery

No raster images are used. The sandbox that built this blocked Unsplash and Pixabay and the Charter forbids photography, so hero avatars are generated initials discs and the logo is an original SVG. Add licensed photos if you want the reference's photo avatars.

## Documentation

`docs/01-overview.md` · `02-architecture` · `03-design-system` · `04-components` · `05-motion` · `06-content` · `07-accessibility` · `08-performance-seo` · `09-security-forms` · `10-testing-qa` · `11-deployment-operations` · `12-contributing` · `13-adr` · `14-launch-checklist` · `15-glossary-licences`.
Governance: `PLAN.md`, `DECISIONS.md`, `progress.md`, `feature.json`, `CHANGELOG.md`.

## Licences

Aspekta is SIL OFL 1.1 (`public/fonts/LICENSE.txt`). Third-party brand marks are trademarks of their owners and appear only as flagged placeholders. See `docs/15-glossary-licences.md`.
