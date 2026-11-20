// BASE_URL=http://localhost:3000 node scripts/check.mjs
// Needs: pnpm add -D playwright @axe-core/playwright && pnpm exec playwright install chromium
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const ROUTES = JSON.parse(fs.readFileSync('routes.json', 'utf8'));
const VIEWPORTS = [[375, 812], [768, 1024], [1280, 800], [1440, 900]];
const BAD_TEXT = /lorem|ipsum|todo|fixme|feature 1/i;
const failures = [];
const fail = (route, vp, msg) => failures.push(`${route} @${vp}: ${msg}`);

// ---------- static drift checks ----------
const walk = (dir, out = []) => {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { if (!['node_modules', '.next', 'reference'].includes(f.name)) walk(p, out); } else out.push(p);
  }
  return out;
};
for (const f of walk('src').filter((f) => /\.(tsx?|css)$/.test(f))) {
  const t = fs.readFileSync(f, 'utf8');
  const isToken = /tokens\.css$/.test(f);
  if (!isToken && /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![\w-])|oklch\(/.test(t.replace(/\/\/.*$/gm, ''))) {
    // allow the head-script and site.ts? No: tokens only. Exceptions must be logged in DECISIONS.md and whitelisted here by the human.
    failures.push(`${f}: raw colour outside tokens`);
  }
  if (/href="#"/.test(t)) failures.push(`${f}: href="#"`);
  if (/\b(TODO|FIXME)\b/.test(t)) failures.push(`${f}: TODO/FIXME`);
  if (/text-\[\d+(px|rem)\]/.test(t)) failures.push(`${f}: arbitrary font size; add a token`);
}
const readme = fs.existsSync('README.md') ? fs.readFileSync('README.md', 'utf8') : '';
if (!/Replace before launch/i.test(readme)) failures.push('README.md: missing "Replace before launch"');
for (const d of ['docs']) if (!fs.existsSync(d)) failures.push('docs/ missing');

// ---------- browser checks ----------
const browser = await chromium.launch();
for (const route of ROUTES) {
  for (const [w, h] of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    const res = await page.goto(`${BASE}${route}?nopreload=1`, { waitUntil: 'load' });
    if (!res || res.status() >= 400) fail(route, w, `HTTP ${res && res.status()}`);
    await page.waitForSelector('main');
    await page.waitForTimeout(2600);
    if (route === '/') {
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
        window.scrollTo(0, 0);
      });
    }
    if (errors.length) fail(route, w, `console errors: ${errors.join(' | ')}`);

    const r = await page.evaluate((BAD) => {
      const q = (s) => [...document.querySelectorAll(s)];
      const bad = new RegExp(BAD.source, BAD.flags);
      const small = q('a,button,input,select,textarea,[role=button],[role=switch]').filter((el) => {
        const b = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        return b.width > 0 && (b.width < 24 || b.height < 24) && cs.display !== 'inline' && cs.visibility !== 'hidden';
      }).map((el) => el.outerHTML.slice(0, 80));
      return {
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        h1: q('h1').length, title: document.title,
        desc: document.querySelector('meta[name=description]')?.content || '',
        canonical: !!document.querySelector('link[rel=canonical]'),
        og: !!document.querySelector('meta[property="og:title"]'),
        lang: !!document.documentElement.lang,
        hashLinks: q('a[href="#"]').length,
        brokenImgs: q('img').filter((i) => i.complete && i.naturalWidth === 0).length,
        noAlt: q('img').filter((i) => !i.hasAttribute('alt')).length,
        placeholderText: bad.test(document.body.innerText),
        skipLink: !!document.querySelector('a[href="#content"]'),
        year: /©\s*(\d{4})/.exec(document.body.innerText)?.[1] ?? null,
        small,
      };
    }, { source: BAD_TEXT.source, flags: BAD_TEXT.flags });

    if (r.overflow) fail(route, w, 'horizontal overflow');
    if (r.h1 !== 1) fail(route, w, `h1 count ${r.h1}`);
    if (!r.title) fail(route, w, 'missing title');
    if (!r.desc) fail(route, w, 'missing meta description');
    if (!r.canonical) fail(route, w, 'missing canonical');
    if (!r.og) fail(route, w, 'missing og:title');
    if (!r.lang) fail(route, w, 'missing html lang');
    if (r.hashLinks) fail(route, w, `${r.hashLinks} href="#" links`);
    if (r.brokenImgs) fail(route, w, `${r.brokenImgs} broken images`);
    if (r.noAlt) fail(route, w, `${r.noAlt} images without alt`);
    if (r.placeholderText) fail(route, w, 'placeholder text on page');
    if (!r.skipLink) fail(route, w, 'missing skip link');
    if (r.year && Number(r.year) !== new Date().getFullYear()) fail(route, w, `footer year ${r.year} is not current`);
    if (r.small.length) fail(route, w, `targets under 24px: ${r.small.length} e.g. ${r.small[0]}`);

    if (w === 1280) {
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      for (const v of axe.violations) fail(route, w, `axe ${v.id}: ${v.nodes.length} nodes`);
      if (route === '/') {
        const trigger = page.getByRole('button', { name: /solutions/i }).first();
        if (await trigger.count()) {
          await trigger.click();
          const a2 = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
          for (const v of a2.violations) fail(route, w, `axe(menu open) ${v.id}: ${v.nodes.length} nodes`);
          await page.keyboard.press('Escape');
        } else fail(route, w, 'Solutions menu trigger not found');
        await page.evaluate(() => (document.activeElement instanceof HTMLElement) && document.activeElement.blur());
        await page.keyboard.press('Tab');
        const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
        if (!/skip/i.test(first || '')) fail(route, w, `first Tab stop is "${first}", expected skip link`);
        for (let i = 0; i < 40; i++) {
          await page.keyboard.press('Tab');
          const ok = await page.evaluate(() => { const el = document.activeElement; if (!el || el === document.body) return true; const cs = getComputedStyle(el); return cs.outlineStyle !== 'none' || cs.boxShadow !== 'none'; });
          if (!ok) { fail(route, w, `no visible focus on tab stop ${i + 1}`); break; }
        }
        // theme toggle works and persists
        const toggle = page.getByRole('button', { name: /theme/i }).first();
        if (await toggle.count()) { await toggle.click(); const t = await page.evaluate(() => document.documentElement.getAttribute('data-theme')); if (!t) fail(route, w, 'theme toggle did not set data-theme'); }
        else fail(route, w, 'theme toggle not found');
      }
      await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
      await page.evaluate(() => localStorage.removeItem('clause:theme'));
      await page.reload({ waitUntil: 'load' });
      const darkAxe = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
      for (const v of darkAxe.violations) fail(route, w, `dark+reduced axe ${v.id}: ${v.nodes.length} nodes`);
      if (route === '/') {
        const animating = await page.evaluate(() => [...document.querySelectorAll('[data-marquee]')].some((el) => { const cs = getComputedStyle(el); return cs.animationName !== 'none' && cs.animationPlayState === 'running'; }));
        if (animating) fail(route, w, 'marquee still animating under prefers-reduced-motion');
        const rows = await page.evaluate(() => [...document.querySelectorAll('[data-marquee]')].length);
        if (rows !== 2) fail(route, w, `expected 2 marquee rows, found ${rows}`);
      }
    }
    await ctx.close();
  }
}
for (const f of ['/robots.txt', '/sitemap.xml']) { const res = await fetch(BASE + f); if (!res.ok) failures.push(`${f}: HTTP ${res.status}`); }

// form behaviour on /start
{
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  await page.goto(`${BASE}/start?nopreload=1`);
  await page.getByRole('button', { name: /create workspace/i }).click();
  if (!(await page.getByRole('alert').first().isVisible().catch(() => false))) failures.push('/start: empty submit shows no error summary');
  await ctx.close();
}
await browser.close();

if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log('All gates passed');
