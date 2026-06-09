const TONE_CLASSES = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-green-100 text-green-700',
};

export function Badge({ tone = 'primary', children, className = '' }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
