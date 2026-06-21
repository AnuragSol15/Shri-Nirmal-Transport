import { forwardRef } from 'react';

const FIELD_BASE =
  'w-full rounded-md border p-3 bg-steel-100 border-steel-400 text-steel-950 ' +
  'placeholder-steel-500 transition focus:outline-none focus:border-primary focus:shadow-focus-ring ' +
  'dark:bg-steel-850 dark:border-steel-700 dark:text-steel-50 dark:placeholder-steel-500 ' +
  'disabled:opacity-50';

const LABEL = 'mb-1.5 block text-sm font-medium text-steel-700 dark:text-steel-300';

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
    <select
      id={id}
      ref={ref}
      className={`${FIELD_BASE} [&>optgroup]:text-steel-950 [&>option]:text-steel-950`}
      {...rest}
    >
      {children}
    </select>
  </div>
));
Select.displayName = 'Select';
