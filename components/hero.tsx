import Image from "next/image"
import type { CSSProperties } from "react"
import {
  BriefcaseIcon,
  ChartColumnIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react"

import { SearchForm } from "@/components/search-form"
import globe from "@/app/images/globe.png"

/**
 * The asset carries a stray magenta haze across its top ~17%.
 * Fade it out before the blue glow begins (~35%).
 */
const globeMask: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, transparent 18%, black 30%)",
  maskImage:
    "linear-gradient(to bottom, transparent 0%, transparent 18%, black 30%)",
}

const stats = [
  { icon: BriefcaseIcon, value: "50K", label: "Active Jobs" },
  { icon: ChartColumnIcon, value: "12K", label: "Companies" },
  { icon: SearchIcon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#07070d]">
      {/* Globe backdrop — anchored to the section bottom so its crown sits
          in the gap between the search bar and the stats block. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[300%] max-w-none -translate-x-1/2 translate-y-[20%] sm:w-[155%] lg:w-full lg:max-w-[1440px]"
      >
        <Image
          src={globe}
          alt=""
          width={1440}
          height={1882}
          priority
          className="w-full"
          style={globeMask}
        />
        {/* Thin orbit ring, concentric with the globe */}
        <span className="absolute top-[77.04%] left-1/2 aspect-square w-[94.58%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-blue-500/60" />
      </div>

      {/* Vignette so the hero top stays near-black */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-black/70 to-transparent"
      />

      <div className="relative z-10 px-4">
        {/* ---------- Headline ---------- */}
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center pt-20 text-center sm:pt-24">
          <div className="flex w-full max-w-xl items-center justify-center gap-4">
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-white/15 sm:block"
            />
            <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5">
              <BriefcaseIcon
                aria-hidden="true"
                className="size-3.5 text-orange-500"
              />
              <span className="text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase">
                <span className="text-white">50,000+</span> new jobs this month
              </span>
            </div>
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-white/15 sm:block"
            />
          </div>

          <h1 className="mt-7 text-4xl leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl lg:text-[54px]">
            Find Your Dream Job Today
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg lg:max-w-3xl">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>

          <div className="mt-10 flex w-full justify-center">
            <SearchForm />
          </div>
        </div>

        {/* ---------- Globe caption + stats ---------- */}
        <div className="mx-auto mt-16 flex min-h-[480px] w-full max-w-[1360px] flex-col items-center justify-end gap-10 pb-16 sm:mt-24 sm:min-h-[560px] sm:pb-20 lg:mt-28 lg:min-h-[680px] lg:gap-12 lg:pb-24">
          <p className="text-center text-2xl leading-snug font-medium text-slate-300 sm:text-3xl">
            Assisting over{" "}
            <span className="font-semibold text-white">15,000</span> job seekers
            <br />
            find their dream positions.
          </p>

          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex min-h-[140px] flex-col justify-between rounded-xl border border-white/10 bg-[#0b0b14]/70 p-4 backdrop-blur-sm sm:min-h-[180px] sm:p-5"
              >
                <Icon aria-hidden="true" className="size-5 text-slate-400" />
                <div>
                  <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {value}
                  </div>
                  <div className="mt-1 text-xs text-slate-500 sm:text-sm">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
