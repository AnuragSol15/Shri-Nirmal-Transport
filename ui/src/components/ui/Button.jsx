const VARIANT_CLASSES = {
  primary:
    'bg-primary text-white hover:bg-primary-600 shadow-glow-sm hover:shadow-glow',
  ghost:
    'bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200 ' +
    'dark:bg-white/5 dark:text-white dark:border-white/15 dark:hover:bg-white/10 backdrop-blur-md',
  outline:
    'bg-transparent text-primary border border-primary/50 hover:bg-primary hover:text-white',
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
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
        'transition-all duration-300 hover:scale-[1.02] active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100',
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
