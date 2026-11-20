import { ImageResponse } from 'next/og';
import tokens from '../../tokens.json';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export const alt = `${site.brand.name} — ${site.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** 1200×630 Open Graph card built from the design tokens (light-theme values). */
export default function OpenGraphImage() {
  const c = tokens.color;
  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', background: c['bg-hero'].$value, padding: 72, color: c.ink.$value }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: c.deep.$value, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 28, height: 28, borderRadius: 999, background: c.accent.$value }} />
          </div>
          <div style={{ fontSize: 48, fontWeight: 600 }}>{site.brand.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>{site.brand.tagline}</div>
          <div style={{ height: 14, width: 260, borderRadius: 4, background: c.accent.$value }} />
        </div>
      </div>
    ),
    size,
  );
}
