import { useState } from 'react';
import { Radar, Mail, Loader2, CheckCircle2, AlertCircle, BellRing } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

// Owned FastAPI backend (FormSubmit fully retired).
const WAITLIST_ENDPOINT =
  import.meta.env.VITE_WAITLIST_API ?? 'http://localhost:8000/api/waitlist';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Consignment Tracking - Coming Soon" widget.
 * Collects emails for the priority notification tier when the portal goes live.
 */
export function TrackWidget() {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // honeypot - real users never fill this
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
    <div className="rounded-2xl border border-steel-300 bg-white p-6 shadow-e3 dark:border-steel-800 dark:bg-steel-900 sm:p-8">
      {/* Status pill - static (no decorative pulse) */}
      <Badge tone="primary">Coming Soon</Badge>

      {/* Icon + heading */}
      <div className="mt-5 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/30">
          <Radar size={24} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-steel-950 dark:text-steel-50">
            Consignment Tracking System
          </h3>
          <p className="text-xs text-steel-500">
            Real-time, bilty-level tracking - launching soon.
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm text-steel-600 dark:text-steel-400">
        We are building a live tracking portal. Join the priority tier and be the first to know
        when it goes live.
      </p>

      {state === 'success' ? (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-success/20 bg-success/10 p-4 animate-fade-in-up motion-reduce:animate-none">
          <CheckCircle2
            size={22}
            className="mt-0.5 flex-shrink-0 text-success dark:text-success-dark"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-steel-950 dark:text-steel-50">
              You are on the priority list!
            </p>
            <p className="text-sm text-steel-600 dark:text-steel-400">
              We will email you the moment tracking goes live.
            </p>
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
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-500"
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
              className="w-full rounded-md border border-steel-400 bg-steel-100 py-3 pl-10 pr-3 text-steel-950 placeholder-steel-500 transition focus:border-primary focus:outline-none focus:shadow-focus-ring dark:border-steel-700 dark:bg-steel-850 dark:text-steel-50 dark:placeholder-steel-500"
            />
          </div>

          <Button type="submit" fullWidth disabled={state === 'submitting'}>
            {state === 'submitting' ? (
              <>
                <Loader2 size={18} className="animate-spin motion-reduce:animate-none" /> Joining...
              </>
            ) : (
              <>
                <BellRing size={18} /> Notify Me at Launch
              </>
            )}
          </Button>

          <div aria-live="polite">
            {state === 'error' && (
              <p className="flex items-center gap-2 text-sm text-danger dark:text-danger-dark">
                <AlertCircle size={16} aria-hidden="true" /> Please enter a valid email address.
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
