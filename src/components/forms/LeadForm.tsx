'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { leadSchema, type LeadData, type LeadInput } from '@/lib/validators';
import { cn } from '@/lib/cn';
import { site } from '@/content/site';

type LeadFormProps = { variant: 'start' | 'demo'; turnstileSiteKey?: string };
type Status = 'idle' | 'sending' | 'success' | 'failure';

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: { sitekey: string; callback: (t: string) => void }) => void };
  }
}

const fieldCls =
  'h-11 w-full rounded-button border border-line bg-bg px-3.5 text-body text-ink placeholder:text-muted aria-[invalid=true]:border-danger';

export function LeadForm({ variant, turnstileSiteKey }: LeadFormProps) {
  const f = site.forms;
  const [status, setStatus] = useState<Status>('idle');
  const [token, setToken] = useState<string | undefined>();
  const summary = useRef<HTMLDivElement>(null);
  const widget = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm<LeadInput, unknown, LeadData>({ resolver: zodResolver(leadSchema), defaultValues: { name: '', email: '', company: '', message: '', website: '' } });

  const messages = Object.entries(errors).map(([key, e]) => ({ key, text: String(e?.message ?? '') }));
  const showSummary = submitCount > 0 && messages.length > 0;
  useEffect(() => {
    if (showSummary) summary.current?.focus();
  }, [showSummary, submitCount]);

  useEffect(() => {
    if (!turnstileSiteKey || !widget.current) return;
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => window.turnstile?.render(widget.current as HTMLElement, { sitekey: turnstileSiteKey, callback: setToken });
    document.head.appendChild(s);
    return () => s.remove();
  }, [turnstileSiteKey]);

  const onValid = async (data: LeadData) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, variant, turnstileToken: token }),
      });
      setStatus(res.ok ? 'success' : 'failure');
    } catch {
      setStatus('failure');
    }
  };

  if (status === 'success')
    return (
      <div role="status" className="flex items-start gap-3 rounded-card border border-line bg-mist p-6 text-ink">
        <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" strokeWidth={1.5} />
        <p className="text-body">{f.success}</p>
      </div>
    );

  const field = (name: 'name' | 'email' | 'company', label: string, type = 'text', auto?: string) => (
    <div className="grid gap-1.5">
      <label htmlFor={`f-${name}`} className="text-small font-[550] text-ink">
        {label}
      </label>
      <input
        id={`f-${name}`}
        type={type}
        autoComplete={auto}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `f-${name}-err` : undefined}
        className={fieldCls}
        {...register(name)}
      />
      {errors[name] ? (
        <p id={`f-${name}-err`} className="text-small text-danger">
          {String(errors[name]?.message)}
        </p>
      ) : null}
    </div>
  );

  return (
    <form noValidate onSubmit={handleSubmit(onValid, () => undefined)} className="grid gap-5">
      {showSummary ? (
        <div ref={summary} tabIndex={-1} role="alert" className="rounded-card border border-danger bg-bg p-4 text-small text-ink">
          <p className="font-[550]">Please fix the following:</p>
          <ul className="mt-1 list-disc pl-5">
            {messages.map((m) => (
              <li key={m.key}>
                <a href={`#f-${m.key}`} className="underline underline-offset-2">
                  {m.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {status === 'failure' ? (
        <p role="alert" className="rounded-card border border-danger p-4 text-small text-ink">
          {f.failure}
        </p>
      ) : null}
      {field('name', f.labels.name, 'text', 'name')}
      {field('email', f.labels.email, 'email', 'email')}
      {field('company', f.labels.company, 'text', 'organization')}
      {variant === 'demo' ? (
        <div className="grid gap-1.5">
          <label htmlFor="f-message" className="text-small font-[550] text-ink">
            {f.labels.message}
          </label>
          <textarea id="f-message" rows={4} className={cn(fieldCls, 'h-auto py-2.5')} {...register('message')} />
        </div>
      ) : null}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>
      {turnstileSiteKey ? <div ref={widget} /> : null}
      <Button type="submit" variant="brand" size="lg" loading={status === 'sending'} className="w-full sm:w-fit">
        {status === 'sending' ? f.sending : f.submit[variant]}
      </Button>
      <p className="text-small text-muted">
        {f.privacy}{' '}
        <Link href="/privacy" className="text-ink underline underline-offset-2">
          Privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
