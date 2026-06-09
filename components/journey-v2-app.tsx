"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  BookOpen, CalendarCheck, Check, CheckCircle2, ChevronDown,
  History, Lightbulb, Lock, Rocket, RotateCcw,
} from "lucide-react"
import { motion } from "framer-motion"
import { journey, type Milestone, type Week } from "@/lib/journey-data"
import { useJourney, type DerivedState } from "@/lib/journey-store"
import { cn } from "@/lib/utils"

function clamp(min: number, val: number, max: number) {
  return Math.min(max, Math.max(min, val))
}

/* ─── Space background elements ─── */

type StarData = {
  id: number; x: string; y: string
  size: number; maxOpacity: number; duration: number; delay: number
}

function SpaceStarField() {
  const [stars, setStars] = useState<StarData[]>([])
  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 0.5,
        maxOpacity: 0.3 + Math.random() * 0.6,
        duration: 2.5 + Math.random() * 5,
        delay: Math.random() * 8,
      }))
    )
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
          animate={{ opacity: [0.05, s.maxOpacity, 0.05] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function SpacePlanet({
  className, size, delay, colors,
}: {
  className?: string; size: number; delay: number; colors: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.2, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
      className={cn("absolute pointer-events-none", className)}
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 9 + delay * 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: size, height: size }}
        className={cn(
          "rounded-full border border-white/10 bg-gradient-to-br",
          colors,
          "shadow-[0_4px_24px_0_rgba(255,255,255,0.06)]",
        )}
      />
    </motion.div>
  )
}

function SpaceComet({ delay = 0, topPct = 30 }: { delay?: number; topPct?: number }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute"
      style={{ top: `${topPct}%` }}
      initial={{ x: "110vw", opacity: 0 }}
      animate={{ x: "-15vw", opacity: [0, 0, 0.85, 0.85, 0] }}
      transition={{
        x: { duration: 3.2, ease: "linear", delay, repeat: Infinity, repeatDelay: 18 + delay * 0.5 },
        opacity: { duration: 3.2, times: [0, 0.08, 0.18, 0.85, 1], delay, repeat: Infinity, repeatDelay: 18 + delay * 0.5 },
      }}
    >
      <div className="flex items-center">
        {/* Head (leads to the left) */}
        <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_4px_rgba(255,255,255,0.45)]" />
        {/* Tail (trails to the right) */}
        <div className="h-px w-28 bg-gradient-to-r from-white/60 to-transparent" />
      </div>
    </motion.div>
  )
}

/* ─── Launch Readiness Ring ─── */
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

/* ─── Hero content (rendered inside the fixed panel) ─── */
function HeroContent() {
  const { overall, pmName, startDate } = useJourney()
  const weeks = journey.map((w, i) => ({
    label: w.label,
    active: i + 1 === overall.currentWeekNumber,
    done: overall.launched,
  }))

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.35 + i * 0.18, ease: [0.25, 0.4, 0.25, 1] },
    }),
  }

  return (
    <>
      {/* Animated space background */}
      <SpaceStarField />

      {/* Brand radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(255,131,0,0.13), transparent 58%)" }}
      />

      {/* Floating planets */}
      <SpacePlanet className="left-[6%] top-[18%]" size={32} delay={0.5} colors="from-orange-300/25 to-amber-800/10" />
      <SpacePlanet className="right-[10%] top-[28%]" size={20} delay={0.8} colors="from-violet-400/20 to-purple-900/10" />
      <SpacePlanet className="left-[22%] bottom-[20%]" size={14} delay={1.1} colors="from-cyan-300/20 to-blue-900/10" />
      <SpacePlanet className="right-[28%] bottom-[30%]" size={10} delay={1.4} colors="from-rose-300/15 to-pink-900/10" />

      {/* Comets — right to left, staggered */}
      <SpaceComet delay={1.5} topPct={28} />
      <SpaceComet delay={16} topPct={58} />

      {/* Foreground content */}
      <div className="relative max-w-lg">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
            <Rocket className="size-3.5" />
            On the launchpad
          </span>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Welcome aboard,<br />{pmName}.
          </h1>
          <p className="mt-2 text-sm text-white/50">Started {startDate}</p>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex justify-center">
          <LaunchReadinessRing value={overall.percent} />
        </motion.div>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <div className="mt-8 flex items-center justify-center gap-8">
            {weeks.map((w) => (
              <div key={w.label} className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "size-2.5 rounded-full",
                    w.done ? "bg-brand" : w.active ? "bg-brand/60 ring-2 ring-brand/30" : "bg-white/15",
                  )}
                />
                <span className={cn("text-[10px] font-medium", !w.active && !w.done ? "text-white/30" : "text-white/70")}>
                  {w.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mt-10 text-white/30">
          <ChevronDown className="mx-auto size-5 animate-bounce" />
          <p className="mt-1 text-[11px] uppercase tracking-widest">Scroll to begin</p>
        </motion.div>
      </div>
    </>
  )
}

/* ─── Compact sticky header (fades in as hero fades) ─── */
function V2Header() {
  const { overall, pmName, resetProgress } = useJourney()
  const params = useSearchParams()
  const qs = params.toString()
  const welcomeHref = qs ? `/welcome?${qs}` : "/welcome"
  const percent = overall.percent

  return (
    <header className="border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-full items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground">
            <Rocket className="size-4 text-brand" />
            PM Launchpad
          </span>
          <Link
            href={welcomeHref}
            className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-brand sm:flex"
          >
            <BookOpen className="size-3.5" />
            Mission Briefing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Week {overall.currentWeekNumber} ·{" "}
            <span className="font-semibold text-brand">{percent}%</span>
          </span>
          <div aria-hidden className="relative h-1.5 w-20 overflow-hidden rounded-full bg-line">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-brand transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="flex size-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
            {pmName.charAt(0)}
          </span>
          <button
            type="button"
            onClick={resetProgress}
            title="Reset progress"
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-brand"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>
    </header>
  )
}

/* ─── Milestone row ─── */
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
        locked
          ? "cursor-not-allowed border-line bg-muted opacity-50"
          : "cursor-pointer border-line bg-card hover:border-brand/30",
        expanded && !locked && "border-brand/30 shadow-sm",
        milestone.fridayDrop && !locked && "border-brand/20 bg-brand-muted/20",
      )}
      onClick={() => !locked && onToggle()}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          {state === "done" ? (
            <CheckCircle2 className="size-4 shrink-0 text-brand" />
          ) : locked ? (
            <Lock className="size-4 shrink-0 text-muted-foreground" />
          ) : (
            <span
              className={cn(
                "size-4 shrink-0 rounded-full border-2",
                state === "current" ? "border-brand" : "border-muted-foreground/40",
              )}
            />
          )}
          <span className={cn("truncate text-[15px] font-semibold", locked ? "text-muted-foreground" : "text-foreground")}>
            {milestone.code} · {milestone.title}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold",
              state === "done" ? "bg-brand text-white" :
              state === "current" ? "bg-brand-muted text-brand" :
              "bg-muted text-muted-foreground",
            )}
          >
            {stateBadge[state]}
          </span>
          {!locked && (
            <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", expanded && "rotate-180")} />
          )}
        </div>
      </div>

      {/* Expandable body */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: expanded ? "1fr" : "0fr",
          transition: "grid-template-rows 0.28s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="space-y-3 px-4 pb-4 pt-1">
            <p className="text-sm leading-relaxed text-muted-foreground">{milestone.description}</p>

            {/* Reading material */}
            {milestone.inputs && milestone.inputs.length > 0 && (
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Reading material
                </p>
                <ul className="space-y-1.5">
                  {milestone.inputs.map((inp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                      {inp.url ? (
                        <a
                          href={inp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand underline underline-offset-2 hover:opacity-75"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {inp.label}
                        </a>
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
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
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
                          task.checked
                            ? "border-brand bg-brand"
                            : "border-muted-foreground/40 bg-background hover:border-brand",
                        )}
                      >
                        {task.checked && <Check className="size-2.5 text-white" />}
                      </button>
                      <span className={cn("text-sm", task.checked ? "line-through text-muted-foreground" : "text-foreground")}>
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
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-brand" />
                <p className="text-sm leading-relaxed text-muted-foreground">{milestone.tip}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Week card ─── */
function WeekCard({ week, weekIndex, isActive }: { week: Week; weekIndex: number; isActive: boolean }) {
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
      className={cn(
        "relative flex-shrink-0 overflow-hidden rounded-2xl bg-card transition-all duration-300",
        vm.state === "done"
          ? "border-2 border-brand shadow-[0_4px_28px_rgba(255,131,0,0.18),0_2px_8px_rgba(0,0,0,0.08)]"
          : isActive
          ? "border border-line shadow-[0_8px_32px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.08)]"
          : "border border-line shadow-none",
        unlocking && "lp-card-unlock",
      )}
      data-card-snap
      style={{ width: "80vw", scrollSnapAlign: "start" }}
    >
      {/* Lock overlay */}
      {vm.state === "locked" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-card/80 backdrop-blur-[2px]">
          <Lock className="size-10 text-muted-foreground/60" />
          <p className="text-base font-medium text-muted-foreground">
            Complete Week {weekIndex} to unlock
          </p>
        </div>
      )}

      {/* Card header */}
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-brand">Week {weekIndex + 1}</span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{week.theme}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{week.description}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className={cn("text-2xl font-bold", vm.state === "done" ? "text-brand" : "text-foreground")}>
              {vm.done}
              <span className={cn("text-base font-normal", vm.state === "done" ? "text-brand/70" : "text-muted-foreground")}>
                /{vm.total}
              </span>
            </p>
            <p className={cn("text-xs", vm.state === "done" ? "text-brand/70" : "text-muted-foreground")}>completed</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Monday re-entry */}
        {week.mondayReentry && vm.state !== "locked" && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-muted px-3 py-2.5">
            <History className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <p className="text-sm leading-relaxed text-muted-foreground">{week.mondayReentry}</p>
          </div>
        )}
      </div>

      <div className="border-t border-line" />

      {/* Milestones */}
      <div className="space-y-2.5 p-4">
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
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand">
            <CalendarCheck className="size-3.5" />
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
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            End-of-week reflection
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{week.reflection}</p>
        </div>
      )}
    </div>
  )
}

/* ─── Main V2 app ─── */
export function JourneyV2App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const cardsRailRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const threshold = Math.max(1, window.innerHeight * 0.65)
    setScrollProgress(clamp(0, window.scrollY / threshold, 1))
  }, [])

  const handleCardScroll = useCallback(() => {
    const rail = cardsRailRef.current
    if (!rail) return
    const center = rail.scrollLeft + rail.clientWidth / 2
    const cards = rail.querySelectorAll<HTMLElement>("[data-card-snap]")
    let closest = 0
    let minDist = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setActiveCardIndex(closest)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const heroOpacity = clamp(0, 1 - scrollProgress * 1.7, 1)
  const headerOpacity = clamp(0, scrollProgress * 2.2, 1)

  return (
    <main className="bg-foreground">
      {/* ─ Fixed hero (88vh, fades out as you scroll) ─ */}
      <div
        className="fixed left-0 right-0 top-0 z-0 flex flex-col items-center justify-center overflow-hidden bg-foreground px-6 text-center"
        style={{
          height: "88vh",
          opacity: heroOpacity,
          pointerEvents: heroOpacity < 0.05 ? "none" : "auto",
        }}
      >
        <HeroContent />
      </div>

      {/* ─ Fixed compact header (fades in as hero fades) ─ */}
      <div
        className="fixed left-0 right-0 top-0 z-30"
        style={{
          opacity: headerOpacity,
          pointerEvents: headerOpacity > 0.4 ? "auto" : "none",
        }}
      >
        <V2Header />
      </div>

      {/* ─ Scrollable layer ─ */}
      <div>
        {/* Spacer: hero occupies 88vh but spacer is 78vh so cards peek 10vh below the hero */}
        <div style={{ height: "78vh" }} />

        {/* Cards sheet slides up from below as the hero fades */}
        <div
          className="relative z-10 min-h-screen rounded-t-[32px] bg-background"
          style={{ boxShadow: "0 -16px 60px rgba(0,0,0,0.4)" }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pb-2 pt-3">
            <div className="h-1 w-14 rounded-full bg-line" />
          </div>

          {/* Horizontal cards rail */}
          {/*
            Padding on overflow-x flex containers is unreliable in some browsers.
            Spacer divs + scrollPaddingLeft is the correct cross-browser approach.
            Leading spacer = 10vw - 1rem (gap fills the remaining 1rem before card 1).
          */}
          <div
            ref={cardsRailRef}
            onScroll={handleCardScroll}
            className="scrollbar-hide flex gap-4 overflow-x-auto pb-24 pt-4"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollPaddingLeft: "10vw",
              alignItems: "flex-start",
            }}
          >
            <div style={{ width: "calc(10vw - 1rem)", flexShrink: 0 }} aria-hidden />
            {journey.map((week, i) => (
              <WeekCard key={week.id} week={week} weekIndex={i} isActive={i === activeCardIndex} />
            ))}
            <div style={{ width: "10vw", flexShrink: 0 }} aria-hidden />
          </div>
        </div>
      </div>
    </main>
  )
}
