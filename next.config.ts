import type { NextConfig } from 'next';

const turnstile = process.env.TURNSTILE_SITE_KEY ? ' https://challenges.cloudflare.com' : '';
const csp = [
  "default-src 'self'",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}${turnstile}`,
  `connect-src 'self'${turnstile}`,
  `frame-src 'self'${turnstile}`,
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

// GitHub Pages build: `pnpm build:pages` sets PAGES=1 (static export, served under /<repo>).
const pages = process.env.PAGES === '1';
const basePath = pages ? process.env.NEXT_PUBLIC_BASE_PATH || '' : '';

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  ...(pages ? { output: 'export' as const, trailingSlash: true, images: { unoptimized: true }, basePath, assetPrefix: basePath || undefined } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Static hosts cannot send custom headers; they apply to server deployments only.
  ...(pages ? {} : { async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  } }),
};
export default config;
