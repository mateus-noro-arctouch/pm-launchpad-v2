"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp, Lightbulb, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Milestone, Subtopic } from "@/lib/journey-data"

function StateBadge({ state }: { state: Milestone["state"] }) {
  const map = {
    done: { label: "Done", className: "bg-foreground text-white" },
    current: { label: "In progress", className: "bg-brand text-white" },
    locked: { label: "Upcoming", className: "bg-line text-[#433f3f]" },
  }
  const { label, className } = map[state]
  return (
    <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold", className)}>
      {label}
    </span>
  )
}

function SubtopicRow({ item, locked }: { item: Subtopic; locked: boolean }) {
  return (
    <li className={cn("flex items-center gap-2.5", locked && "opacity-50")}>
      <span
        aria-hidden
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-[5px] border transition-colors",
          item.checked ? "border-brand bg-brand text-white" : "border-line bg-card",
        )}
      >
        {item.checked && <Check className="size-3" strokeWidth={3} />}
      </span>
      <span
        className={cn(
          "text-[13px]",
          item.checked ? "text-muted-foreground line-through" : "text-foreground",
        )}
      >
        {item.label}
      </span>
    </li>
  )
}

function ExpandedContent({ milestone }: { milestone: Milestone }) {
  return (
    <div className="mt-4 space-y-4 border-t border-line pt-4">

      {/* Inputs */}
      {milestone.inputs && milestone.inputs.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Inputs
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

      {/* Checklist */}
      {milestone.subtopics && milestone.subtopics.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Checklist
          </p>
          <ul className="space-y-2">
            {milestone.subtopics.map((item) => (
              <SubtopicRow
                key={item.type}
                item={item}
                locked={milestone.state === "locked"}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Complementary (Friday drops) */}
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

function FridayDropCard({ milestone }: { milestone: Milestone }) {
  const locked = milestone.state === "locked"
  const hasContent = !!(milestone.inputs || milestone.tip || milestone.complementary)
  const [open, setOpen] = useState(milestone.state === "done")

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border border-brand/30 bg-brand-muted/40 px-5 py-4 transition-shadow",
        locked ? "opacity-60" : "cursor-pointer hover:shadow-md",
      )}
      onClick={() => hasContent && !locked && setOpen((o) => !o)}
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-brand" />
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
          <Rocket className="size-4 shrink-0 text-brand" />
          {milestone.title}
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full border border-brand/40 bg-brand-muted px-2.5 py-0.5 text-[11px] font-semibold text-brand">
            Friday Drop
          </span>
          {hasContent && !locked && (
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
      {open && !locked && <ExpandedContent milestone={milestone} />}
    </article>
  )
}

export function MilestoneCard({ milestone }: { milestone: Milestone }) {
  if (milestone.fridayDrop) {
    return <FridayDropCard milestone={milestone} />
  }

  const { state } = milestone
  const edgeColor =
    state === "done" ? "bg-foreground" : state === "current" ? "bg-brand" : "bg-line"
  const hasContent = !!(milestone.inputs || milestone.tip || milestone.scenarios)
  const [open, setOpen] = useState(state === "current")

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card px-5 py-4 shadow-sm transition-shadow",
        state === "current" ? "border-brand shadow-md" : "border-line",
        state === "locked" && "opacity-60",
        hasContent && "cursor-pointer hover:shadow-md",
      )}
      onClick={() => hasContent && setOpen((o) => !o)}
    >
      <span aria-hidden className={cn("absolute inset-y-0 left-0 w-1", edgeColor)} />

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
          {hasContent && (
            <span className="text-muted-foreground">
              {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </span>
          )}
        </div>
      </div>

      {/* Description — always visible, full body text */}
      <p
        className={cn(
          "mt-1.5 text-pretty text-[13px] leading-relaxed text-muted-foreground",
          state === "done" && "opacity-90",
        )}
      >
        {milestone.description}
      </p>

      {/* Expanded: inputs → scenarios → checklist → tip */}
      {open && <ExpandedContent milestone={milestone} />}
    </article>
  )
}
