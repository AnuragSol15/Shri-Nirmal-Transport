import { ShieldCheck, Clock, Radar, Network, Headset } from 'lucide-react';
import { CORE_VALUES } from '../data/site';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

const ICONS = { ShieldCheck, Clock, Radar, Network, Headset };

/**
 * "Built for enterprise-grade logistics" - Why-us value props.
 * Intentionally a permanent graphite band in BOTH system themes
 * (tone="graphite" renders steel-950 in light and dark alike).
 */
export function CoreValues() {
  return (
    <Section tone="graphite" className="py-28 lg:py-32">
      {/* subtle top hairline - a single rationed primary accent */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          inverted
          eyebrow="WHY US"
          title="Built for enterprise-grade logistics"
        />

        {/* Equal-weight value cards - solid surfaces, hairline borders, no bento span */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {CORE_VALUES.map((value, i) => {
            const Icon = ICONS[value.icon] ?? ShieldCheck;
            return (
              <div
                key={value.title}
                className="group animate-fade-in-up rounded-xl border border-steel-800 bg-steel-900 p-6 shadow-e1 transition duration-200 hover:-translate-y-0.5 hover:border-steel-700 hover:shadow-e2 motion-reduce:animate-none"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="inline-grid h-12 w-12 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-snug tracking-[-0.01em] text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-400">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
