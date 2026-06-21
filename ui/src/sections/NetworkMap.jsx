import { MapPin } from 'lucide-react';
import { MapWidget } from '../components/MapWidget';
import { SHRI_NIRMAL_NETWORK, DN_TRANSPORT_NETWORK } from '../data/site';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import networkMapImg from '../assets/network-map.jpg';

function NetworkBlock({ title, cities, dotClass }) {
  return (
    <div className="rounded-xl border border-steel-300 bg-white p-6 shadow-e1 dark:border-steel-800 dark:bg-steel-900">
      <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-steel-950 dark:text-steel-50">
        <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} aria-hidden="true" />
        {title}
      </h3>
      <ul className="columns-2 gap-4 text-sm text-steel-600 dark:text-steel-400">
        {cities.map((city) => (
          <li key={city} className="mb-2 flex break-inside-avoid items-center gap-1.5">
            <MapPin size={13} className="flex-shrink-0 text-primary/70" aria-hidden="true" />
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NetworkMap() {
  return (
    <Section id="network" tone="surface">
      <Container>
        <SectionHeading
          eyebrow="Network"
          title="Our regional operational network"
          subtitle="Two dedicated networks running daily out of Indore across Madhya Pradesh."
        />

        {/* Split: real network city lists (left) + network map asset (right) */}
        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* LEFT - actual operational networks (keep id="coverage") */}
          <div id="coverage" className="space-y-6">
            <NetworkBlock
              title="Shri Nirmal Transport Network"
              cities={SHRI_NIRMAL_NETWORK}
              dotClass="bg-primary"
            />
            <NetworkBlock
              title="DN Transport Network"
              cities={DN_TRANSPORT_NETWORK}
              dotClass="bg-info dark:bg-info-dark"
            />
          </div>

          {/* RIGHT - prominent network map asset */}
          <figure className="relative">
            <div
              className="absolute -inset-3 -z-10 rounded-[2rem] bg-steel-200/40 blur-2xl dark:bg-steel-800/40"
              aria-hidden="true"
            />
            <img
              src={networkMapImg}
              alt="Shri Nirmal and DN Transport daily route network across Madhya Pradesh"
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl border border-steel-300 bg-white object-cover shadow-e3 dark:border-steel-800 dark:bg-steel-900"
            />
            <figcaption className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Pan MP daily routine
            </figcaption>
          </figure>
        </div>

        {/* Interactive multi-hub office map */}
        <div className="mt-16">
          <h3 className="font-display text-lg font-semibold text-steel-950 dark:text-steel-50">
            Visit Our Offices
          </h3>
          <p className="mt-1 text-sm text-steel-500 dark:text-steel-500">
            Switch between our head office and branch network office.
          </p>
          <div className="mt-5">
            <MapWidget />
          </div>
        </div>
      </Container>
    </Section>
  );
}
