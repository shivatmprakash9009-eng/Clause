// Helper: node scripts/shot.mjs <width> <height> <out.png> [path] [fullPage=1]
import { chromium } from 'playwright';
const [w, h, out, path = '/', full = '1'] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const errs = [];
p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
p.on('pageerror', (e) => errs.push(String(e)));
await p.goto(`${process.env.BASE_URL || 'http://localhost:3000'}${path}?nopreload=1`, { waitUntil: 'load' });
await p.waitForTimeout(2600);
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 140)); } await new Promise((r) => setTimeout(r, 1500)); window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 600)); });
await p.screenshot({ path: out, fullPage: full === '1' });
console.log('saved', out, 'errors:', errs.length ? errs.join(' | ') : 'none');
await b.close();
