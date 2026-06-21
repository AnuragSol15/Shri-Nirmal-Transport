export function Stat({ value, label, sub, highlight = false, className = '' }) {
  return (
    <div className={className}>
      <div
        className={[
          'tnum font-display text-[52px] font-bold leading-none tracking-[-0.02em]',
          highlight ? 'text-primary' : 'text-steel-950 dark:text-steel-50',
        ].join(' ')}
      >
        {value}
      </div>
      <div className="mt-3 font-semibold text-steel-950 dark:text-steel-50">{label}</div>
      {sub && <div className="mt-1 text-sm text-steel-500">{sub}</div>}
    </div>
  );
}
