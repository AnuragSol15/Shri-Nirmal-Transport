import { useState } from 'react';
import {
  Package, MapPin, Weight, User, CheckCircle2, ArrowRight, ArrowLeft,
  Send, Loader2, X, Truck, Boxes,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { GlassCard } from '../components/ui/GlassCard';
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
  loadType: '', origin: 'Indore', destination: '', weight: '', cargo: '', name: '', phone: '',
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
  const [hp, setHp] = useState(''); // honeypot — real users never fill this
  const [submit, setSubmit] = useState('idle'); // idle | submitting | success | error

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  const stepValid = [
    !!data.loadType,
    !!data.origin.trim() && !!data.destination.trim() &&
      data.origin.trim().toLowerCase() !== data.destination.trim().toLowerCase(),
    !!data.weight && Number(data.weight) > 0,
    !!data.name.trim() && !!data.phone.trim(),
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

  return (
    <section id="quote" className="relative bg-slate-50 py-24 dark:bg-slate-950">
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-radial-glow opacity-30 dark:opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Get a Quote</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Build your freight request in 60 seconds
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Form */}
          <GlassCard className="p-6 sm:p-8 lg:col-span-3">
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
                          'grid h-8 w-8 place-items-center rounded-full text-sm font-bold transition-colors',
                          done
                            ? 'bg-primary text-white'
                            : current
                              ? 'bg-primary/15 text-primary ring-2 ring-primary'
                              : 'bg-zinc-100 text-zinc-400 dark:bg-white/5 dark:text-zinc-500',
                        ].join(' ')}
                      >
                        {done ? <CheckCircle2 size={16} /> : i + 1}
                      </span>
                      <span className={`hidden text-sm font-medium sm:block ${current ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'}`}>
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <span className={`mx-2 h-px flex-1 ${done ? 'bg-primary' : 'bg-zinc-200 dark:bg-white/10'}`} />
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

              {/* STEP 0 — Load Type */}
              {step === 0 && (
                <div className="animate-fade-in-up grid gap-4 sm:grid-cols-2 motion-reduce:animate-none">
                  {LOAD_TYPES.map(({ id, label, desc, icon: Icon }) => {
                    const selected = data.loadType === id;
                    return (
                      <button
                        type="button"
                        key={id}
                        onClick={() => setData((d) => ({ ...d, loadType: id }))}
                        aria-pressed={selected}
                        className={[
                          'rounded-2xl border p-6 text-left transition-all duration-300',
                          selected
                            ? 'border-primary/60 bg-primary/10 shadow-glow-sm'
                            : 'border-zinc-200 bg-white hover:border-primary/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/30',
                        ].join(' ')}
                      >
                        <Icon size={28} className={selected ? 'text-primary' : 'text-zinc-400'} aria-hidden="true" />
                        <p className="mt-3 font-bold text-zinc-900 dark:text-white">{label}</p>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{desc}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 1 — Route (datalist comboboxes: filter the network, accept custom text) */}
              {step === 1 && (
                <div className="animate-fade-in-up grid gap-4 sm:grid-cols-2 motion-reduce:animate-none">
                  <div>
                    <Input
                      label="Origin Hub"
                      id="origin"
                      list="origin-towns"
                      value={data.origin}
                      onChange={set('origin')}
                      placeholder="Search or type a town…"
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
                      placeholder="Search or type a town…"
                      autoComplete="off"
                    />
                    <TownsDatalist id="destination-towns" />
                  </div>
                  {data.origin.trim() &&
                    data.origin.trim().toLowerCase() === data.destination.trim().toLowerCase() && (
                      <p className="text-sm text-amber-600 dark:text-amber-400 sm:col-span-2">
                        Origin and destination can’t be the same.
                      </p>
                    )}
                </div>
              )}

              {/* STEP 2 — Cargo */}
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
                  />
                  <Textarea
                    label="Cargo Details (optional)"
                    id="cargo"
                    rows={3}
                    placeholder="Commodity, packaging, special handling…"
                    value={data.cargo}
                    onChange={set('cargo')}
                  />
                </div>
              )}

              {/* STEP 3 — Contact */}
              {step === 3 && (
                <div className="animate-fade-in-up grid gap-4 sm:grid-cols-2 motion-reduce:animate-none">
                  <Input label="Your Name" id="name" value={data.name} onChange={set('name')} placeholder="Full name" />
                  <Input label="Phone Number" id="phone" type="tel" value={data.phone} onChange={set('phone')} placeholder="+91…" />
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
                    {submit === 'submitting' ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <><Send size={18} /> Submit Request</>}
                  </Button>
                ) : (
                  <Button type="button" onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext}>
                    Continue <ArrowRight size={18} />
                  </Button>
                )}
              </div>

              {submit === 'error' && (
                <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                  Network error — please retry or call {CONTACT.phoneDisplay}.
                </p>
              )}
            </form>
          </GlassCard>

          {/* Real-time summary */}
          <GlassCard glow className="h-fit p-6 lg:col-span-2 lg:sticky lg:top-24">
            <h3 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-white">
              <Package size={20} className="text-primary" aria-hidden="true" /> Request Summary
            </h3>
            <dl className="mt-5 space-y-3 text-sm">
              <SummaryRow icon={Truck} label="Load Type" value={data.loadType || '—'} />
              <SummaryRow icon={MapPin} label="Route" value={data.destination ? `${data.origin} → ${data.destination}` : '—'} />
              <SummaryRow icon={Weight} label="Weight" value={data.weight ? `${data.weight} Tons` : '—'} />
              <SummaryRow icon={User} label="Contact" value={data.name || '—'} />
            </dl>
            <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400">
              No payment required. Our desk responds with a custom rate, usually within a few hours.
            </div>
          </GlassCard>
        </div>
      </div>

      {submit === 'success' && <SuccessModal onClose={reset} />}
    </section>
  );
}

function SummaryRow({ icon: Icon, label, value }) {
  const filled = value && value !== '—';
  return (
    <div className="flex items-center justify-between gap-3 border-b border-zinc-100 pb-3 last:border-0 dark:border-white/5">
      <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
        <Icon size={15} className="text-zinc-400 dark:text-zinc-500" aria-hidden="true" /> {label}
      </span>
      <span className={`text-right font-semibold ${filled ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`}>{value}</span>
    </div>
  );
}

function SuccessModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-success-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <GlassCard glow className="animate-fade-in-up w-full max-w-sm p-8 text-center motion-reduce:animate-none">
        <button type="button" onClick={onClose} aria-label="Close" className="ml-auto block text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
          <X size={20} />
        </button>
        <CheckCircle2 size={56} className="mx-auto mb-4 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
        <h4 id="quote-success-title" className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">Request Received!</h4>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">Thank you — our freight desk will reach out shortly with your custom rate.</p>
        <Button fullWidth onClick={onClose}>Done</Button>
      </GlassCard>
    </div>
  );
}
