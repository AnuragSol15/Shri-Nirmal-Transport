import { Helmet } from 'react-helmet-async';
import { Hero } from '../sections/Hero';
import { Clients } from '../sections/Clients';
import { Stats } from '../sections/Stats';
import { FleetShowcase } from '../sections/FleetShowcase';
import { HowItWorks } from '../sections/HowItWorks';
import { CoreValues } from '../sections/CoreValues';
import { NetworkMap } from '../sections/NetworkMap';
import { QuoteBuilder } from '../sections/QuoteBuilder';
import { FAQ } from '../sections/FAQ';
import { Gallery } from '../sections/Gallery';
import { CtaBand } from '../sections/CtaBand';
import { COMPANY } from '../data/site';

const PAGE_TITLE = `${COMPANY.name} ${COMPANY.altName} - Enterprise Road Transport from Indore`;
const PAGE_DESC =
  'Daily FTL & LTL road logistics from the Indore hub across Madhya Pradesh. A versatile ' +
  'fleet, transparent rates, and instant transport quotes - daily, insured, on schedule.';

export function Home() {
  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
      </Helmet>

      <main>
        {/* 1 - Split hero with embedded tracking widget */}
        <Hero />
        {/* 2 - Trust strip */}
        <Clients />
        {/* 3 - Key metrics */}
        <Stats />
        {/* 4 - Interactive fleet showcase */}
        <FleetShowcase />
        {/* 5 - How it works / process */}
        <HowItWorks />
        {/* 6 - Why us / core values */}
        <CoreValues />
        {/* 7 - Network coverage + multi-hub office map */}
        <NetworkMap />
        {/* 8 - Multi-step transport quote builder */}
        <QuoteBuilder />
        {/* 9 - FAQ accordion */}
        <FAQ />
        {/* 10 - Operations gallery */}
        <Gallery />
        {/* 11 - Final conversion CTA band */}
        <CtaBand />
      </main>
    </>
  );
}
