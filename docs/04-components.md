# Clause — Component reference

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 6. Component reference

Every interactive component implements: default, hover, focus-visible, active, disabled, loading (where applicable), error and success (forms). Targets ≥ 24px; primary ≥ 44px.

| Component | Props | Behaviour and notes |
|---|---|---|
| `Button` | `variant: brand\|white\|lime\|ghost\|link`, `size: sm\|md\|lg`, `loading?`, `asChild?` | Sheen once per hover; press scale .98; loading keeps width. `cn()` is an extended `tailwind-merge` that knows the token utilities (D-12) |
| `Badge` | `tone: light\|onDark`, `icon?` | Static; eyebrow style; only three on the page |
| `Header` | — | Transparent → blurred; hides on scroll-down; never hides during menu/focus |
| `NavigationMenu` | menus from `site.nav` | Radix; hover/click/Enter/Space; Esc; arrow keys |
| `Sheet` | — | Mobile menu; focus trap; scroll lock; Esc |
| `Preloader` | — | First visit per session; ≤1.75s (overlay `display:none` at 1800ms); skipped for reduced motion, `?nopreload`, webdriver; clears `html[data-preload]` on client navigation |
| `Highlight` | `variant: thick\|thin`, `trigger: load\|view`, `delay?` | Lime bar draws with `scaleX`; static under reduced motion |
| `SplitWords` | `text`, `mode: scrub\|stagger`, `as` | One visually hidden full-contrast copy; animated words are `aria-hidden` (scrub words are painted by CSS `::after` from `data-word`, ADR-013) |
| `FloatingAvatars` | — | Four 88px avatars with cursor glyphs; idle drift; pointer attraction (fine pointers); paused off-screen |
| `BarChart` | `values`, `peakIndex`, `yLabels`, `unitLabel` | Buttons per bar; tooltip chip; text alternative |
| `NotificationsCard` | rows from content | Real switches; `Reminders` disabled; Save → "Saved" for 1.5s |
| `TaskCard` | messages from content | Staged entrance; mention styled; clipped fade |
| `Marquee` / `MarqueeList` | `primary`, `duplicate`, `reverse?`, `durationS`, `offset` | Client shell owns pause state; the list is server-rendered (×2 repeat); CSS animation; duplicates `aria-hidden`; pause on hover/focus/off-screen/button (`IntegrationsRows`) |
| `Counter` | `to`, `from?`, `prefix?`, `suffix?`, `durationS?` | SSR shows final value; width reserved; visually hidden copy announces the final value |
| `LeadForm` | `variant: start\|demo` | Validation, error summary with focus, success/failure, honeypot, loading |
| `ThemeToggle` | — | Light/dark via `useSyncExternalStore`; persists; accessible name "Dark theme" + `aria-pressed` |
| `Avatar` | `size: 28\|44\|88`, gradient token | Initials disc (88 added for the hero, D-17) |
| `HeroHeadline` | — | Server component; CSS `.hero-word` animation so LCP never waits for hydration |
