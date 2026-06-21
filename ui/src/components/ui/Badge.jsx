const TONE_CLASSES = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-steel-200 text-steel-700 dark:bg-steel-800 dark:text-steel-200',
  success: 'bg-success/10 text-success dark:text-success-dark',
  warning: 'bg-warning/10 text-warning dark:text-warning-dark',
  danger: 'bg-danger/10 text-danger dark:text-danger-dark',
  info: 'bg-info/10 text-info dark:text-info-dark',
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
