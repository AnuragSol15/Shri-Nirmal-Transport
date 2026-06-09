import { MapPin } from 'lucide-react';
import { MapWidget } from '../components/MapWidget';
import { SHRI_NIRMAL_NETWORK, DN_TRANSPORT_NETWORK } from '../data/site';
import networkMapImg from '../assets/network-map.jpg';

function NetworkBlock({ title, cities, dotClass }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-white">
        <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
        {title}
      </h3>
      <ul className="columns-2 gap-4 text-sm text-zinc-600 dark:text-zinc-300">
        {cities.map((city) => (
          <li key={city} className="mb-2 flex items-center break-inside-avoid gap-1.5">
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
    <section id="network" className="relative bg-sky-50/40 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Network</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Our regional operational network
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Two dedicated networks running daily out of Indore across Madhya Pradesh.
          </p>
        </div>

        {/* Split: real network city lists (left) + network map asset (right) */}
        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* LEFT — actual operational networks */}
          <div id="coverage" className="space-y-6">
            <NetworkBlock
              title="Shri Nirmal Transport Network"
              cities={SHRI_NIRMAL_NETWORK}
              dotClass="bg-primary"
            />
            <NetworkBlock
              title="DN Transport Network"
              cities={DN_TRANSPORT_NETWORK}
              dotClass="bg-sky-500 dark:bg-sky-400"
            />
          </div>

          {/* RIGHT — prominent network map asset */}
          <figure className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-sky-200/30 blur-2xl dark:bg-primary/10" aria-hidden="true" />
            <img
              src={networkMapImg}
              alt="Shri Nirmal & DN Transport daily route network across Madhya Pradesh"
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl border border-sky-100 bg-white object-cover shadow-xl shadow-sky-200/40 dark:border-white/10 dark:shadow-glass"
            />
            <figcaption className="mt-4 text-center text-sm font-semibold uppercase tracking-[0.3em] text-zinc-700 dark:text-zinc-300">
              Pan MP daily routine
            </figcaption>
          </figure>
        </div>

        {/* Interactive multi-hub office map */}
        <div className="mt-16">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Visit Our Offices</h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Switch between our head office and branch network office.
          </p>
          <div className="mt-5">
            <MapWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
