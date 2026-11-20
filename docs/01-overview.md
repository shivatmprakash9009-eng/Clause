# Clause — Overview

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 1. Overview

**Product.** Clause is a contract-management platform for legal and operations teams. This repository contains its marketing website: a single, long-scroll home page with a preloader, a hero, a feature bento, an integrations marquee, a testimonial, key figures, a closing call to action and a footer, plus sign-up and demo stubs and legal templates.

**Goals.**
| Goal | Measure |
|---|---|
| Lead the visitor to *Start for Free* | Primary CTA visible above the fold at 375, 768 and 1440 |
| Convey a calm, credible, premium identity | Visual diff to the reference within tolerance; reviewer ≥ 4/5 |
| Feel alive without hurting usability | Motion obeys reduced-motion; no layout shift; LCP ≤ 2.5s (lab) |
| Be accessible | WCAG 2.2 AA; axe clean in light, dark and with overlays open |

**Non-goals.** CMS, authentication, analytics, blog, pricing page, internationalisation, a real back end. Each can be added later (see Next steps, §23).

**Technology at a glance.** Next.js 16.4.6 (App Router, Turbopack), React 19.3.1, TypeScript 5.9.3 (strict), Tailwind CSS 4.3.5, Motion 14.14.0, Lenis 1.3.27, radix-ui 1.8.1, lucide-react 1.76.0, simple-icons 16.38.0, react-hook-form 7.92.0 + zod 4.6.7, Aspekta typeface (400/500/550), Playwright 1.63.0 + @axe-core/playwright 4.14.0 for the gate, Vitest 5.1.1. Node 22 (`.nvmrc`), pnpm 10.28.

**Demo content notice.** Statistics (2021 / 50K+ / 1k+), the testimonial and its attribution, partner marks and contact details are **placeholders**. They are flagged `demo: true` in `src/content/site.ts` and listed in the README under *Replace before launch*.
