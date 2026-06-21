import { STATS } from '../data/site';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Stat } from '../components/ui/Stat';

// The flagship datum carries the single orange highlight in this band.
const HIGHLIGHT_LABEL = 'On-Time Delivery';

export function Stats() {
  return (
    <Section tone="surface">
      <Container>
        <SectionHeading
          eyebrow="By the numbers"
          title="A decade of dependable haulage"
        />

        {/* Ledger / instrument-panel grid: equal cells split by vertical hairlines, no card boxes. */}
        <div className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0 lg:divide-x lg:divide-steel-300 lg:dark:divide-steel-800">
          {STATS.map((stat, i) => (
            <Stat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              sub={stat.sub}
              highlight={stat.label === HIGHLIGHT_LABEL}
              className={[
                'animate-fade-in-up motion-reduce:animate-none',
                `[animation-delay:${i * 60}ms]`,
                'lg:px-6 lg:first:pl-0 lg:last:pr-0',
              ].join(' ')}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
