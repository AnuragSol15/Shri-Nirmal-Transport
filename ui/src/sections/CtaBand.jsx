import { ArrowRight, Phone } from 'lucide-react';
import { CTA, CONTACT } from '../data/site';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

/**
 * Final conversion band. Permanent graphite tone in both themes for a premium,
 * focused close. Primary CTA jumps to the quote builder; secondary is a tel link.
 */
export function CtaBand() {
  return (
    <Section tone="graphite" className="overflow-hidden">
      {/* Subtle engineering grid + a soft primary glow anchored bottom-right */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-lines-dark bg-grid opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />

      <Container size="narrow" className="relative text-center">
        <h2 className="font-display text-[34px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[40px]">
          {CTA.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-steel-300">{CTA.subcopy}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="/#quote">
            <Button size="lg">
              Get a Free Quote <ArrowRight size={18} />
            </Button>
          </a>
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-950"
          >
            <Phone size={18} className="text-primary" aria-hidden="true" />
            <span className="tnum">{CONTACT.phoneDisplay}</span>
          </a>
        </div>
      </Container>
    </Section>
  );
}
