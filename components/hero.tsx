import { SearchForm } from "@/components/search-form"

/** Deterministic pseudo-random so the star field is stable across renders. */
function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

const stars = Array.from({ length: 70 }, (_, index) => ({
  top: `${(seededRandom(index + 1) * 100).toFixed(2)}%`,
  left: `${(seededRandom(index + 101) * 100).toFixed(2)}%`,
  size: 1 + Math.round(seededRandom(index + 201) * 2),
  opacity: 0.15 + seededRandom(index + 301) * 0.65,
}))

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-88px)] flex-col items-center justify-center overflow-hidden bg-[#131323] px-4 py-24">
      {/* Vignette so the top blends into the navbar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent"
      />

      {/* Indigo glow rising from the bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[45%] bg-[radial-gradient(ellipse_65%_100%_at_50%_100%,rgba(79,70,229,0.55),transparent_70%)]"
      />

      {/* Star field */}
      <div aria-hidden="true" className="absolute inset-0">
        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-slate-300 uppercase">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5 text-indigo-400"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12.5l2.5 2.5L16 9.5" />
          </svg>
          <span>
            <span className="text-white">50,000+</span> new jobs this month
          </span>
        </div>

        <h1 className="mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <div className="mt-10 flex w-full justify-center">
          <SearchForm />
        </div>
      </div>
    </section>
  )
}
