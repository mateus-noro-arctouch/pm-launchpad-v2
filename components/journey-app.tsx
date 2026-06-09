"use client"

import { Rocket } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { WeekSection } from "@/components/week-section"
import { journey, pmName, startDate } from "@/lib/journey-data"
import { useJourney } from "@/lib/journey-store"

function LaunchReadinessRing({ value }: { value: number }) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - value / 100)
  return (
    <div className="relative size-28 shrink-0">
      <svg viewBox="0 0 100 100" className="size-28 -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e6e6e6" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#FF8300"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-foreground">{value}%</span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          to launch
        </span>
      </div>
    </div>
  )
}

export function JourneyApp() {
  const { overall } = useJourney()
  const launched = overall.launched

  return (
    <main className="min-h-screen bg-background">
      <AppHeader />

      <div className="mx-auto max-w-2xl px-6 py-10">
        {/* Launchpad hero */}
        <section className="overflow-hidden rounded-2xl border border-brand/20 bg-gradient-to-b from-brand-muted/70 to-card px-6 py-6">
          <div className="flex items-center justify-between gap-6">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
                <Rocket className="size-3.5" />
                On the launchpad
              </span>
              <h1 className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground">
                Welcome aboard, {pmName}
              </h1>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                Your 3-week onboarding journey. One milestone at a time.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Started {startDate}</p>
            </div>
            <LaunchReadinessRing value={overall.percent} />
          </div>
        </section>

        {/* The ascent */}
        {journey.map((week, i) => (
          <WeekSection key={week.id} week={week} index={i} />
        ))}

        {/* Launch zone — the climax */}
        <section className="relative mt-12 overflow-hidden rounded-2xl bg-foreground px-6 py-10 text-center">
          <div aria-hidden className="lp-stars pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 60%, rgba(255,131,0,0.22), transparent 60%)",
            }}
          />
          <div className="relative">
            <span aria-hidden className={launched ? "lp-rise inline-block" : "inline-block"}>
              <Rocket className="mx-auto size-10 text-brand" />
            </span>
            <h2 className="mt-4 text-xl font-bold text-white">
              {launched ? "Cleared for launch" : "Launch"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/60">
              {launched
                ? "Congratulations on completing all three stages — you're cleared for launch. You can still reach out to your buddy anytime, and your manager is there for you too."
                : "Complete all three stages to launch."}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
