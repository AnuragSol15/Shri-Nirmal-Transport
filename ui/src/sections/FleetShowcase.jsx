import { useState } from 'react';
import { Container, Truck, Boxes, Truck as TruckIcon, Weight, Ruler, Cog, CheckCircle2 } from 'lucide-react';
import { FLEET } from '../data/fleet';
import { GlassCard } from '../components/ui/GlassCard';

const ICONS = { Container, Truck, Boxes, TruckIcon };

export function FleetShowcase() {
  const [activeId, setActiveId] = useState(FLEET[0].id);
  const active = FLEET.find((f) => f.id === activeId) ?? FLEET[0];
  const ActiveIcon = ICONS[active.icon] ?? Truck;

  return (
    <section id="fleet" className="relative bg-sky-50/40 py-24 dark:bg-slate-900">
      <div className="absolute inset-0 bg-dot-matrix bg-dot-lg opacity-10 dark:opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Fleet</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            The right vehicle for every consignment
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            From sealed containers to heavy multi-axle trailers — purpose-built capacity matched
            to your cargo.
          </p>
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Fleet types" className="mt-10 flex flex-wrap gap-3">
          {FLEET.map((f) => {
            const Icon = ICONS[f.icon] ?? Truck;
            const selected = f.id === activeId;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${f.id}`}
                id={`tab-${f.id}`}
                onClick={() => setActiveId(f.id)}
                className={[
                  'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300',
                  selected
                    ? 'border-primary/50 bg-primary/10 text-primary shadow-glow-sm dark:bg-primary/15 dark:text-white'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-primary/40 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-white',
                ].join(' ')}
              >
                <Icon size={18} className={selected ? 'text-primary' : ''} aria-hidden="true" />
                {f.name}
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <GlassCard
          glow
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          className="mt-8 grid grid-cols-1 gap-8 p-8 lg:grid-cols-5"
        >
          {/* Visual */}
          <div className="lg:col-span-2">
            <div className="relative grid h-full min-h-[220px] place-items-center overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:border-white/10 dark:from-ink-800 dark:to-ink-900">
              <div className="absolute inset-0 bg-radial-glow opacity-40 dark:opacity-60" aria-hidden="true" />
              <ActiveIcon size={120} className="relative text-primary drop-shadow-[0_0_30px_rgba(255,87,34,0.4)]" aria-hidden="true" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur-md dark:bg-black/40 dark:text-zinc-200">
                {active.tagline}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{active.name}</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">{active.blurb}</p>

            <dl className="mt-6 grid grid-cols-3 gap-3">
              <Spec icon={Weight} label="Capacity" value={active.capacity} />
              <Spec icon={Ruler} label="Body Length" value={active.length} />
              <Spec icon={Cog} label="Configuration" value={active.axle} />
            </dl>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Best for</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {active.bestFor.map((use) => (
                  <li
                    key={use}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                  >
                    <CheckCircle2 size={14} className="text-primary" aria-hidden="true" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-white/10 dark:bg-white/[0.03]">
      <Icon size={20} className="mx-auto text-primary" aria-hidden="true" />
      <dt className="mt-2 text-[11px] uppercase tracking-wide text-zinc-400 dark:text-zinc-500">{label}</dt>
      <dd className="mt-1 text-sm font-bold text-zinc-900 dark:text-white">{value}</dd>
    </div>
  );
}
