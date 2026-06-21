import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { CONTACT, NAV_LINKS } from '../data/site';
import { Button } from './ui/Button';

export function Navbar({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setIsOpen(false);

  // The transparent/light-text treatment only makes sense over the dark hero on
  // the home page. On other routes (no hero) the navbar is always solid so its
  // text stays readable on the light page background.
  const isHome = useLocation().pathname === '/';
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Over the photo hero (top) text is light; once scrolled onto the page (or on
  // any non-home route) it adapts to the active theme.
  const linkClass = solid
    ? 'text-steel-600 hover:text-steel-950 dark:text-steel-300 dark:hover:text-steel-50'
    : 'text-white/85 hover:text-white';
  const brandPrimaryClass = solid ? 'text-steel-950 dark:text-steel-50' : 'text-white';
  const togglerClass = solid ? 'text-steel-700 dark:text-steel-50' : 'text-white';

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-300',
        solid
          ? 'border-b border-steel-300 bg-white/90 shadow-e1 backdrop-blur-md dark:border-steel-800 dark:bg-steel-900/90'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex h-[72px] items-center justify-between gap-3">
          {/* Unified dual-company brand: "Shri Nirmal Logistics & DN Transport" */}
          <Link to="/" onClick={close} className="group flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-white shadow-e1">
              SN
            </span>
            <span className="flex min-w-0 flex-col leading-tight md:flex-row md:items-center md:gap-1.5">
              <span
                className={`truncate font-display text-sm font-semibold tracking-[-0.01em] sm:text-[15px] ${brandPrimaryClass}`}
              >
                Shri Nirmal Logistics
              </span>
              <span className="truncate font-display text-sm font-semibold tracking-[-0.01em] text-primary sm:text-[15px]">
                &amp; DN Transport
              </span>
            </span>
          </Link>

          {/* Desktop cluster */}
          <div className="hidden shrink-0 items-center gap-5 md:flex lg:gap-7">
            {NAV_LINKS.slice(0, -1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative text-[15px] font-medium transition-colors ${linkClass}`}
              >
                {link.label}
                {/* 2px primary underline slides in on hover/focus */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-primary transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                />
              </a>
            ))}
            {/* Phone only from lg up, to keep tablet widths roomy */}
            <a
              href={CONTACT.phoneHref}
              className={`hidden items-center gap-1.5 text-[15px] font-medium transition-colors lg:flex ${linkClass}`}
            >
              <Phone size={15} className="text-primary" aria-hidden="true" />{' '}
              <span className="tnum">{CONTACT.phoneDisplay}</span>
            </a>

            <ThemeToggle theme={theme} onToggle={onToggleTheme} scrolled={solid} />

            <a href="/#quote">
              <Button size="sm">Get Quote</Button>
            </a>
          </div>

          {/* Mobile cluster */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} scrolled={solid} />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className={`rounded-lg p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 ${togglerClass}`}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden motion-reduce:transition-none ${
          isOpen ? 'max-h-96 border-t border-steel-300 dark:border-steel-800' : 'max-h-0'
        }`}
      >
        <div className="space-y-1 bg-white/95 px-3 pb-4 pt-2 backdrop-blur-md dark:bg-steel-900/95">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="block rounded-md px-3 py-2 text-base font-medium text-steel-700 transition hover:bg-steel-200 hover:text-steel-950 dark:text-steel-200 dark:hover:bg-steel-800 dark:hover:text-steel-50"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

/** Light/dark toggle. Adapts to whether it sits over the hero or the page. */
function ThemeToggle({ theme, onToggle, scrolled }) {
  const isDark = theme === 'dark';
  const surface = scrolled
    ? 'border-steel-400 bg-steel-100 text-steel-700 hover:bg-steel-200 dark:border-steel-700 dark:bg-steel-850 dark:text-steel-50 dark:hover:bg-steel-800'
    : 'border-white/30 bg-white/10 text-white hover:bg-white/20';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 ${surface}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
