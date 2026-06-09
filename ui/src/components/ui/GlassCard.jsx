/**
 * Primary surface. Light mode: soft, grounded muted-slate card (not stark white).
 * Dark mode: glassmorphism. `glow` adds an orange ring; `hover` enables micro-lift.
 */
export function GlassCard({ glow = false, hover = false, className = '', children, ...rest }) {
  return (
    <div
      className={[
        'rounded-2xl border backdrop-blur-md transition',
        // Light: warm muted fill, slightly stronger border + grounded shadow
        'border-sky-100 bg-white/70 shadow-lg shadow-sky-200/30',
        // Dark: glass
        'dark:border-white/10 dark:bg-white/[0.04] dark:shadow-glass',
        glow ? 'ring-1 ring-primary/20 dark:ring-primary/30 dark:shadow-glow-sm' : '',
        hover
          ? 'duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-sky-200/40 dark:hover:bg-white/[0.06]'
          : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
