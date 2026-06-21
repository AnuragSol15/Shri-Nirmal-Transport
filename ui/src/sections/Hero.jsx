import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import { HERO_IMAGE } from '../data/assets';
import { COMPANY } from '../data/site';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import { TrackWidget } from '../components/TrackWidget';

const TRUST_PILLS = [
  { icon: ShieldCheck, label: 'Insured Cargo' },
  { icon: Clock, label: 'Daily Departures' },
  { icon: Truck, label: 'FTL & LTL' },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-steel-950 text-steel-50">
      {/* Duotone-treated hero image, anchored to the right, low presence */}
      <div
        className="absolute inset-y-0 right-0 w-full bg-cover bg-center opacity-25 lg:w-3/5"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden="true"
      />
      {/* Graphite wash so type stays legible over the image */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/90 to-steel-950/40"
        aria-hidden="true"
      />
      {/* Engineering-drawing grid ruling */}
      <div className="absolute inset-0 bg-grid-lines-dark bg-grid opacity-40" aria-hidden="true" />

      {/* One thin drawn-on diagonal primary route line */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M -40 760 L 520 420 L 980 300 L 1480 40"
          stroke="#FF5722"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1000"
          className="animate-draw-line opacity-60 motion-reduce:animate-none"
        />
      </svg>

      <Container
        size="wide"
        className="relative z-10 grid items-center gap-10 py-20 lg:grid-cols-2 lg:gap-12 lg:py-28"
      >
        {/* LEFT - editorial headline + actions */}
        <div className="animate-fade-in-up motion-reduce:animate-none">
          <Eyebrow className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            FTL & LTL - Daily Road Transport - Indore
          </Eyebrow>

          <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
            Road transport that runs on schedule.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-300">
            {COMPANY.name} {COMPANY.altName} moves Full-Truck and Part-Load cargo from the
            Indore hub across Madhya Pradesh - secure, insured, and on schedule, every single day.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get a Transport Quote <ArrowRight size={20} aria-hidden="true" />
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
              <div key={label} className="flex items-center gap-2 text-sm text-steel-300">
                <Icon size={18} className="text-primary" aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - embedded tracking widget on a solid panel */}
        <div className="animate-fade-in-up [animation-delay:120ms] motion-reduce:animate-none lg:pl-8">
          <TrackWidget />
        </div>
      </Container>

      {/* Bottom fade into the next section (matches the page bg in each theme) */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-steel-50 to-transparent dark:from-steel-950"
        aria-hidden="true"
      />
    </section>
  );
}
