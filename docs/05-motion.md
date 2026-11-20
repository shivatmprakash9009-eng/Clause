# Clause — Motion system

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 7. Motion system

### 7.1 Doctrine
One orchestrated load sequence; scroll reveals; micro-interactions on interactive elements; the only perpetual motion is the marquee, hero avatar drift and (optional) hero-grid shimmer. Animate `transform`, `opacity`, `clip-path`/`scaleX`; never layout properties. **`filter: blur` is not used on the hero headline** (measured: it raised simulated LCP from 0.9s to ≈4.0s; ADR-014). Blur remains only on the small preloader letters and non-LCP `Reveal` variants.

### 7.2 Tokens
Durations: feedback 140ms, state 260ms, enter 720ms, hero 1100ms. Easings: out-expo `cubic-bezier(0.16,1,0.3,1)`, in-out `cubic-bezier(0.65,0,0.35,1)`. Spring: stiffness 220, damping 26, mass 0.9. Stagger: word 40ms, hero word 70ms, card 90ms, button 80ms. Defined once in `src/lib/motion.ts`.

### 7.3 Preloader timeline (≤1.75s)
| ms | Event |
|---|---|
| 0–450 | Brand tile fades and scales .6→1 |
| 450–1000 | Wordmark letters rise in (stagger 40ms, blur 6→0) |
| 1000–1250 | Hold |
| 1250–1750 | Overlay wipes upward (clip-path) and fades |

### 7.4 Hero load sequence
Implemented in CSS (`.rise`, `.hero-word`, custom properties `--d` per element and `--load-base`, which is 1.75s while `html[data-preload]` is set) so first paint and LCP do not wait for JS. Order:

Header → badge (+100) → headline words (+200, 70ms apart, grey→ink) → subcopy (+700) → highlighter and buttons (+900) → avatars and cursors (+1100) → partners (+1400) → idle drift (+1500).

### 7.5 Scroll choreography
Features header (fade-up), cards (A, B, C staggered; bars grow; switches slide; messages type in); integrations panel rises with a slight scale, rows enter in sequence, grid background drifts −40px; testimonial words scrub from 18% to full opacity; stats count up at 60% visibility; CTA slab rises by clip-path; footer columns fade up.

### 7.6 Reduced motion contract
No preloader, no parallax, no scrub, no drift; marquee static and horizontally scrollable; reveals are **instant** (`initial={false}`; D-10) rather than 200ms fades, because axe sampled mid-fade colours; counters final; highlight drawn. A CSS block in `globals.css` and the layout `<noscript>`/`<style>` force SSR hidden states visible. Verified by the gate (marquee) and by manual pass.

### 7.7 Performance rules for motion
`LazyMotion` + `m` components; `will-change` only while animating; off-screen loops paused; Lenis and Motion share a single frame loop; no animation on the LCP element's paint beyond opacity/transform/colour (h1 words use CSS keyframes, no blur); LCP measured at 0.8–0.9s (§11).

### 7.8 Authoring a new animation
1. Express it in the table format of §7.4. 2. Add constants to `motion.ts`. 3. Provide the reduced-motion fallback. 4. Add a `feature.json` entry. 5. Verify with Playwright video and Lighthouse.
