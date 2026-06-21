import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, ArrowRight, TruckIcon } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { COMPANY } from '../data/site';

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - {COMPANY.name} {COMPANY.altName}</title>
        {/* A 404 should never be indexed. */}
        <meta name="robots" content="noindex" />
      </Helmet>

      <Section tone="base">
        <Container size="narrow" className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary dark:bg-primary-soft-dark">
            <TruckIcon size={32} aria-hidden="true" />
          </div>

          <p className="mt-8 font-display text-[64px] font-bold leading-none tracking-[-0.02em] text-primary">
            404
          </p>
          <h1 className="mt-4 font-display text-[28px] font-bold tracking-[-0.01em] text-steel-950 dark:text-steel-50">
            This route ran off the map
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-steel-600 dark:text-steel-400">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get
            you back on schedule.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/">
              <Button size="lg">
                <HomeIcon size={18} aria-hidden="true" /> Back to Home
              </Button>
            </Link>
            <Link to="/#quote">
              <Button variant="outline" size="lg">
                Get a Quote <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
