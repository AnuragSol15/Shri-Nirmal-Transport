export function Card({ accent = false, className = '', children, ...rest }) {
  return (
    <div
      className={[
        'rounded-2xl bg-white p-8 shadow-lg transition-all duration-300',
        'hover:scale-[1.02] hover:shadow-2xl',
        accent ? 'border-t-4 border-primary' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
