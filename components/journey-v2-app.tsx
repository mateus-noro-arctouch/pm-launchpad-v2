"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  BookOpen, CalendarCheck, Check, CheckCircle2, ChevronDown,
  History, Lightbulb, Lock, Rocket, RotateCcw,
} from "lucide-react"
import { journey, type Milestone, type Week } from "@/lib/journey-data"
import { useJourney, type DerivedState } from "@/lib/journey-store"
import { cn } from "@/lib/utils"

/* ─── Launch Readiness Ring (dark variant) ─── */
function LaunchReadinessRing({ value }: { value: number }) {
  const r = 42
  const circ = 2 * Math.PI * r
  return (
    <div className="relative size-32 shrink-0">
      <svg viewBox="0 0 100 100" className="size-32 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
        <circle
          cx="50" cy="50" r={r} fill="none" stroke="#FF8300" strokeWidth="7"
          strokeLinecap="round" strokeDasharray={circ}
          strokeDashoffset={circ * (1 - value / 100)}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{value}%</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">to launch</span>
      </div>
    </div>
  )
}

/* ─── Hero ─── */
function HeroSection() {
  const { overall, pmName, startDate } = useJourney()
  const weeks = journey.map((w) => ({
    label: w.label,
    state: overall.launched ? "done" : w.id === `week-${overall.currentWeekNumber}` ? "current" : "locked",
  }))

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-foreground px-6 text-center">
      <div aria-hidden className="lp-stars pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(255,131,0,0.1), transparent 65%)" }}
      />

      <div className="relative max-w-lg">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
          <Rocket className="size-3.5" />
          On the launchpad
        </span>

        <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Welcome aboard,<br />{pmName}.
        </h1>
        <p className="mt-2 text-sm text-white/50">Started {startDate}</p>

        <div className="mt-8 flex justify-center">
          <LaunchReadinessRing value={overall.percent} />
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          {weeks.map((w) => (
            <div key={w.label} className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "size-2.5 rounded-full",
                  w.state === "done" ? "bg-brand" : w.state === "current" ? "bg-brand/60 ring-2 ring-brand/30" : "bg-white/15",
                )}
              />
              <span className={cn("text-[10px] font-medium", w.state === "locked" ? "text-white/30" : "text-white/70")}>
                {w.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 animate-bounce text-white/30">
          <ChevronDown className="mx-auto size-5" />
          <p className="mt-1 text-[11px] uppercase tracking-widest">Scroll to begin</p>
        </div>
      </div>
    </section>
  )
}

/* ─── Compact sticky header (appears after hero) ─── */
function V2Header() {
  const { overall, pmName, startDate, resetProgress } = useJourney()
  const params = useSearchParams()
  const qs = params.toString()
  const welcomeHref = qs ? `/welcome?${qs}` : "/welcome"
  const percent = overall.percent

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-full items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground">
            <Rocket className="size-4 text-brand" />
            PM Launchpad
          </span>
          <Link href={welcomeHref} className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-brand sm:flex">
            <BookOpen className="size-3.5" />
            Mission Briefing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Week {overall.currentWeekNumber} ·{" "}
            <span className="font-semibold text-brand">{percent}%</span>
          </span>
          <span aria-hidden className="relative h-1.5 w-20 overflow-hidden rounded-full bg-line">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-brand transition-all"
              style={{ width: `${percent}%` }}
            />
          </span>
          <span className="flex size-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
            {pmName.charAt(0)}
          </span>
          <button
            type="button"
            onClick={resetProgress}
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-brand"
            title="Reset progress"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>
    </header>
  )
}

/* ─── Milestone row (expandable within a card) ─── */
function MilestoneRow({
  milestone,
  expanded,
  onToggle,
}: {
  milestone: Milestone
  expanded: boolean
  onToggle: () => void
}) {
  const { milestoneState, getTasks, toggleTask } = useJourney()
  const state: DerivedState = milestoneState(milestone.id)
  const tasks = getTasks(milestone)
  const locked = state === "locked"

  const stateBadge: Record<DerivedState, string> = {
    done: "Done",
    current: "In progress",
    available: "Available",
    locked: "Locked",
  }

  return (
    <div
      className={cn(
        "rounded-xl border transition-all",
        locked ? "cursor-not-allowed border-line bg-muted opacity-50" : "cursor-pointer border-line bg-card hover:border-brand/30",
        expanded && "border-brand/30 shadow-sm",
        milestone.fridayDrop && !locked && "border-brand/20 bg-brand-muted/20",
      )}
      onClick={() => !locked && onToggle()}
    >
      {/* Row header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {state === "done" ? (
            <CheckCircle2 className="size-4 shrink-0 text-brand" />
          ) : locked ? (
            <Lock className="size-4 shrink-0 text-muted-foreground" />
          ) : (
            <span className={cn("size-4 shrink-0 rounded-full border-2", state === "current" ? "border-brand" : "border-muted-foreground/40")} />
          )}
          <span className={cn("text-sm font-semibold truncate", locked ? "text-muted-foreground" : "text-foreground")}>
            {milestone.code} · {milestone.title}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold",
            state === "done" ? "bg-brand text-white" :
            state === "current" ? "bg-brand-muted text-brand" :
            "bg-muted text-muted-foreground"
          )}>
            {stateBadge[state]}
          </span>
          {!locked && (
            <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", expanded && "rotate-180")} />
          )}
        </div>
      </div>

      {/* Expandable body */}
      <div style={{ display: "grid", gridTemplateRows: expanded ? "1fr" : "0fr", transition: "grid-template-rows 0.28s ease" }}>
        <div style={{ overflow: "hidden" }}>
          <div className="space-y-3 px-4 pb-4">
            <p className="text-[13px] leading-relaxed text-muted-foreground">{milestone.description}</p>

            {/* Reading material */}
            {milestone.inputs && milestone.inputs.length > 0 && (
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Reading material
                </p>
                <ul className="space-y-1.5">
                  {milestone.inputs.map((inp, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px]">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                      {inp.url ? (
                        <a href={inp.url} target="_blank" rel="noopener noreferrer"
                          className="text-brand underline underline-offset-2 hover:opacity-75"
                          onClick={(e) => e.stopPropagation()}
                        >{inp.label}</a>
                      ) : (
                        <span className="italic text-muted-foreground">{inp.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Checklist */}
            {tasks.length > 0 && (
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Checklist
                </p>
                <ul className="space-y-2">
                  {tasks.map((task) => (
                    <li key={task.key} className="flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => toggleTask(milestone.id, task.key)}
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded border-2 transition-colors",
                          task.checked ? "border-brand bg-brand" : "border-muted-foreground/40 bg-background hover:border-brand",
                        )}
                      >
                        {task.checked && <Check className="size-2.5 text-white" />}
                      </button>
                      <span className={cn("text-[13px]", task.checked ? "line-through text-muted-foreground" : "text-foreground")}>
                        {task.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tip */}
            {milestone.tip && (
              <div className="flex items-start gap-2 rounded-lg bg-brand-muted px-3 py-2.5">
                <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-brand" />
                <p className="text-[12px] leading-relaxed text-muted-foreground">{milestone.tip}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Week card ─── */
function WeekCard({ week, weekIndex }: { week: Week; weekIndex: number }) {
  const { weekVM } = useJourney()
  const vm = weekVM(week.id)
  const prevStateRef = useRef(vm.state)
  const [unlocking, setUnlocking] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    if (prevStateRef.current === "locked" && vm.state !== "locked") {
      setUnlocking(true)
      const t = setTimeout(() => setUnlocking(false), 2200)
      return () => clearTimeout(t)
    }
    prevStateRef.current = vm.state
  }, [vm.state])

  const regulars = week.milestones.filter((m) => !m.fridayDrop)
  const fridayDrop = week.milestones.find((m) => m.fridayDrop)
  const progressPct = vm.total > 0 ? Math.round((vm.done / vm.total) * 100) : 0

  function toggle(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div
      className={cn("relative flex-shrink-0 rounded-2xl border border-line bg-card transition-shadow", unlocking && "lp-card-unlock")}
      style={{ width: "min(82vw, 560px)", scrollSnapAlign: "start" }}
    >
      {/* Lock overlay */}
      {vm.state === "locked" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-card/80 backdrop-blur-[2px]">
          <Lock className="size-8 text-muted-foreground/60" />
          <p className="text-sm font-medium text-muted-foreground">
            Complete Week {weekIndex} to unlock
          </p>
        </div>
      )}

      {/* Card header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
              Week {weekIndex + 1}
            </span>
            <h2 className="mt-0.5 text-xl font-bold tracking-tight text-foreground">{week.theme}</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground line-clamp-3">{week.description}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xl font-bold text-foreground">
              {vm.done}<span className="text-sm font-normal text-muted-foreground">/{vm.total}</span>
            </p>
            <p className="text-[10px] text-muted-foreground">completed</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Monday re-entry */}
        {week.mondayReentry && vm.state !== "locked" && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-muted px-3 py-2">
            <History className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
            <p className="text-[12px] leading-relaxed text-muted-foreground">{week.mondayReentry}</p>
          </div>
        )}
      </div>

      <div className="border-t border-line" />

      {/* Milestones */}
      <div className="space-y-2 p-4">
        {regulars.map((m) => (
          <MilestoneRow
            key={m.id}
            milestone={m}
            expanded={expandedId === m.id}
            onToggle={() => toggle(m.id)}
          />
        ))}
      </div>

      {/* Friday drop */}
      {fridayDrop && (
        <div className="mx-4 mb-4 rounded-xl border border-brand/20 bg-brand-muted/30 p-3">
          <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand">
            <CalendarCheck className="size-3" />
            Friday content drop
          </p>
          <MilestoneRow
            milestone={fridayDrop}
            expanded={expandedId === fridayDrop.id}
            onToggle={() => toggle(fridayDrop.id)}
          />
        </div>
      )}

      {/* End-of-week reflection */}
      {week.reflection && vm.state !== "locked" && (
        <div className="mx-4 mb-5 rounded-xl bg-muted px-4 py-3">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            End-of-week reflection
          </p>
          <p className="text-[12px] leading-relaxed text-muted-foreground">{week.reflection}</p>
        </div>
      )}
    </div>
  )
}

/* ─── Launch card ─── */
function LaunchCard() {
  const { overall } = useJourney()
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-2xl bg-foreground"
      style={{ width: "min(82vw, 400px)", scrollSnapAlign: "start", minHeight: "260px" }}
    >
      <div aria-hidden className="lp-stars pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 55%, rgba(255,131,0,0.2), transparent 65%)" }}
      />
      <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
        <span aria-hidden className={cn("inline-block", overall.launched && "lp-rise")}>
          <Rocket className="mx-auto size-12 text-brand" />
        </span>
        <h2 className="mt-4 text-xl font-bold text-white">
          {overall.launched ? "Cleared for launch" : "Launch zone"}
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-white/55">
          {overall.launched
            ? "You've completed all three stages. You're ready for your first real project — reach out to your buddy or manager."
            : "Complete all three stages to reach the launch zone."}
        </p>
      </div>
    </div>
  )
}

/* ─── Main V2 app ─── */
export function JourneyV2App() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <V2Header />

      <div
        className="scrollbar-hide flex gap-4 overflow-x-auto pb-20 pt-8"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "max(5vw, 24px)",
          paddingRight: "max(5vw, 24px)",
          alignItems: "flex-start",
        }}
      >
        {journey.map((week, i) => (
          <WeekCard key={week.id} week={week} weekIndex={i} />
        ))}
        <LaunchCard />
      </div>
    </main>
  )
}
