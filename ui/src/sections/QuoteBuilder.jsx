import { useState } from 'react';
import {
  Package, MapPin, Weight, User, CheckCircle2, ArrowRight, ArrowLeft,
  Send, Loader2, X, Truck, Boxes, Check,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { GlassCard } from '../components/ui/GlassCard';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CONTACT } from '../data/site';

// Owned FastAPI backend (replaces the old FormSubmit third-party wrapper).
const QUOTES_ENDPOINT =
  import.meta.env.VITE_QUOTES_API ?? 'http://localhost:8000/api/quotes';

// Real Shri Nirmal & DN Transport operational network (from the route map).
const ROUTE_TOWNS = [
  'Indore', 'Shajapur', 'Sarangpur', 'Pachore', 'Byawara', 'Shujalpur',
  'Akodiya Mandi', 'Narsinghgarh', 'Berchha', 'Gulana', 'Kalapipal', 'Kura Var',
  'Kalisindh Arniya Kala', 'Suthaliya', 'Talen', 'Boda', 'Pat (Tarana)',
  'Dhabli Khurd', 'Tanodiya', 'Piplon Kalan', 'Badod', 'Agra-Malwa', 'Susner',
  'Nalkheda', 'Jirapur', 'Khilchipur', 'Khujner', 'Chapiheda', 'Machalpur',
  'Kanad', 'Modi',
];

const STEPS = ['Load Type', 'Route', 'Cargo', 'Contact'];

const LOAD_TYPES = [
  { id: 'FTL', label: 'Full Truck Load', desc: 'A dedicated vehicle for your consignment.', icon: Truck },
  { id: 'LTL', label: 'Part / Less-than Truck Load', desc: 'Share space, share cost.', icon: Boxes },
];

const EMPTY = {
  loadType: '', origin: 'Indore', destination: '', weight: '', cargo: '', name: '', phone: '', email: '',
};

/** Shared <datalist> of operational towns (used by both route fields). */
function TownsDatalist({ id }) {
  return (
    <datalist id={id}>
      {ROUTE_TOWNS.map((town) => (
        <option key={town} value={town} />
      ))}
    </datalist>
  );
}

export function QuoteBuilder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(EMPTY);
  const [hp, setHp] = useState(''); // honeypot - real users never fill this
  const [submit, setSubmit] = useState('idle'); // idle | submitting | success | error

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  // Email is optional, but if provided it must look valid before submitting.
  const emailOk =
    !data.email.trim() || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email.trim());

  const stepValid = [
    !!data.loadType,
    !!data.origin.trim() && !!data.destination.trim() &&
      data.origin.trim().toLowerCase() !== data.destination.trim().toLowerCase(),
    !!data.weight && Number(data.weight) > 0,
    !!data.name.trim() && !!data.phone.trim() && emailOk,
  ];

  const canNext = stepValid[step];
  const isLast = step === STEPS.length - 1;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stepValid.every(Boolean)) return;
    setSubmit('submitting');
    try {
      // Native JSON POST to our own FastAPI service.
      const res = await fetch(QUOTES_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          loadType: data.loadType,
          origin: data.origin.trim(),
          destination: data.destination.trim(),
          weight: data.weight,
          cargo: data.cargo,
          name: data.name.trim(),
          phone: data.phone.trim(),
          email: data.email.trim(),
          hp,
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      await res.json().catch(() => ({})); // tolerate empty/non-JSON success bodies
      setSubmit('success');
    } catch (err) {
      console.error('Quote submission failed:', err);
      setSubmit('error');
    }
  }

  function reset() {
    setData(EMPTY);
    setStep(0);
    setSubmit('idle');
  }

  const sameRoute =
    data.origin.trim() &&
    data.origin.trim().toLowerCase() === data.destination.trim().toLowerCase();

  return (
    <Section id="quote" tone="base">
      <Container size="default">
        <SectionHeading
          feature
          align="center"
          eyebrow="Get a Quote"
          title="Build your transport request in 60 seconds"
          className="mx-auto max-w-2xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Form */}
          <GlassCard className="p-6 shadow-e3 sm:p-8 lg:col-span-3">
            {/* Stepper */}
            <ol className="mb-8 flex items-center">
              {STEPS.map((label, i) => {
                const done = i < step;
                const current = i === step;
                return (
                  <li key={label} className="flex flex-1 items-center last:flex-none">
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          'grid h-8 w-8 place-items-center rounded-full text-sm font-semibold transition-all duration-200',
                          done
                            ? 'bg-primary text-white'
                            : current
                              ? 'bg-primary/15 text-primary ring-2 ring-primary'
                              : 'bg-steel-100 text-steel-500 dark:bg-steel-850 dark:text-steel-500',
                        ].join(' ')}
                      >
                        {done ? <CheckCircle2 size={16} /> : i + 1}
                      </span>
                      <span
                        className={`hidden text-sm font-medium sm:block ${
                          current
                            ? 'text-steel-950 dark:text-steel-50'
                            : 'text-steel-500 dark:text-steel-500'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <span
                        className={`mx-2 h-px flex-1 transition-colors duration-200 ${
                          done ? 'bg-primary' : 'bg-steel-300 dark:bg-steel-800'
                        }`}
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            <form onSubmit={handleSubmit}>
              {/* Honeypot: hidden from humans, tempting to bots. Empty = legit. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              {/* STEP 0 - Load Type */}
              {step === 0 && (
                <div className="grid animate-fade-in-up gap-4 motion-reduce:animate-none sm:grid-cols-2">
                  {LOAD_TYPES.map(({ id, label, desc, icon: Icon }) => {
                    const selected = data.loadType === id;
                    return (
                      <button
                        type="button"
                        key={id}
                        onClick={() => setData((d) => ({ ...d, loadType: id }))}
                        aria-pressed={selected}
                        className={[
                          'relative rounded-xl border p-6 text-left transition-all duration-200',
                          selected
                            ? 'border-primary bg-primary/10'
                            : 'border-steel-300 bg-white hover:border-primary/40 dark:border-steel-800 dark:bg-steel-850 dark:hover:border-steel-700',
                        ].join(' ')}
                      >
                        {selected && (
                          <span
                            className="absolute right-4 top-4 grid h-5 w-5 place-items-center rounded-full bg-primary text-white"
                            aria-hidden="true"
                          >
                            <Check size={13} strokeWidth={3} />
                          </span>
                        )}
                        <Icon
                          size={28}
                          className={selected ? 'text-primary' : 'text-steel-500'}
                          aria-hidden="true"
                        />
                        <p className="mt-3 font-semibold text-steel-950 dark:text-steel-50">{label}</p>
                        <p className="mt-1 text-sm text-steel-600 dark:text-steel-400">{desc}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 1 - Route (datalist comboboxes: filter the network, accept custom text) */}
              {step === 1 && (
                <div className="grid animate-fade-in-up gap-4 motion-reduce:animate-none sm:grid-cols-2">
                  <div>
                    <Input
                      label="Origin Hub"
                      id="origin"
                      list="origin-towns"
                      value={data.origin}
                      onChange={set('origin')}
                      placeholder="Search or type a town..."
                      autoComplete="off"
                    />
                    <TownsDatalist id="origin-towns" />
                  </div>
                  <div>
                    <Input
                      label="Destination Hub"
                      id="destination"
                      list="destination-towns"
                      value={data.destination}
                      onChange={set('destination')}
                      placeholder="Search or type a town..."
                      autoComplete="off"
                    />
                    <TownsDatalist id="destination-towns" />
                  </div>
                  {sameRoute && (
                    <p className="text-sm text-warning dark:text-warning-dark sm:col-span-2">
                      Origin and destination can't be the same.
                    </p>
                  )}
                </div>
              )}

              {/* STEP 2 - Cargo */}
              {step === 2 && (
                <div className="animate-fade-in-up space-y-4 motion-reduce:animate-none">
                  <Input
                    label="Estimated Weight (Tons)"
                    id="weight"
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="e.g. 12"
                    value={data.weight}
                    onChange={set('weight')}
                    className="tnum"
                  />
                  <Textarea
                    label="Cargo Details (optional)"
                    id="cargo"
                    rows={3}
                    placeholder="Commodity, packaging, special handling..."
                    value={data.cargo}
                    onChange={set('cargo')}
                  />
                </div>
              )}

              {/* STEP 3 - Contact */}
              {step === 3 && (
                <div className="grid animate-fade-in-up gap-4 motion-reduce:animate-none sm:grid-cols-2">
                  <Input label="Your Name" id="name" value={data.name} onChange={set('name')} placeholder="Full name" />
                  <Input
                    label="Phone Number"
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={set('phone')}
                    placeholder="+91..."
                    className="tnum"
                  />
                  <Input
                    label="Email (optional)"
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={set('email')}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="sm:col-span-2"
                  />
                  {data.email.trim() && !emailOk && (
                    <p className="text-sm text-warning dark:text-warning-dark sm:col-span-2">
                      Please enter a valid email address, or leave it blank.
                    </p>
                  )}
                </div>
              )}

              {/* Nav */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className={step === 0 ? 'invisible' : ''}
                >
                  <ArrowLeft size={18} /> Back
                </Button>

                {isLast ? (
                  <Button type="submit" disabled={!canNext || submit === 'submitting'}>
                    {submit === 'submitting' ? <><Loader2 size={18} className="animate-spin motion-reduce:animate-none" /> Sending...</> : <><Send size={18} /> Submit Request</>}
                  </Button>
                ) : (
                  <Button type="button" onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext}>
                    Continue <ArrowRight size={18} />
                  </Button>
                )}
              </div>

              {submit === 'error' && (
                <p className="mt-4 text-sm text-danger dark:text-danger-dark" aria-live="polite">
                  Network error - please retry or call {CONTACT.phoneDisplay}.
                </p>
              )}
            </form>
          </GlassCard>

          {/* Real-time summary */}
          <GlassCard glow className="h-fit p-6 lg:col-span-2 lg:sticky lg:top-24">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-steel-950 dark:text-steel-50">
              <Package size={20} className="text-primary" aria-hidden="true" /> Request Summary
            </h3>
            <dl className="mt-5 space-y-3 text-sm">
              <SummaryRow icon={Truck} label="Load Type" value={data.loadType || '-'} />
              <SummaryRow
                icon={MapPin}
                label="Route"
                value={data.destination ? `${data.origin} -> ${data.destination}` : '-'}
              />
              <SummaryRow
                icon={Weight}
                label="Weight"
                value={data.weight ? `${data.weight} Tons` : '-'}
                numeric={!!data.weight}
              />
              <SummaryRow icon={User} label="Contact" value={data.name || '-'} />
            </dl>
            <div className="mt-5 rounded-xl border border-steel-300 bg-steel-100 p-4 text-xs text-steel-500 dark:border-steel-800 dark:bg-steel-850 dark:text-steel-400">
              No payment required. Our desk responds with a custom rate, usually within a few hours.
            </div>
          </GlassCard>
        </div>
      </Container>

      {submit === 'success' && <SuccessModal onClose={reset} />}
    </Section>
  );
}

function SummaryRow({ icon: Icon, label, value, numeric = false }) {
  const filled = value && value !== '-';
  return (
    <div className="flex items-center justify-between gap-3 border-b border-steel-300 pb-3 last:border-0 dark:border-steel-800">
      <span className="flex items-center gap-2 text-steel-600 dark:text-steel-400">
        <Icon size={15} className="text-steel-500" aria-hidden="true" /> {label}
      </span>
      <span
        className={[
          'text-right font-semibold',
          numeric ? 'tnum' : '',
          filled ? 'text-steel-950 dark:text-steel-50' : 'text-steel-500',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  );
}

function SuccessModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-steel-950/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-success-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <GlassCard glow className="w-full max-w-sm animate-fade-in-up rounded-2xl p-8 text-center shadow-e3 motion-reduce:animate-none">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="ml-auto block text-steel-500 transition-colors hover:text-steel-950 dark:hover:text-steel-50"
        >
          <X size={20} />
        </button>
        <CheckCircle2 size={56} className="mx-auto mb-4 text-success dark:text-success-dark" aria-hidden="true" />
        <h4 id="quote-success-title" className="mb-2 font-display text-xl font-semibold text-steel-950 dark:text-steel-50">
          Request Received!
        </h4>
        <p className="mb-6 text-steel-600 dark:text-steel-400">
          Thank you - our transport desk will reach out shortly with your custom rate.
        </p>
        <Button fullWidth onClick={onClose}>Done</Button>
      </GlassCard>
    </div>
  );
}
