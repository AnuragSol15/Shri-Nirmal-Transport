const VARIANT_CLASSES = {
  primary: 'bg-primary text-white hover:bg-primary-600 shadow-e1 active:scale-[0.98]',
  ghost:
    'bg-transparent text-steel-700 border border-steel-400 hover:bg-steel-200 ' +
    'dark:text-steel-50 dark:border-steel-700 dark:hover:bg-steel-800 active:scale-[0.98]',
  outline:
    'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white active:scale-[0.98]',
};

const SIZE_CLASSES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-[0.01em]',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70',
        'focus-visible:ring-offset-2 ring-offset-steel-50 dark:ring-offset-steel-950',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
