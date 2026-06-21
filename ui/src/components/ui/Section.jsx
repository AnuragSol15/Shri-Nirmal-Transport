const TONE_CLASSES = {
  base: 'bg-steel-50 dark:bg-steel-950',
  surface: 'bg-white dark:bg-steel-900',
  graphite: 'bg-steel-950 text-steel-50',
};

export function Section({
  id,
  tone = 'base',
  padded = true,
  className = '',
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      className={[
        'relative',
        TONE_CLASSES[tone],
        padded ? 'py-16 lg:py-24' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </section>
  );
}
