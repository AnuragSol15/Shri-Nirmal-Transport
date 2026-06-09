import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import { HERO_IMAGE } from '../data/assets';
import { COMPANY } from '../data/site';
import { Button } from '../components/ui/Button';
import { TrackWidget } from '../components/TrackWidget';

const TRUST_PILLS = [
  { icon: ShieldCheck, label: 'Insured Cargo' },
  { icon: Clock, label: 'Daily Departures' },
  { icon: Truck, label: 'FTL & LTL' },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background image + layered dark gradient + grid */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/95 to-ink-900/80" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-lines bg-grid opacity-40" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-radial-glow" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-28 lg:px-8">
        {/* LEFT — premium typography */}
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-primary" />
            {COMPANY.tagline} · Indore
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Supply Chains,{' '}
            <span className="bg-gradient-to-r from-primary-400 via-primary to-primary-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
              Delivered Daily.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-zinc-300 sm:text-xl">
            {COMPANY.name} {COMPANY.altName} moves Full-Truck & Part-Load freight from the
            Indore hub across India — secure, tracked, and on schedule, every single day.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get a Freight Quote <ArrowRight size={20} />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Our Fleet
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {TRUST_PILLS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-zinc-300">
                <Icon size={18} className="text-primary" aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — embedded floating tracking widget */}
        <div className="animate-fade-in-up lg:pl-8 [animation-delay:120ms]">
          <TrackWidget />
        </div>
      </div>

      {/* Bottom fade into next section (matches the Clients band in each theme) */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-950" aria-hidden="true" />
    </section>
  );
}
