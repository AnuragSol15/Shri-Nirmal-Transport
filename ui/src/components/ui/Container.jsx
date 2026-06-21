const SIZE_CLASSES = {
  default: 'max-w-7xl',
  wide: 'max-w-[1440px]',
  narrow: 'max-w-3xl',
};

export function Container({ size = 'default', className = '', children, ...rest }) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
