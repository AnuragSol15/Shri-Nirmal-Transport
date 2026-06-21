import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { COMPANY, CONTACT } from '../data/site';

const UPDATED = '21 June 2026';

/** Small, consistent prose blocks (no typography plugin in this project). */
function Block({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold text-steel-950 dark:text-steel-50">
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-steel-600 dark:text-steel-400">
        {children}
      </div>
    </section>
  );
}

function Bullets({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - {COMPANY.name} {COMPANY.altName}</title>
        <meta
          name="description"
          content={`How ${COMPANY.legalName} collects, uses, and protects the information you share through our website.`}
        />
      </Helmet>

      <Section tone="base">
        <Container size="narrow">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-600"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to Home
          </Link>

          <h1 className="mt-6 font-display text-[34px] font-bold leading-tight tracking-[-0.02em] text-steel-950 dark:text-steel-50">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-steel-500">Last updated: {UPDATED}</p>

          <p className="mt-6 leading-relaxed text-steel-600 dark:text-steel-400">
            This Privacy Policy explains how {COMPANY.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            or &ldquo;our&rdquo;) handles the information you provide when you use this website,
            request a transport quote, or join our tracking-portal waitlist. We keep data
            collection to the minimum needed to respond to you and run our service.
          </p>

          <Block title="Information We Collect">
            <p>When you choose to contact us through this site, we collect:</p>
            <Bullets
              items={[
                'Quote requests: your name, phone number, and (optionally) your email address, along with shipment details such as load type, origin, destination, estimated weight, and any cargo notes you add.',
                'Tracking waitlist: the email address you submit so we can notify you when the consignment-tracking portal goes live.',
                'Technical data: limited request information (such as IP address) is processed temporarily to provide security and basic anti-spam rate limiting.',
              ]}
            />
            <p>
              We do not require you to create an account, and we do not knowingly collect more than
              what you submit through these forms.
            </p>
          </Block>

          <Block title="How We Use Your Information">
            <Bullets
              items={[
                'To prepare and send you a transport rate and to respond to your enquiry.',
                'To contact you about your shipment by phone, WhatsApp, or email.',
                'To notify you when the tracking portal becomes available (waitlist only).',
                'To protect the website against spam and abuse, and to understand, in aggregate, how the site is used so we can improve it.',
              ]}
            />
          </Block>

          <Block title="How Your Information Is Handled and Shared">
            <p>
              Submissions are delivered to our business inbox by email and recorded in our server
              logs. We do not sell or rent your personal information. We share data only with the
              service providers that help us operate the website, and only to the extent needed:
            </p>
            <Bullets
              items={[
                'Our website hosting provider, which serves the site and processes form requests.',
                'Our email delivery (SMTP) provider, which transmits form submissions to our inbox.',
                'An analytics provider (Google Analytics), if enabled, which helps us measure site usage. This may set cookies in your browser.',
              ]}
            />
            <p>
              We may also disclose information where required by law or to protect our rights.
            </p>
          </Block>

          <Block title="Cookies and Analytics">
            <p>
              The site itself uses only essential browser storage (for example, to remember your
              light/dark theme preference). If analytics is enabled, our analytics provider may use
              cookies to measure visits and page views. You can block or delete cookies in your
              browser settings; the site will continue to work.
            </p>
          </Block>

          <Block title="Data Retention">
            <p>
              We keep quote and waitlist information for as long as needed to respond to you and to
              maintain ordinary business records, after which it is deleted or anonymised.
              Technical/security logs are retained only for a short period.
            </p>
          </Block>

          <Block title="Your Rights">
            <p>
              Subject to applicable law, including India&rsquo;s Digital Personal Data Protection
              Act, 2023, you may request access to, correction of, or deletion of the personal
              information you have shared with us. To make a request, contact us using the details
              below and we will respond within a reasonable time.
            </p>
          </Block>

          <Block title="Children's Privacy">
            <p>
              This website is intended for businesses and adults. It is not directed at children,
              and we do not knowingly collect personal information from children.
            </p>
          </Block>

          <Block title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              &ldquo;Last updated&rdquo; date above. Material changes will be reflected on this page.
            </p>
          </Block>

          <Block title="Contact Us">
            <p>For any privacy questions or requests, reach us at:</p>
            <ul className="space-y-1.5">
              <li>
                <span className="font-semibold text-steel-950 dark:text-steel-50">
                  {COMPANY.legalName}
                </span>
              </li>
              <li>
                Email:{' '}
                <a className="text-primary hover:text-primary-600" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                Phone:{' '}
                <a className="text-primary hover:text-primary-600" href={CONTACT.phoneHref}>
                  <span className="tnum">{CONTACT.phoneDisplay}</span>
                </a>
              </li>
              <li>Address: {CONTACT.address}</li>
            </ul>
          </Block>
        </Container>
      </Section>
    </>
  );
}
