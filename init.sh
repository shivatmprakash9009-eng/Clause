#!/usr/bin/env bash
# Bootstrap a fresh checkout: install, compile tokens, build.
set -euo pipefail
pnpm install --frozen-lockfile
cp -n .env.example .env.local || true
pnpm tokens
pnpm build
echo "Ready. Run: pnpm start   then   BASE_URL=http://localhost:3000 node scripts/check.mjs"
