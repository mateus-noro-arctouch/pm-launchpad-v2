"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp, Lightbulb, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import { useJourney, type DerivedState } from "@/lib/journey-store"
import type { Milestone, TaskVM } from "@/lib/journey-store"

function StateBadge({ state }: { state: DerivedState }) {
  const map: Record<DerivedState, { label: string; className: string }> = {
    done: { label: "Done", className: "bg-foreground text-white" },
    current: { label: "In progress", className: "bg-brand text-white" },
    available: { label: "To do", className: "border border-brand/40 bg-brand-muted text-brand" },
    locked: { label: "Upcoming", className: "bg-line text-[#433f3f]" },
  }
  const { label, className } = map[state]
  return (
    <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold", className)}>
      {label}
    </span>
  )
}

function TaskRow({
  task,
  milestoneId,
  locked,
}: {
  task: TaskVM
  milestoneId: string
  locked: boolean
}) {
  const { toggleTask } = useJourney()
  return (
    <li>
      <button
        type="button"
        disabled={locked}
        onClick={(e) => {
          e.stopPropagation()
          toggleTask(milestoneId, task.key)
        }}
        className={cn(
          "flex w-full items-center gap-2.5 text-left",
          locked ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-[5px] border transition-colors",
            task.checked ? "border-brand bg-brand text-white" : "border-line bg-card",
          )}
        >
          {task.checked && <Check className="size-3" strokeWidth={3} />}
        </span>
        <span
          className={cn(
            "text-[13px]",
            task.checked ? "text-muted-foreground line-through" : "text-foreground",
          )}
        >
          {task.label}
        </span>
      </button>
    </li>
  )
}

function ExpandedContent({
  milestone,
  state,
}: {
  milestone: Milestone
  state: DerivedState
}) {
  const { getTasks } = useJourney()
  const tasks = getTasks(milestone)
  const locked = state === "locked"

  return (
    <div className="mt-4 space-y-4 border-t border-line pt-4">
      {/* Inputs */}
      {milestone.inputs && milestone.inputs.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Reading material
          </p>
          <ul className="space-y-1.5">
            {milestone.inputs.map((input, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px]">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                {input.url ? (
                  <a
                    href={input.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline underline-offset-2 hover:opacity-75"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {input.label}
                  </a>
                ) : (
                  <span className="text-muted-foreground italic">{input.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Scenario choices (W3-M3) */}
      {milestone.scenarios && milestone.scenarios.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Choose one scenario
          </p>
          <div className="space-y-2">
            {milestone.scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="flex items-start gap-3 rounded-lg border border-line bg-muted px-3.5 py-3"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-white">
                  {scenario.id}
                </span>
                <p className="text-[13px] leading-relaxed text-foreground">{scenario.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checklist — interactive */}
      {tasks.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            To complete this milestone
          </p>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <TaskRow key={task.key} task={task} milestoneId={milestone.id} locked={locked} />
            ))}
          </ul>
        </div>
      )}

      {/* Complementary */}
      {milestone.complementary && milestone.complementary.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Complementary
          </p>
          <ul className="space-y-1.5">
            {milestone.complementary.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px]">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-line" />
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground underline underline-offset-2 hover:opacity-75"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-muted-foreground italic">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tip — lamp icon footer */}
      {milestone.tip && (
        <div className="flex items-start gap-3 rounded-lg bg-brand-muted px-3.5 py-3">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-brand" />
          <p className="text-[13px] leading-relaxed text-[#433f3f]">{milestone.tip}</p>
        </div>
      )}
    </div>
  )
}

export function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const { milestoneState } = useJourney()
  const state = milestoneState(milestone.id)
  const locked = state === "locked"
  const [open, setOpen] = useState(state === "current")

  if (milestone.fridayDrop) {
    return (
      <article
        className={cn(
          "group relative overflow-hidden rounded-xl border border-brand/30 bg-brand-muted/40 px-5 py-4 transition-all duration-200",
          locked ? "opacity-60" : "cursor-pointer hover:-translate-y-0.5 hover:shadow-md",
        )}
        onClick={() => !locked && setOpen((o) => !o)}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
            <Rocket className="size-4 shrink-0 text-brand" />
            {milestone.title}
          </h3>
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full border border-brand/40 bg-brand-muted px-2.5 py-0.5 text-[11px] font-semibold text-brand">
              Friday Drop
            </span>
            {!locked && (
              <span className="text-muted-foreground">
                {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </span>
            )}
          </div>
        </div>
        <p className="mt-2 text-pretty text-[13px] leading-relaxed text-muted-foreground">
          {milestone.description}
        </p>
        {locked && (
          <p className="mt-2 text-[12px] italic text-muted-foreground">
            Complete all milestones above to unlock this drop.
          </p>
        )}
        {open && !locked && <ExpandedContent milestone={milestone} state={state} />}
      </article>
    )
  }

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card px-5 py-4 shadow-sm transition-all duration-200",
        state === "current" ? "border-brand shadow-md" : "border-line",
        locked && "opacity-60",
        !locked && "cursor-pointer hover:-translate-y-0.5 hover:shadow-md",
      )}
      onClick={() => !locked && setOpen((o) => !o)}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-foreground">
            <span className="text-muted-foreground">{milestone.code} · </span>
            {milestone.title}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StateBadge state={state} />
          {!locked && (
            <span className="text-muted-foreground">
              {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </span>
          )}
        </div>
      </div>

      {/* Description — always visible */}
      <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-muted-foreground">
        {milestone.description}
      </p>

      {open && !locked && <ExpandedContent milestone={milestone} state={state} />}
    </article>
  )
}
