import { GALLERY } from '../data/assets';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';

export function Gallery() {
  return (
    <Section tone="base">
      <Container>
        <SectionHeading eyebrow="On the road" title="Operations in motion" />

        {/* Responsive 3-column grid of solid, hairline-framed cells. One hover
            idiom: a subtle image scale within the contain-frame plus a caption
            bar that slides up using the existing alt text. */}
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3">
          {GALLERY.map((img, i) => (
            <figure
              key={img.src}
              className="group relative aspect-[4/3] animate-fade-in-up overflow-hidden rounded-xl border border-steel-300 bg-steel-100 shadow-e1 transition duration-200 hover:-translate-y-0.5 hover:shadow-e2 motion-reduce:animate-none motion-reduce:transition-none dark:border-steel-800 dark:bg-steel-850"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale-[0.1] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />

              {/* Caption bar slides up from the bottom on hover */}
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-steel-950/85 px-4 py-3 text-sm font-medium text-steel-50 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none">
                {img.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
