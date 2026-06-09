import { useEffect, useState } from 'react';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { CONTACT, NAV_LINKS } from '../data/site';
import { Button } from './ui/Button';

export function Navbar({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Over the photo hero (top) text is light; once scrolled onto the page it
  // adapts to the active theme.
  const linkClass = scrolled
    ? 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
    : 'text-white/80 hover:text-white';
  const brandClass = scrolled ? 'text-zinc-900 dark:text-white' : 'text-white';

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/80'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Unified dual-company brand: "Shri Nirmal Logistics & DN Transport" */}
          <a href="#home" onClick={close} className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary font-extrabold text-white shadow-glow-sm">
              SN
            </span>
            <span className="flex min-w-0 flex-col leading-tight md:flex-row md:items-center md:gap-1.5">
              <span className={`truncate text-sm font-bold tracking-tight sm:text-[15px] ${brandClass}`}>
                Shri Nirmal Logistics
              </span>
              <span className="truncate text-sm font-bold tracking-tight text-primary sm:text-[15px]">
                &amp; DN Transport
              </span>
            </span>
          </a>

          {/* Desktop cluster */}
          <div className="hidden shrink-0 items-center gap-5 md:flex lg:gap-7">
            {NAV_LINKS.slice(0, -1).map((link) => (
              <a key={link.href} href={link.href} className={`text-sm font-medium transition ${linkClass}`}>
                {link.label}
              </a>
            ))}
            {/* Phone only from lg up, to keep tablet widths roomy */}
            <a
              href={CONTACT.phoneHref}
              className={`hidden items-center gap-1.5 text-sm font-medium transition lg:flex ${linkClass}`}
            >
              <Phone size={15} className="text-primary" aria-hidden="true" /> {CONTACT.phoneDisplay}
            </a>

            <ThemeToggle theme={theme} onToggle={onToggleTheme} scrolled={scrolled} />

            <a href="#quote">
              <Button size="sm">Get Quote</Button>
            </a>
          </div>

          {/* Mobile cluster */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} scrolled={scrolled} />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className={`rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary ${brandClass}`}
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
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? 'max-h-96 border-t border-zinc-200 dark:border-white/10' : 'max-h-0'
        }`}
      >
        <div className="space-y-1 bg-white/95 px-3 pb-4 pt-2 backdrop-blur-xl dark:bg-zinc-950/95">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="block rounded-md px-3 py-2 text-base font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

/** Glassmorphic light/dark toggle. Adapts to whether it sits over the hero or the page. */
function ThemeToggle({ theme, onToggle, scrolled }) {
  const isDark = theme === 'dark';
  const surface = scrolled
    ? 'border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
    : 'border-white/30 bg-white/10 text-white hover:bg-white/20';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border backdrop-blur-md transition focus:outline-none focus:ring-2 focus:ring-primary/60 ${surface}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
