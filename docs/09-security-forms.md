# Clause — Security and forms

Part of the project documentation set (see [README](../README.md)). Build 1.0.0, 2026-11-20.

## 13. Security

| Control | Setting |
|---|---|
| HSTS | `max-age=63072000; includeSubDomains` (add `preload` only after owner confirmation) |
| MIME sniffing | `X-Content-Type-Options: nosniff` |
| Referrer | `strict-origin-when-cross-origin` |
| Permissions | camera, microphone, geolocation disabled |
| CSP baseline | `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'` (+ Turnstile origins when enabled) |
| Clickjacking | `frame-ancestors 'none'` |
| External links | `rel="noopener noreferrer"` |
| Secrets | Server-side only; `.env.example` lists names, not values |

Implemented in `next.config.ts`. Turnstile verification is implemented but **untested** (no keys available). `pnpm audit` on 2026-11-20: no known vulnerabilities.

A nonce-based CSP would remove `'unsafe-inline'` but forces dynamic rendering; it is out of scope (ADR-007). Dependency hygiene: run `pnpm audit` before each release and review high-severity findings. Do not commit `.env*` files.

## 14. Forms and lead handling

**Flow.** `LeadForm` → client validation (zod + react-hook-form) → `POST /api/lead` (JSON) → server validation → honeypot check (field `website`; if filled, return 200 and discard) → optional Turnstile verification → forward to `LEAD_WEBHOOK_URL` (if set) else log server-side → `{ ok: true }`.

**Fields and messages.** Name ("Enter your name"), work email ("Enter a valid work email"), company ("Company is required"), message (demo variant only). Error summary has `role="alert"` and takes focus; inline errors use `aria-describedby`/`aria-invalid`.

**Wiring a real destination.** (a) A webhook-capable CRM or automation tool: set `LEAD_WEBHOOK_URL`. (b) An email service: replace the forward step in `src/app/api/lead/route.ts` with the provider's SDK call; keep validation and honeypot. (c) Always add rate limiting at the edge (provider rules or middleware) before launch. Store no personal data in logs beyond what is necessary.

**Privacy.** The forms link to `/privacy`; replace the stub with counsel-approved text covering purposes, retention and processors.
