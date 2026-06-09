import { forwardRef } from 'react';

const FIELD_BASE =
  'w-full rounded-xl border p-3 transition focus:outline-none focus:ring-2 ' +
  'border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 ' +
  'focus:border-primary/60 focus:ring-primary/30 ' +
  'dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-zinc-400 ' +
  'dark:focus:border-primary/60 dark:focus:ring-primary/40 disabled:opacity-50';

const LABEL = 'mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300';

export const Input = forwardRef(({ label, id, className = '', ...rest }, ref) => (
  <div className={className}>
    {label && (
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
    )}
    <input id={id} ref={ref} className={FIELD_BASE} {...rest} />
  </div>
));
Input.displayName = 'Input';

export const Textarea = forwardRef(({ label, id, className = '', ...rest }, ref) => (
  <div className={className}>
    {label && (
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
    )}
    <textarea id={id} ref={ref} className={FIELD_BASE} {...rest} />
  </div>
));
Textarea.displayName = 'Textarea';

export const Select = forwardRef(({ label, id, className = '', children, ...rest }, ref) => (
  <div className={className}>
    {label && (
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
    )}
    <select id={id} ref={ref} className={`${FIELD_BASE} [&>optgroup]:text-zinc-900 [&>option]:text-zinc-900`} {...rest}>
      {children}
    </select>
  </div>
));
Select.displayName = 'Select';
