export function Card({ accent = false, className = '', children, ...rest }) {
  return (
    <div
      className={[
        'rounded-xl bg-white border border-steel-300 p-6 transition',
        'dark:bg-steel-900 dark:border-steel-800',
        'hover:-translate-y-0.5 hover:shadow-e2 motion-reduce:transform-none',
        accent ? 'border-l-2 border-l-primary' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
