import { FAQS } from '../data/site';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Accordion } from '../components/ui/Accordion';

/**
 * FAQ - "Common questions" accordion.
 *
 * Renders the FAQS data through the shared Accordion primitive, which provides
 * an accessible button-controlled disclosure per row: aria-expanded on each
 * header button, aria-controls linking to the answer region, a chevron that
 * rotates on open, hairline-divided rows, and a left-rule primary indicator on
 * the open item. Keyboard usable (native <button>) and reduced-motion safe.
 */
export function FAQ() {
  return (
    <Section id="faq" tone="surface">
      <Container size="narrow">
        <SectionHeading align="left" eyebrow="FAQ" title="Common questions" />

        <Accordion
          items={FAQS}
          className="mt-12 animate-fade-in-up motion-reduce:animate-none"
        />
      </Container>
    </Section>
  );
}
