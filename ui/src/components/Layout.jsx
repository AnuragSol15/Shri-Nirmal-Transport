import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../hooks/useTheme';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppFab } from './WhatsAppFab';
import { Analytics } from './Analytics';

/**
 * On route change, scroll to the hash target if present (e.g. arriving at
 * "/#quote" from another page), otherwise reset to the top of the new page.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);
  return null;
}

/** Shared chrome (navbar, footer, WhatsApp button, analytics) wrapping every route. */
export function Layout() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <Helmet>
        <html lang="en" />
      </Helmet>
      <ScrollManager />
      <Analytics />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Outlet />
      <Footer />
      <WhatsAppFab />
    </>
  );
}
