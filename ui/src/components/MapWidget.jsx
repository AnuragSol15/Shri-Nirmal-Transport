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
 * Interactive multi-hub office map: a solid warm-steel tab selector toggles
 * between the two location embeds within a single framed zone. The active tab
 * is the one rationed-orange accent (no orange glow); the embed is keyed for a
 * smooth fade on toggle.
 */
export function MapWidget({ className = '' }) {
  const [activeId, setActiveId] = useState(OFFICES[0].id);
  const active = OFFICES.find((o) => o.id === activeId) ?? OFFICES[0];

  return (
    <div className={className}>
      {/* Solid tab selector - active tab is the single primary accent */}
      <div
        role="tablist"
        aria-label="Office locations"
        className="mb-4 inline-flex gap-1 rounded-lg border border-steel-300 bg-steel-100 p-1 dark:border-steel-800 dark:bg-steel-850"
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
                'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold tracking-[0.01em]',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70',
                'focus-visible:ring-offset-2 ring-offset-steel-100 dark:ring-offset-steel-850',
                selected
                  ? 'border border-primary/50 bg-primary/10 text-primary'
                  : 'border border-transparent text-steel-600 hover:bg-steel-200 hover:text-steel-950 dark:text-steel-300 dark:hover:bg-steel-800 dark:hover:text-steel-50',
              ].join(' ')}
            >
              <MapPin size={15} aria-hidden="true" />
              {office.label}
            </button>
          );
        })}
      </div>

      {/* Framed embed zone - keyed for a smooth fade on toggle */}
      <div className="overflow-hidden rounded-2xl border border-steel-300 shadow-e3 dark:border-steel-800">
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
