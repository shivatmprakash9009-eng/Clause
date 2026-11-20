import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { headScript } from '@/lib/theme';
import { jsonLd, siteUrl } from '@/lib/seo';
import { site } from '@/content/site';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Preloader } from '@/components/sections/Preloader';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

const aspekta = localFont({
  src: [
    { path: '../../public/fonts/Aspekta-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Aspekta-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Aspekta-550.woff2', weight: '550', style: 'normal' },
  ],
  variable: '--font-aspekta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seo.title, template: `%s — ${site.brand.name}` },
  description: site.seo.description,
  applicationName: site.brand.name,
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, colorScheme: 'light dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={aspekta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
        <noscript>
          <style>{`[style*="opacity:0;"],[style$="opacity:0"],[style*="opacity:0.18"]{opacity:1!important;transform:none!important}[style*="clip-path:inset(100%"]{clip-path:none!important}.preloader{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Preloader />
          <SmoothScroll>
            <Header />
            <main id="content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
