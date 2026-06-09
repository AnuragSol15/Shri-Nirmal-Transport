import { useState } from 'react';
import { Radar, Mail, Loader2, CheckCircle2, AlertCircle, BellRing } from 'lucide-react';
import { Button } from './ui/Button';

// Owned FastAPI backend (FormSubmit fully retired).
const WAITLIST_ENDPOINT =
  import.meta.env.VITE_WAITLIST_API ?? 'http://localhost:8000/api/waitlist';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Premium "Consignment Tracking — Coming Soon" widget.
 * Collects emails for the priority notification tier when the portal goes live.
 */
export function TrackWidget() {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // honeypot — real users never fill this
  const [state, setState] = useState('idle'); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState('error');
      return;
    }
    setState('submitting');
    try {
      // Native JSON POST to our own FastAPI waitlist route.
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), hp }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      await res.json().catch(() => ({}));
      setState('success');
      setEmail('');
    } catch (err) {
      console.error('Waitlist signup failed:', err);
      setState('error');
    }
  }

  return (
    <div className="relative">
      {/* Ambient glow behind the widget */}
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/20 opacity-60 blur-3xl" aria-hidden="true" />

      <div className="animate-float rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-glass backdrop-blur-xl sm:p-8">
        {/* Status pill */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
          <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-primary" />
          Coming Soon
        </span>

        {/* Icon wrapper */}
        <div className="mt-5 flex items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
            <Radar size={24} aria-hidden="true" />
            <span className="absolute inset-0 animate-glow-pulse rounded-xl ring-2 ring-primary/40" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-white">Consignment Tracking System</h3>
            <p className="text-xs text-zinc-400">Real-time, bilty-level tracking — launching soon.</p>
          </div>
        </div>

        <p className="mt-5 text-sm text-zinc-300">
          We’re building a live tracking portal. Join the priority tier and be the first to know
          when it goes live.
        </p>

        {state === 'success' ? (
          <div className="animate-fade-in-up mt-5 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 motion-reduce:animate-none">
            <CheckCircle2 size={22} className="mt-0.5 flex-shrink-0 text-emerald-400" aria-hidden="true" />
            <div>
              <p className="font-semibold text-white">You’re on the priority list!</p>
              <p className="text-sm text-zinc-300">We’ll email you the moment tracking goes live.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-3" noValidate>
            {/* Honeypot: hidden from humans, tempting to bots. Kept empty = legit. */}
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

            <div className="relative">
              <Mail
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                aria-hidden="true"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === 'error') setState('idle');
                }}
                placeholder="you@company.com"
                autoComplete="email"
                aria-label="Email address for tracking launch notification"
                aria-invalid={state === 'error'}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder-zinc-400 backdrop-blur-md transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <Button type="submit" fullWidth disabled={state === 'submitting'}>
              {state === 'submitting' ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Joining…
                </>
              ) : (
                <>
                  <BellRing size={18} /> Notify Me at Launch
                </>
              )}
            </Button>

            <div aria-live="polite">
              {state === 'error' && (
                <p className="flex items-center gap-2 text-sm text-red-300">
                  <AlertCircle size={16} aria-hidden="true" /> Please enter a valid email address.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
