import { Helmet } from 'react-helmet-async';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Clients } from './sections/Clients';
import { Stats } from './sections/Stats';
import { FleetShowcase } from './sections/FleetShowcase';
import { CoreValues } from './sections/CoreValues';
import { NetworkMap } from './sections/NetworkMap';
import { QuoteBuilder } from './sections/QuoteBuilder';
import { Gallery } from './sections/Gallery';
import { COMPANY } from './data/site';

const PAGE_TITLE = `${COMPANY.name} ${COMPANY.altName} - Enterprise Road Freight from Indore`;
const PAGE_DESC =
  'Premium FTL & LTL road logistics from the Indore hub across India. Live consignment ' +
  'tracking, a versatile fleet, and instant freight quotes - daily, insured, on schedule.';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <html lang="en" />
      </Helmet>

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        {/* 1 - High-impact split hero with embedded tracking */}
        <Hero />
        {/* 2 - Trust strip */}
        <Clients />
        {/* 3 - Bento stats */}
        <Stats />
        {/* 4 - Interactive fleet showcase */}
        <FleetShowcase />
        {/* 5 - Bento core values */}
        <CoreValues />
        {/* 6 - Network coverage + multi-hub office map */}
        <NetworkMap />
        {/* 7 - Multi-step freight quote builder */}
        <QuoteBuilder />
        {/* 8 - Operations gallery */}
        <Gallery />
      </main>

      <Footer />
    </>
  );
}
