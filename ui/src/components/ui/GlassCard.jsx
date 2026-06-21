/**
 * Primary surface card. Solid warm-steel surface (no glass/blur) in both themes.
 * `glow` adds the "one highlighted card" device: a 2px primary left-rule.
 * `hover` enables the single micro-lift idiom used across the site.
 * Name kept as GlassCard for import compatibility.
 */
export function GlassCard({ glow = false, hover = false, className = '', children, ...rest }) {
  return (
    <div
      className={[
        'rounded-xl border bg-white shadow-e1 transition',
        'border-steel-300 dark:border-steel-800 dark:bg-steel-900',
        glow ? 'border-l-2 border-l-primary' : '',
        hover ? 'hover:-translate-y-0.5 hover:shadow-e2 motion-reduce:transform-none' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
