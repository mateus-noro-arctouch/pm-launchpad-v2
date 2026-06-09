"use client"

import { useState } from "react"
import { ChevronDown, RotateCcw, Rocket } from "lucide-react"
import { pmName, startDate } from "@/lib/journey-data"
import { useJourney } from "@/lib/journey-store"
import { cn } from "@/lib/utils"

export function AppHeader() {
  const [expanded, setExpanded] = useState(false)
  const { overall, weekVM, resetProgress } = useJourney()
  const percent = overall.percent

  const weeks = [
    { label: "Week 1", id: "week-1" },
    { label: "Week 2", id: "week-2" },
    { label: "Week 3", id: "week-3" },
  ].map((w) => ({ ...w, state: weekVM(w.id).state }))

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-2xl px-6 py-2.5">
        {/* Compact row — always visible */}
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground">
            <Rocket className="size-4 text-brand" />
            PM Launchpad
          </span>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse progress" : "Expand progress"}
            className="flex items-center gap-3 rounded-full py-1 pl-3 pr-1.5 transition-colors hover:bg-muted"
          >
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Week {overall.currentWeekNumber} ·{" "}
              <span className="font-semibold text-brand">{percent}%</span>
            </span>
            <span aria-hidden className="relative h-1.5 w-16 overflow-hidden rounded-full bg-line">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-brand transition-all"
                style={{ width: `${percent}%` }}
              />
            </span>
            <span
              aria-hidden
              className="flex size-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white"
            >
              {pmName.charAt(0)}
            </span>
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform",
                expanded && "rotate-180",
              )}
            />
          </button>
        </div>

        {/* Expandable flight track */}
        {expanded && (
          <div className="mt-4 border-t border-line pt-4">
            <div className="relative h-9">
              <span
                aria-hidden
                className="absolute left-0 right-0 top-[26px] h-1 -translate-y-1/2 rounded-full bg-line"
              />
              <span
                aria-hidden
                className="absolute left-0 top-[26px] h-1 -translate-y-1/2 rounded-full bg-brand transition-all"
                style={{ width: `${percent}%` }}
              />
              {[0, 50, 100].map((pos, i) => {
                const state = weeks[i].state
                return (
                  <span
                    key={pos}
                    aria-hidden
                    className={cn(
                      "absolute top-[26px] size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
                      state === "done" && "border-brand bg-brand",
                      state === "current" && "border-brand bg-white",
                      state === "locked" && "border-line bg-white",
                    )}
                    style={{ left: `${pos}%` }}
                  />
                )
              })}
              <span
                aria-hidden
                className="lp-float absolute top-[6px] -translate-x-1/2 text-brand"
                style={{ left: `${percent}%` }}
              >
                <Rocket className="size-5 fill-brand/15" />
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-[11px] font-medium">
              {weeks.map((week) => (
                <span
                  key={week.label}
                  className={cn(
                    week.state === "locked" ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  {week.label}
                </span>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Started {startDate}</span>
              <button
                type="button"
                onClick={resetProgress}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-brand"
              >
                <RotateCcw className="size-3.5" />
                Reset progress
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
