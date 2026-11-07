"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { MapPinIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

export function SearchForm() {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [location, setLocation] = React.useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (location.trim()) params.set("location", location.trim())
    const search = params.toString()
    router.push(search ? `/jobs?${search}` : "/jobs")
  }

  return (
    <div className="w-full max-w-3xl">
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Job search"
        className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#0d0d16]/80 p-2 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur sm:flex-row sm:items-center sm:gap-0"
      >
        <div className="flex flex-1 items-center gap-3 px-3">
          <SearchIcon
            aria-hidden="true"
            className="size-4 shrink-0 text-slate-500"
          />
          <Input
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Job title, skill or company"
            aria-label="Job title, skill or company"
            className="h-10 flex-1 border-0 bg-transparent px-0 text-slate-100 shadow-none placeholder:text-slate-500 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <Separator
          orientation="vertical"
          className="hidden h-8 bg-white/10 sm:block"
        />
        <Separator className="bg-white/10 sm:hidden" />

        <div className="flex flex-1 items-center gap-3 px-3">
          <MapPinIcon
            aria-hidden="true"
            className="size-4 shrink-0 text-slate-500"
          />
          <Input
            type="search"
            name="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Location or Remote"
            aria-label="Location or Remote"
            className="h-10 flex-1 border-0 bg-transparent px-0 text-slate-100 shadow-none placeholder:text-slate-500 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <Button
          type="submit"
          aria-label="Search jobs"
          className="h-11 w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 sm:h-11 sm:w-11"
        >
          <SearchIcon className="size-5" />
        </Button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="mr-1 text-sm text-slate-500">Trending Position</span>
        {trendingPositions.map((position) => (
          <button
            key={position}
            type="button"
            onClick={() => setQuery(position)}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            {position}
          </button>
        ))}
      </div>
    </div>
  )
}
