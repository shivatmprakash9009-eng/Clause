import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validators';

const generic = { ok: false, error: 'Something went wrong. Please try again.' };

async function turnstileOk(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true; // feature flag: verification only when configured
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/**
 * Lead intake. JSON only; zod-validated; honeypot silently accepted and dropped; optional
 * Turnstile; forwards to LEAD_WEBHOOK_URL when set, else logs metadata only (no personal data).
 * Add edge rate limiting before launch (see docs/09-security-forms.md).
 */
export async function POST(req: Request) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json(generic, { status: 415 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(generic, { status: 400 });
  }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: 'Invalid submission.' }, { status: 400 });
  const { website, turnstileToken, ...lead } = parsed.data;
  if (website) return NextResponse.json({ ok: true }); // bot: pretend success, forward nothing
  if (!(await turnstileOk(turnstileToken))) return NextResponse.json(generic, { status: 400 });

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) return NextResponse.json(generic, { status: 502 });
    } catch {
      return NextResponse.json(generic, { status: 502 });
    }
  } else {
    console.info('[lead] received; LEAD_WEBHOOK_URL not set, nothing forwarded');
  }
  return NextResponse.json({ ok: true });
}
