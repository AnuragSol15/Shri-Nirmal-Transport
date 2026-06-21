import { CLIENT_LOGOS } from '../data/assets';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Eyebrow } from '../components/ui/Eyebrow';

export function Clients() {
  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <Section
      id="clients"
      tone="surface"
      padded={false}
      className="border-y border-steel-300 py-16 dark:border-steel-800"
    >
      <Container className="text-center">
        <Eyebrow className="!text-primary">Trusted by leading shippers</Eyebrow>
      </Container>

      <div
        className="group relative mt-12 overflow-hidden"
        role="region"
        aria-label="Trusted client logos"
      >
        {/* Edge fades match the section surface in both themes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-steel-900" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-steel-900" />

        <ul className="flex w-max animate-infinite-scroll items-center gap-6 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((logo, i) => (
            <li key={`${logo.alt}-${i}`} className="shrink-0">
              {/* Uniform legible capsule - solid surface, hairline border, one lift idiom */}
              <div className="flex h-24 w-48 items-center justify-center rounded-xl border border-steel-300 bg-white p-6 shadow-e1 transition duration-200 hover:-translate-y-0.5 hover:shadow-e2 motion-reduce:transition-none dark:border-steel-800 dark:bg-steel-850">
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
    </Section>
  );
}
