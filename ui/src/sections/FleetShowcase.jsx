import { useState } from 'react';
import { Container as ContainerIcon, Truck, Boxes, Truck as TruckIcon, Weight, Ruler, Cog, CheckCircle2 } from 'lucide-react';
import { FLEET } from '../data/fleet';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';

const ICONS = { Container: ContainerIcon, Truck, Boxes, TruckIcon };

export function FleetShowcase() {
  const [activeId, setActiveId] = useState(FLEET[0].id);
  const active = FLEET.find((f) => f.id === activeId) ?? FLEET[0];
  const ActiveIcon = ICONS[active.icon] ?? Truck;

  return (
    <Section id="fleet" tone="base">
      <Container>
        <SectionHeading
          feature
          className="max-w-2xl"
          eyebrow="OUR FLEET"
          title="The right vehicle for every consignment"
          subtitle="From sealed containers to heavy multi-axle trailers - purpose-built capacity matched to your cargo."
        />

        {/* Tabs */}
        <div role="tablist" aria-label="Fleet types" className="mt-12 flex flex-wrap gap-3">
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
                  'inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-50 dark:focus-visible:ring-offset-steel-950',
                  selected
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-steel-300 bg-white text-steel-600 hover:border-steel-400 hover:bg-steel-100 hover:text-steel-950 dark:border-steel-800 dark:bg-steel-900 dark:text-steel-400 dark:hover:bg-steel-800 dark:hover:text-steel-50',
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
            <div className="relative grid h-full min-h-[220px] place-items-center overflow-hidden rounded-xl border border-steel-300 bg-steel-100 dark:border-steel-800 dark:bg-steel-850">
              <ActiveIcon size={120} className="text-primary" aria-hidden="true" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-steel-700 shadow-e1 dark:bg-steel-900 dark:text-steel-200">
                {active.tagline}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-steel-950 dark:text-steel-50">
              {active.name}
            </h3>
            <p className="mt-2 text-steel-600 dark:text-steel-400">{active.blurb}</p>

            <dl className="mt-6 grid grid-cols-3 gap-3">
              <Spec icon={Weight} label="Capacity" value={active.capacity} />
              <Spec icon={Ruler} label="Body Length" value={active.length} />
              <Spec icon={Cog} label="Configuration" value={active.axle} />
            </dl>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel-500 dark:text-steel-500">
                Best for
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {active.bestFor.map((use) => (
                  <li
                    key={use}
                    className="inline-flex items-center gap-1.5 rounded-full bg-steel-200 px-3 py-1 text-xs font-semibold text-steel-700 dark:bg-steel-800 dark:text-steel-200"
                  >
                    <CheckCircle2 size={14} className="text-primary" aria-hidden="true" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      </Container>
    </Section>
  );
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-steel-300 bg-steel-100 p-4 text-center dark:border-steel-800 dark:bg-steel-850">
      <Icon size={20} className="mx-auto text-primary" aria-hidden="true" />
      <dt className="mt-2 text-xs uppercase tracking-wide text-steel-500 dark:text-steel-500">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-steel-950 tnum dark:text-steel-50">{value}</dd>
    </div>
  );
}
