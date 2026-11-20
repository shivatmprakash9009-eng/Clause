// Helper (not the gate): node scripts/diag.mjs  → prints axe contrast nodes @1280 and overflow culprits @375
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const BASE = process.env.BASE_URL || 'http://localhost:3000';
const b = await chromium.launch();
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/?nopreload=1`);
  await p.waitForTimeout(2600);
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
  const r = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  for (const v of r.violations) for (const n of v.nodes.slice(0, 30)) console.log(v.id, '|', n.target.join(' '), '|', (n.any[0]?.message || '').slice(0, 140));
  console.log('incomplete:', r.incomplete.map((i) => `${i.id}(${i.nodes.length})`).join(', '));
}
{
  const ctx = await b.newContext({ viewport: { width: 375, height: 812 } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/?nopreload=1`);
  await p.waitForTimeout(2600);
  const o = await p.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return r.right > window.innerWidth + 1 && r.width > 0; }).slice(0, 12).map((e) => e.tagName + '.' + String(e.className).slice(0, 60) + ' right=' + Math.round(e.getBoundingClientRect().right)));
  console.log('overflow:', o);
}
await b.close();
