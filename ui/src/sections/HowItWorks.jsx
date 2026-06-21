import { FileText, PackageCheck, Truck, MapPinned } from 'lucide-react';
import { PROCESS_STEPS } from '../data/site';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

/**
 * Process / How It Works - four-step flow from quote to delivery.
 * Horizontal timeline on desktop, vertical on mobile. A thin connector line
 * sits behind the numbered coins; the drawn segment uses animate-draw-line on
 * view. Icons are mapped by name from PROCESS_STEPS (data/site).
 */
const ICONS = { FileText, PackageCheck, Truck, MapPinned };

export function HowItWorks() {
  return (
    <Section
      id="process"
      tone="base"
      className="bg-grid-lines bg-grid dark:bg-grid-lines-dark"
    >
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From quote to delivery, four steps"
          subtitle="A simple, transparent path - request a rate, hand over your consignment, and track it through to an on-schedule delivery."
        />

        <div className="relative mt-12">
          {/* Desktop connector: a thin neutral rail with a drawn primary segment. */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-7 hidden h-px w-full lg:block"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              className="stroke-steel-300 dark:stroke-steel-800"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              className="animate-draw-line stroke-primary motion-reduce:animate-none"
              strokeWidth="2"
              strokeDasharray="1000"
            />
          </svg>

          <ol className="relative grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-4 lg:gap-8">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = ICONS[step.icon] ?? FileText;
              const stepNo = String(index + 1).padStart(2, '0');
              const isLast = index === PROCESS_STEPS.length - 1;

              return (
                <li
                  key={step.title}
                  className="group relative flex animate-fade-in-up gap-5 motion-reduce:animate-none lg:flex-col lg:gap-0 lg:text-left"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Mobile connector: vertical rail joining each coin to the next. */}
                  {!isLast && (
                    <span
                      className="absolute left-7 top-14 h-[calc(100%+2.5rem)] w-px -translate-x-1/2 bg-steel-300 dark:bg-steel-800 lg:hidden"
                      aria-hidden="true"
                    />
                  )}

                  {/* Numbered coin with the step icon. */}
                  <span className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30 ring-offset-2 ring-offset-steel-50 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none dark:ring-offset-steel-950">
                    <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                    <span className="tnum absolute -bottom-2 -right-2 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold leading-none text-white shadow-e1">
                      {stepNo}
                    </span>
                  </span>

                  <div className="min-w-0 lg:mt-6">
                    <h3 className="font-display text-[19px] font-semibold leading-snug tracking-[-0.005em] text-steel-950 dark:text-steel-50">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel-600 dark:text-steel-400">
                      {step.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
