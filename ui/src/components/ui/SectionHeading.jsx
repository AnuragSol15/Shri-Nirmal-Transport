export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  inverted = false,
  className = '',
}) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-extrabold sm:text-4xl ${
          inverted ? 'text-white' : 'text-secondary'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-xl ${
            inverted ? 'text-gray-200' : 'text-gray-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
