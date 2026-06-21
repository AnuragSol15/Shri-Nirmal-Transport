import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const rawId = useId();
  const headerId = `acc-h-${rawId}`;
  const panelId = `acc-p-${rawId}`;

  return (
    <div
      className={[
        'border-b border-steel-300 dark:border-steel-800 transition-colors',
        open ? 'border-l-2 border-l-primary' : 'border-l-2 border-l-transparent',
      ].join(' ')}
    >
      <h4 className="m-0">
        <button
          type="button"
          id={headerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 pl-4 pr-2 text-left font-display text-[19px] font-semibold text-steel-950 transition-colors hover:text-primary dark:text-steel-50"
        >
          <span>{question}</span>
          <ChevronDown
            className={[
              'h-5 w-5 shrink-0 text-steel-500 transition-transform duration-200 motion-reduce:transition-none',
              open ? 'rotate-180' : '',
            ].join(' ')}
            aria-hidden="true"
          />
        </button>
      </h4>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        hidden={!open}
        className="pb-5 pl-4 pr-8 text-base leading-relaxed text-steel-600 dark:text-steel-400"
      >
        {answer}
      </div>
    </div>
  );
}

export function Accordion({ items, className = '', children }) {
  return (
    <div className={`border-t border-steel-300 dark:border-steel-800 ${className}`}>
      {items
        ? items.map((item, i) => (
            <AccordionItem
              key={item.q ?? i}
              question={item.q}
              answer={item.a}
              defaultOpen={item.defaultOpen ?? false}
            />
          ))
        : children}
    </div>
  );
}
