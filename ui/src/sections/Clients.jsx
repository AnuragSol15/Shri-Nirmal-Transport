import { CLIENT_LOGOS } from '../data/assets';

export function Clients() {
  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      id="clients"
      className="border-y border-sky-100 bg-sky-50/40 py-16 dark:border-white/10 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Trusted by India’s leading brands
        </p>
      </div>

      <div className="group relative mt-10 overflow-hidden" role="region" aria-label="Trusted client logos">
        {/* Edge fades match the section background in both themes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-sky-50 to-transparent dark:from-slate-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-sky-50 to-transparent dark:from-slate-950" />

        <ul className="flex w-max animate-infinite-scroll items-center gap-8 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((logo, i) => (
            <li key={`${logo.alt}-${i}`} className="shrink-0">
              {/* Generous white capsule — uniform footprint, fully legible logos */}
              <div className="flex h-24 w-48 items-center justify-center rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 transition-transform duration-300 hover:scale-105">
                <img
                  className="max-h-full max-w-full object-contain"
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  aria-hidden={i >= CLIENT_LOGOS.length}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
