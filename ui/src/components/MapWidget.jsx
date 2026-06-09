import { useState } from 'react';
import { MapPin } from 'lucide-react';

/** Both operational locations, each with its official Google Maps embed. */
const OFFICES = [
  {
    id: 'head',
    label: 'Indore Head Office',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117708.5792922725!2d75.7568264007568!3d22.78789342179069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631df363b1aab9%3A0xdb60ae7eda28ec33!2sShree%20Nirmal%20Logistice%20%26%20DN%20Transport!5e0!3m2!1sen!2sin!4v1780939227521!5m2!1sen!2sin',
  },
  {
    id: 'branch',
    label: 'Branch Network Office',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117708.34263238459!2d75.75682610473098!3d22.788167623973187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd00761cf01b%3A0xb1843774059a1816!2sShri%20Nirmal%20Logistic%20%26%20DN%20Transport!5e0!3m2!1sen!2sin!4v1780975151524!5m2!1sen!2sin',
  },
];

/**
 * Interactive multi-hub office map: a glassmorphic tab selector toggles between
 * the two location embeds within a single framed zone.
 */
export function MapWidget({ className = '' }) {
  const [activeId, setActiveId] = useState(OFFICES[0].id);
  const active = OFFICES.find((o) => o.id === activeId) ?? OFFICES[0];

  return (
    <div className={className}>
      {/* Glassmorphic tab selector */}
      <div
        role="tablist"
        aria-label="Office locations"
        className="mb-4 inline-flex gap-1 rounded-2xl border border-zinc-200/80 bg-white/60 p-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5"
      >
        {OFFICES.map((office) => {
          const selected = office.id === activeId;
          return (
            <button
              key={office.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(office.id)}
              className={[
                'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300',
                selected
                  ? 'bg-primary text-white shadow-glow-sm'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white',
              ].join(' ')}
            >
              <MapPin size={15} aria-hidden="true" />
              {office.label}
            </button>
          );
        })}
      </div>

      {/* Framed embed zone - keyed for a smooth fade on toggle */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 shadow-lg shadow-zinc-300/30 dark:border-white/10 dark:shadow-glass">
        <iframe
          key={active.id}
          title={`Map - ${active.label}`}
          src={active.src}
          className="block h-[450px] w-full animate-fade-in-up motion-reduce:animate-none"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
