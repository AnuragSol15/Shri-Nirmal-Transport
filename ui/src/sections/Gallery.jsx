import { GALLERY } from '../data/assets';

export function Gallery() {
  return (
    <section className="bg-sky-50/40 py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">On the ground</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Our operations gallery
          </h2>
        </div>

        {/* Asymmetric bento-style gallery */}
        <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((img, i) => (
            <figure
              key={img.src}
              className={[
                'group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10',
                i === 0 ? 'col-span-2 row-span-2' : '',
                i === 3 ? 'md:col-span-2' : '',
              ].join(' ')}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                fetchpriority={i === 0 ? 'high' : 'low'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute bottom-3 left-3 translate-y-2 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {img.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
