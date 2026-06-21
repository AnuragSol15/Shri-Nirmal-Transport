export function Eyebrow({ children, className = '', ...rest }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.14em] text-primary ${className}`}
      {...rest}
    >
      {children}
    </p>
  );
}
