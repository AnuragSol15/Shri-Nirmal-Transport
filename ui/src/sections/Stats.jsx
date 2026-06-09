import { STATS } from '../data/site';

export function Stats() {
  return (
    <section className="relative bg-slate-50 py-24 dark:bg-slate-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">By the numbers</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            A decade of dependable haulage
          </h2>
        </div>

        {/* Bento grid — mixed card footprints */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={[
                'group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300',
                'border-sky-100 bg-white/70 shadow-md shadow-sky-200/30 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-sky-200/40',
                'dark:border-white/10 dark:bg-white/[0.04] dark:backdrop-blur-md dark:hover:bg-white/[0.06]',
                stat.span ?? '',
              ].join(' ')}
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              <p className="bg-gradient-to-br from-zinc-900 to-primary bg-clip-text text-5xl font-extrabold text-transparent dark:from-white dark:to-primary-400 sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">{stat.label}</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
