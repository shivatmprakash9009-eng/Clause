# Clause — Content management

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 8. Content management

**Where.** `src/content/site.ts`, a typed `as const` object; sections: `brand`, `nav`, `hero`, `features`, `integrations`, `testimonial`, `stats`, `cta`, `footer`, `forms`, `seo`, `legalStubs`.

**Editing rules.** (1) Components hold no marketing strings. (2) A claim about the business MUST be true and attributable; do not invent statistics, awards, clients, prices. (3) Keep headings ≤ 12 words; sentences ≤ 28 words; avoid the never-say list. (4) Any item that is placeholder keeps `demo: true` until replaced; remove the flag *and* the README entry when replaced.

**Demo register.**
| Item | Location | Action before launch |
|---|---|---|
| Statistics (2021, 50K+, 1k+) | `stats.items` | Replace with verified figures or remove |
| Testimonial + attribution | `testimonial` | Replace with a genuine, permitted quote |
| Partner marks | `hero.partners` | Keep only those with permission |
| Integration marks | `integrations.row1/2` | Keep only genuinely supported integrations |
| Email, phone | `brand` | Replace |
| Legal pages | `legalStubs` | Replace with counsel-approved text |
| Social URLs | `footer.social` | Point to real profiles |

**Adding an integration.** Add `slug:Label` to a row; ensure the simple-icons slug exists (or add a fallback in `AppMark`); update `srList`. **Adding a nav item.** Add to `nav.menus` with `title`, `description`, `href`.

**Future i18n.** Wrap `site` in a locale map and route with `[locale]`; no component change is required because components take props.
