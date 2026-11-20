# Clause — Architecture decision records

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 19. Architecture decision records

| ID | Decision | Rationale | Consequence |
|---|---|---|---|
| ADR-001 | Next.js App Router, server-first | SEO, performance, streaming-ready | Client islands must stay small |
| ADR-002 | Tailwind v4 CSS-first with generated tokens | Single source of truth; theme bridge | Compiler script is critical infrastructure |
| ADR-003 | Motion as the only animation library; CSS for the marquee | Smaller bundle, one mental model | No GSAP; scroll-scrub via `useScroll` |
| ADR-004 | Lenis driven by Motion's frame loop | Avoid two rAF loops | Must disable for reduced motion and overlays |
| ADR-005 | Aspekta single family | Matches the brand guide | Licence must be kept with the files; Geist fallback |
| ADR-006 | Preloader gated by head script | No flash, no crawler impact, skippable for tests | Relies on sessionStorage; degrades safely |
| ADR-007 | CSP without nonces | Keeps static rendering | `'unsafe-inline'` for scripts/styles; revisit if dynamic |
| ADR-008 | Plain SVG/div chart | No dependency, full control, accessible | Static data only |
| ADR-009 | Demo content flagged in code and README | Prevent false claims | Launch checklist item |
| ADR-010 | Pricing links to `#cta` | No pricing page in scope | Replace when a page exists |
| ADR-011 | Thick highlighter in hero, thin underline in CTA | Matches reference hierarchy | Two variants of `Highlight` |
| ADR-012 | Gate script is read-only after creation | Prevents weakening checks | Wrong gates are reported, not edited |
| ADR-013 | Scrubbed quote words are painted by CSS `::after` from `data-word` | axe evaluates `aria-hidden` text at dimmed opacity (1.43:1) | Real text node is a full-contrast hidden copy |
| ADR-014 | Hero entrance is CSS-only; no blur on the h1 | Blur inflated simulated LCP to ≈4.0s; CSS runs before hydration | Hero timing lives in `globals.css` (`--load-base`, `--d`) |
| ADR-015 | Reduced motion = instant reveals plus CSS overrides | axe sampled mid-fade colours | No 200ms fade under reduced motion (differs from the Charter) |
| ADR-016 | `useSyncExternalStore` for theme and load gate | Avoids `set-state-in-effect` lint failures and hydration mismatch | Server snapshot is the light/no-preload default |
| ADR-017 | Marquee list rendered on the server, pause state in a client shell | Fewer client bytes | Items repeated ×2 (constant) |
| ADR-018 | `tailwind-merge` extended with token utilities | `text-small` was parsed as a colour | New token groups must be registered in `cn.ts` |
| ADR-019 | Gate failure G-01 reported, not worked around | Forcing focus violates WCAG 2.4.3; gate is read-only (ADR-012) | Gate exits non-zero until the owner decides |

The full chronological log with deviations D-01…D-26 is in `/DECISIONS.md`.
