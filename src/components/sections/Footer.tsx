import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { BrandMark } from '@/components/brand/BrandMark';
import { AppMark } from '@/components/brand/AppMark';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { site } from '@/content/site';

const linkCls = 'link-grow inline-flex min-h-9 items-center text-small text-on-dark-muted transition-colors hover:text-on-dark';
const socials = ['x', 'linkedin', 'instagram', 'youtube'] as const;

export function Footer() {
  const { footer, brand } = site;
  const year = new Date().getFullYear();
  return (
    <footer className="bg-footer px-4 pb-8 pt-16 text-on-dark md:px-6 md:pt-26 xl:px-10">
      <div className="mx-auto max-w-[var(--w-content)]">
        <Reveal stagger={0.08} className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <RevealItem className="grid content-start gap-4">
            <BrandMark tone="onDark" className="-ml-0.5 w-fit" />
            <a href={`mailto:${brand.email}`} className={`${linkCls} gap-2`}>
              <Mail aria-hidden="true" className="size-4" strokeWidth={1.5} />
              {brand.email}
            </a>
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className={`${linkCls} gap-2`}>
              <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
              {brand.phone}
            </a>
          </RevealItem>
          {footer.columns.map((col) => (
            <RevealItem key={col.title} as="div">
              <nav aria-label={col.title}>
                <h2 className="mb-4 text-small font-[550] text-on-dark">{col.title}</h2>
                <ul className="grid gap-1">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className={linkCls}>
                        {l.label}
                        {'isNew' in l && l.isNew ? <span role="img" aria-label="new" className="ml-1.5 size-1.5 rounded-full bg-accent" /> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </RevealItem>
          ))}
        </Reveal>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 md:mt-[72px] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <p className="text-small text-on-dark-muted">
              © {year} {brand.name}. All rights reserved.
            </p>
            <ul className="flex gap-4">
              {footer.legal.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-1">
            <ul className="flex items-center">
              {footer.social.map((s, i) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-button text-on-dark-muted transition-colors hover:bg-white/10 hover:text-on-dark"
                  >
                    <span className="block size-5">
                      <AppMark slug={socials[i] ?? 'x'} mono />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
