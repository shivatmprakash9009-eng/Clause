import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const counter = '.gate-loops';
const n = existsSync(counter) ? Number(readFileSync(counter, 'utf8')) : 0;
if (existsSync('DONE')) process.exit(0);
try {
  execSync('node scripts/check.mjs', { stdio: 'inherit', env: { ...process.env, BASE_URL: process.env.BASE_URL || 'http://localhost:3000' } });
  writeFileSync('DONE', new Date().toISOString());
} catch {
  if (n >= 5) { console.error('Gate still failing after 5 loops; stop and report.'); process.exit(0); }
  writeFileSync(counter, String(n + 1));
  console.log(JSON.stringify({ followup_message: 'Gate failed. Fix the failures listed above and rerun scripts/check.mjs.' }));
}
