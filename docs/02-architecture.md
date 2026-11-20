# Clause — Architecture

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 3. Architecture

### 3.1 Principles
1. **Server-first.** Everything static renders on the server. Client components exist only where interaction or motion demands: header behaviour, hero motion, scroll-scrubbed text, stateful cards, marquee, counters, forms, theme toggle, preloader.
2. **Tokens before components.** All visual values originate in `tokens.json`.
3. **Content outside components.** All copy lives in `src/content/site.ts`.
4. **One animation library.** Motion for animation; Lenis for scroll; CSS for the marquee.
5. **Accessibility is a feature gate**, not a polish pass.

### 3.2 Runtime view
```text
Browser
 ├─ HTML (SSR, complete content, one <h1>)
 ├─ head script ── sets data-theme, data-preload before first paint
 ├─ CSS: tokens.css (vars) + Tailwind utilities + globals.css (marquee, grid, sheen)
 └─ JS (client islands)
      SmoothScroll ─ Lenis driven by Motion's frame loop (single rAF)
      Preloader ── Header ── Hero(HeroHeadline, FloatingAvatars)
      Features(BarChart, NotificationsCard, TaskCard) ── Integrations(Marquee)
      Testimonial(SplitWords scrub) ── Stats(Counter) ── CtaBand ── Footer(ThemeToggle)
      LeadForm ──► POST /api/lead ──► (Turnstile verify) ──► LEAD_WEBHOOK_URL | server log
```

### 3.3 Build pipeline
`tokens.json` → `scripts/build-tokens.mjs` → `src/styles/tokens.css` (`:root` light vars, `[data-theme='dark']`, OS-dark media block, and a Tailwind v4 `@theme inline` bridge) → Tailwind generates utilities such as `bg-brand`, `rounded-card`, `shadow-pop`, `text-h2`.

### 3.4 Data flow
Static content → `site.ts` → section components via props. The only runtime state: theme (localStorage, try/catch), preload flag (sessionStorage), notification switches (React state), chart hover, form state.

### 3.5 Rendering of motion
- First paint: SSR content; if `html[data-preload]` is present the CSS shows the preloader overlay above it.
- After hydration: `LazyMotion` features load; load sequence plays; scroll reveals attach via `whileInView`; scrubbed text uses `useScroll`.
- Lenis and Motion share one animation frame loop; Lenis is disabled for reduced motion.

## 4. Repository map

```text
src/app/                 routes, metadata, OG image, robots, sitemap, API route
src/components/brand/    Logo (original pinwheel), BrandMark, AppMark (simple-icons/lucide)
src/components/ui/       button, badge, avatar, switch, navigation-menu, sheet, theme-toggle (Radix-based)
src/components/sections/ page sections (one file per section)
src/components/features/ DashboardCard, BarChart, NotificationsCard, TaskCard
src/components/motion/   MotionProvider, SmoothScroll, useLoadGate, Reveal, SplitWords, HeroHeadline, Marquee, MarqueeList, Counter, Highlight, FloatingAvatars, Parallax
src/components/forms/    LeadForm
src/content/site.ts      all copy and demo flags
src/lib/                 motion.ts, cn.ts, theme.ts, seo.ts, validators.ts
src/styles/              globals.css, tokens.css (generated)
scripts/                 build-tokens.mjs, check.mjs (read-only), stop-hook.mjs, shot.mjs, compare.py, diag*.mjs, lcp.mjs
reference/               design inputs (read-only) + frames/ + out/
docs/                    this documentation set
```
