export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  inverted = false,
  align = 'left',
  feature = false,
  className = '',
}) {
  const alignWrap = align === 'center' ? 'text-center' : 'text-left';
  const alignSub = align === 'center' ? 'mx-auto' : '';

  const titleSize = feature
    ? 'text-[38px] font-bold tracking-[-0.02em]'
    : 'text-[34px] font-semibold tracking-[-0.015em]';

  const titleColor = inverted ? 'text-white' : 'text-steel-950 dark:text-steel-50';

  const subColor = inverted ? 'text-steel-200' : 'text-steel-600 dark:text-steel-400';

  return (
    <div className={`${alignWrap} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-3 font-display leading-tight ${titleSize} ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg ${alignSub} ${subColor}`}>{subtitle}</p>
      )}
    </div>
  );
}
