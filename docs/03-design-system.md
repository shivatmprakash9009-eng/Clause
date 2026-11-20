# Clause — Design system and theming

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 5. Design system

### 5.1 Brand
Direction: *calm legal-tech — deep forest green with one electric lime accent.* The memorable device: the lime highlighter that draws itself beneath a key word, and collaborative-cursor avatars drifting around the hero headline.

Voice: precise, friendly, efficient. Never-say list: revolutionary, game-changing, unlock, empower, supercharge, seamless, world-class.

### 5.2 Colour
Authoritative values come from the brand guide ([M]); other roles are estimated from the screenshot ([E]) or assumed ([A]).

| Token | Light | Dark | Role |
|---|---|---|---|
| `brand` | #004838 | #E2FB6C | primary action |
| `brand-foreground` | #FFFFFF | #0B2A22 | text on brand |
| `accent` | #E2FB6C | #E2FB6C | highlighter, secondary CTA |
| `accent-foreground` | #0B2A22 | #0B2A22 | text on lime |
| `deep` | #073127 | #073127 | pressed brand, logo tile |
| `charcoal` | #333F3C | #333F3C | dark panel base |
| `mist` | #EBEDE8 | oklch(0.27 0.018 175) | card surface |
| `bg` | #FFFFFF | oklch(0.19 0.015 175) | page |
| `bg-hero` | #F4F4F1 | oklch(0.21 0.016 175) | hero |
| `panel-dark` | #2D3D38 | oklch(0.25 0.020 174) | integrations, CTA |
| `footer` | #0F1E1A | oklch(0.16 0.014 175) | footer |
| `ink` | #0B2A22 | oklch(0.95 0.008 125) | headings |
| `muted` | #5C6B66 | oklch(0.74 0.015 173) | body text |
| `on-dark-muted` | #B9C4BF | #B9C4BF | text on dark panels |
| `line` | #DADDD6 | oklch(1 0 0 / .10) | hairlines |

**Contrast register** (computed 2026-11-20; WCAG ratio; dark-theme pairs are verified by axe in the gate with `colorScheme: dark`, no failures): lime on brand 9.2; white on brand 10.6; ink on lime 13.3; muted on white 5.6; muted on mist 4.75; white on panel-dark 11.4; on-dark-muted on panel-dark 6.4; on-dark-muted on footer 9.6.

### 5.3 Typography
Single family: **Aspekta** (400, 500, 550; the 600 cut was removed as unused). Scale after the visual-diff retune (D-05): display `clamp(2.5rem, 1.2rem + 5.2vw, 4.75rem)` (76px at 1440), h2 `clamp(1.875rem, 1.2rem + 2.6vw, 2.75rem)`, h3 36, quote `clamp(1.5rem, 1rem + 2vw, 2.5rem)`, stat `clamp(2.5rem, 1.6rem + 3.4vw, 4rem)`, cta `clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem)`, mark 22, body-lg 18, body 16, small 16, eyebrow 11. The Charter's original estimates were ≈1.3× too small for type and controls; the table lives in `tokens.json`. Headings balance; paragraphs use `pretty`; measure ≤ 62ch; tabular figures for stats and chart labels.

### 5.4 Spacing, layout, shape
Base unit 4px; scale 4…160. Containers: narrow 720, content 1180, wide 1360. Gutters 16/24/40. Breakpoints 480/768/1024/1280/1536. Section rhythm is deliberately uneven (hero 140/96, features 140/120, testimonial 160/96, stats 48, CTA 64, footer 72/32; mobile = 60%).
Radius by role: chip 8, button 10, card 20, panel 24, tile 16, inner 14, message 12, bar 4, avatar full. Control heights: sm 40, md 48, lg 56; header 84.
Elevation: `card`, `pop`, `brand` — three shadows only.

### 5.5 Iconography and imagery
Lucide, stroke 1.5, for UI; brand marks from simple-icons (or neutral fallbacks, logged). No photography. Avatars are generated initials-on-gradient discs (`avatar-{a..d}-{from,to}` tokens). The sandbox blocked Unsplash and Pixabay, and the Charter forbids photography, so no raster image exists in the project (D-20); the reference's photo avatars are the one visible residual. The logo mark is an original four-petal pinwheel.

### 5.6 The token workflow
1. Edit `tokens.json`. 2. `pnpm tokens`. 3. Use the generated utility or `var(--c-…)`. 4. Never write raw hex/oklch/px in components (the gate fails the build). 5. Document any new token here.

## 9. Theming

Resolution order: stored choice (`localStorage['clause:theme']`) → OS preference → light. The head script sets `data-theme` before paint (no flash). Dark is designed, not inverted: near-black green greys; elevation by lightness; `brand` becomes lime with dark text; hairlines are translucent white. `color-scheme` is set so form controls and scrollbars follow. Charts: inactive bars use `chart-bar`. To add a theme: add a token group, extend the compiler, and verify contrast for every pair in §5.2.
