"use client"

import { Check, History, Lock, Rocket } from "lucide-react"
import { MilestoneCard } from "@/components/milestone-card"
import { cn } from "@/lib/utils"
import { useJourney, type DerivedState } from "@/lib/journey-store"
import type { Week } from "@/lib/journey-data"

function RailNode({ state, fridayDrop }: { state: DerivedState; fridayDrop?: boolean }) {
  if (fridayDrop) {
    return (
      <span
        aria-hidden
        className={cn(
          "relative z-10 mt-3 flex size-7 items-center justify-center rounded-full ring-4 ring-background",
          state === "locked"
            ? "border border-line bg-white text-brand/40"
            : "bg-brand text-white",
          state === "current" && "lp-glow",
        )}
      >
        <Rocket className="size-3.5" />
      </span>
    )
  }

  return (
    <span
      aria-hidden
      className={cn(
        "relative z-10 mt-3 flex size-7 items-center justify-center rounded-full ring-4 ring-background",
        state === "done" && "bg-foreground text-white",
        state === "current" && "bg-brand text-white lp-glow",
        state === "available" && "border-2 border-brand bg-white",
        state === "locked" && "border border-line bg-white text-muted-foreground",
      )}
    >
      {state === "done" && <Check className="size-3.5" strokeWidth={3} />}
      {state === "current" && <span className="size-2 rounded-full bg-white" />}
      {state === "available" && <span className="size-2 rounded-full bg-brand" />}
      {state === "locked" && <Lock className="size-3" />}
    </span>
  )
}

function RailLine({
  state,
  isFirst,
  isLast,
}: {
  state: DerivedState
  isFirst: boolean
  isLast: boolean
}) {
  const color =
    state === "done"
      ? "bg-brand"
      : state === "current"
        ? "bg-gradient-to-b from-brand to-line"
        : state === "available"
          ? "bg-brand/40"
          : "bg-line"

  return (
    <span
      aria-hidden
      className={cn(
        "absolute left-1/2 w-0.5 -translate-x-1/2",
        color,
        isFirst ? "top-7 bottom-0" : isLast ? "top-0 h-7" : "top-0 bottom-0",
      )}
    />
  )
}

export function WeekSection({ week, index }: { week: Week; index: number }) {
  const { weekVM, milestoneState } = useJourney()
  const wvm = weekVM(week.id)

  return (
    <section className="mt-12 first:mt-0">
      {/* Stage header */}
      <div className={cn("flex items-start gap-4", !wvm.unlocked && "opacity-60")}>
        <span
          aria-hidden
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
            wvm.unlocked ? "bg-foreground text-white" : "border border-line bg-card text-muted-foreground",
          )}
        >
          {index + 1}
        </span>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {week.label}
              </span>
              <h2 className="text-balance text-xl font-bold text-foreground">{week.theme}</h2>
            </div>
            <span className="mt-1 shrink-0 text-sm font-semibold text-brand">
              {wvm.done}/{wvm.total} done
            </span>
          </div>

          {/* Monday re-entry — right below the title */}
          {week.mondayReentry && (
            <div className="mt-2 flex items-start gap-2.5 rounded-lg border border-line bg-muted px-4 py-3">
              <History className="mt-0.5 size-4 shrink-0 text-brand" />
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Monday re-entry — </span>
                {week.mondayReentry}
              </p>
            </div>
          )}

          <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {week.description}
          </p>
        </div>
      </div>

      {/* Trajectory rail + milestones */}
      <ul className="relative mt-5">
        {week.milestones.map((milestone, i) => {
          const state = milestoneState(milestone.id)
          return (
            <li key={milestone.id} className="relative flex gap-4 pb-3 last:pb-0">
              <div className="relative flex w-8 shrink-0 justify-center">
                <RailLine
                  state={state}
                  isFirst={i === 0}
                  isLast={i === week.milestones.length - 1}
                />
                <RailNode state={state} fridayDrop={milestone.fridayDrop} />
              </div>
              <div className="min-w-0 flex-1">
                <MilestoneCard milestone={milestone} />
              </div>
            </li>
          )
        })}
      </ul>

      {/* End-of-week reflection */}
      {week.reflection && (
        <div className="ml-12 mt-3 rounded-xl border border-line bg-card px-5 py-4">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            End-of-week reflection
          </p>
          <p className="text-[13px] leading-relaxed text-foreground">{week.reflection}</p>
        </div>
      )}
    </section>
  )
}
