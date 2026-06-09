import { ShieldCheck, Clock, Radar, Network, Headset } from 'lucide-react';
import { CORE_VALUES } from '../data/site';

const ICONS = { ShieldCheck, Clock, Radar, Network, Headset };

/**
 * "Built for enterprise-grade logistics" - intentionally a permanent premium
 * dark/obsidian section in BOTH system themes (no dark: variants here).
 */
export function CoreValues() {
  return (
    <section className="relative bg-zinc-950 py-24">
      {/* subtle top hairline + ambient glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-radial-glow opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why us</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Built for enterprise-grade logistics
          </h2>
        </div>

        {/* Bento grid - obsidian cards with crisp borders */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {CORE_VALUES.map((value) => {
            const Icon = ICONS[value.icon] ?? ShieldCheck;
            return (
              <div
                key={value.title}
                className={[
                  'group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-7',
                  'shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50',
                  value.span ?? '',
                ].join(' ')}
              >
                <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-white">{value.title}</h3>
                <p className="mt-2 text-slate-400">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
