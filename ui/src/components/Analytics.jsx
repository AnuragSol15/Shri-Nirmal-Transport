import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Env-gated: stays a complete no-op until VITE_GA_ID (a "G-XXXXXXX" id) is set.
const GA_ID = import.meta.env.VITE_GA_ID;

/**
 * Google Analytics 4 integration.
 * - Injects gtag.js exactly once, and only when an id is configured.
 * - Sends a manual page_view on every client-side route change (SPA-correct),
 *   so navigations to /privacy, /404, etc. are counted.
 */
export function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!GA_ID || document.getElementById('ga4-src')) return;

    const script = document.createElement('script');
    script.id = 'ga4-src';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    // We emit page_view ourselves on route change, so disable the automatic one.
    window.gtag('config', GA_ID, { send_page_view: false });
  }, []);

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}
