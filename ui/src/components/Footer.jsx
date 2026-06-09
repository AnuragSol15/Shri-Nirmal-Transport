import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { COMPANY, CONTACT, NAV_LINKS } from '../data/site';

const OFFICES = [
  {
    label: 'Indore HQ',
    address:
      'SR Compound, 111/6, opposite Mongia Rathi Transport, Dewas Naka, SR Compound, Indore, Madhya Pradesh 452010',
    url: 'https://maps.app.goo.gl/cgBW5Dgk5eTzQw919',
  },
  {
    label: 'Branch Network Office',
    address: '192, Loha Mandi, Indore, Madhya Pradesh 452001',
    url: 'https://maps.app.goo.gl/g85NrRr2tFw9Bcme9',
  },
];

export function Footer() {
  const year = 2025;
  return (
    <footer className="border-t border-sky-100 bg-slate-100 py-16 dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-extrabold text-white">SN</span>
              <span className="text-lg font-bold text-zinc-900 dark:text-white">
                {COMPANY.name} {COMPANY.altName}
              </span>
            </div>
            <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">
              Enterprise-grade FTL &amp; LTL road freight from the Indore hub across India — daily,
              insured, and fully tracked.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Navigate</h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-zinc-600 transition hover:text-primary dark:text-zinc-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-2 transition hover:text-primary">
                  <Phone size={15} className="text-primary" aria-hidden="true" /> {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-2 transition hover:text-primary">
                  <Mail size={15} className="mt-0.5 text-primary" aria-hidden="true" /> {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dual office directory — both hubs, each a hyperlinked map anchor */}
        <div className="mt-12">
          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Our Offices</h4>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {OFFICES.map((office) => (
              <a
                key={office.label}
                href={office.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-sky-100 bg-white/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
              >
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-white">
                    {office.label}
                    <ExternalLink
                      size={13}
                      className="text-zinc-400 transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {office.address}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-white/10">
          &copy; {year} {COMPANY.legalName}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
