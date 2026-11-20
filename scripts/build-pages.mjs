// Static export for GitHub Pages -> ./out (+ .nojekyll). The API route cannot be exported, so it is
// moved aside for the build and restored afterwards (also on failure).
import { cpSync, existsSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const repo = process.env.PAGES_REPO || 'Clause';
const owner = process.env.PAGES_OWNER || 'shivatmprakash9009-eng';
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? `/${repo}`;
const api = 'src/app/api';
const stash = '.api-stash';
let moved = false;
try {
  if (existsSync(api)) { renameSync(api, stash); moved = true; }
  rmSync('.next', { recursive: true, force: true });
  rmSync('out', { recursive: true, force: true });
  const r = spawnSync('pnpm', ['exec', 'next', 'build'], {
    stdio: 'inherit',
    env: { ...process.env, PAGES: '1', NEXT_PUBLIC_BASE_PATH: base, NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || `https://${owner}.github.io${base}` },
  });
  if (r.status !== 0) process.exitCode = r.status ?? 1;
  else writeFileSync('out/.nojekyll', '');
} finally {
  if (moved) renameSync(stash, api);
}
