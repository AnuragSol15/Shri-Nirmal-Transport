import { Link } from 'react-router-dom';
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
  const year = 2026;
  return (
    <footer className="border-t border-steel-300 bg-steel-100 dark:border-steel-800 dark:bg-steel-1000">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-white shadow-e1">
                SN
              </span>
              <span className="font-display text-lg font-semibold text-steel-950 dark:text-steel-50">
                {COMPANY.name} {COMPANY.altName}
              </span>
            </div>
            <p className="mt-4 max-w-md leading-relaxed text-steel-600 dark:text-steel-400">
              Enterprise-grade FTL &amp; LTL road transport from the Indore hub across Madhya Pradesh -
              daily, insured, and on schedule.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-steel-500">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-steel-600 transition-colors hover:text-primary dark:text-steel-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-steel-500">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-steel-600 dark:text-steel-400">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Phone size={15} className="text-primary" aria-hidden="true" />
                  <span className="tnum">{CONTACT.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-2 break-all transition-colors hover:text-primary"
                >
                  <Mail size={15} className="mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dual office directory - both hubs, each a hyperlinked map anchor */}
        <div className="mt-12">
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-steel-500">
            Our Offices
          </h4>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {OFFICES.map((office) => (
              <a
                key={office.label}
                href={office.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-steel-300 bg-white p-4 shadow-e1 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-e2 motion-reduce:transition-none dark:border-steel-800 dark:bg-steel-900"
              >
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-semibold text-steel-950 dark:text-steel-50">
                    {office.label}
                    <ExternalLink
                      size={13}
                      className="text-steel-500 transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-steel-600 dark:text-steel-400">
                    {office.address}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-steel-300 pt-6 text-center text-sm text-steel-500 dark:border-steel-800 sm:flex-row">
          <p>&copy; {year} {COMPANY.legalName}. All Rights Reserved.</p>
          <Link to="/privacy" className="transition-colors hover:text-primary">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
