import { Check, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Milestone, Subtopic } from "@/lib/journey-data"

function StateBadge({ state }: { state: Milestone["state"] }) {
  const map = {
    done: { label: "Done", className: "bg-foreground text-card" },
    current: { label: "In progress", className: "bg-brand text-brand-foreground" },
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
          "flex size-4 items-center justify-center rounded-[5px] border transition-colors",
          item.checked ? "border-brand bg-brand text-brand-foreground" : "border-line bg-card",
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

function FridayDropCard({ milestone }: { milestone: Milestone }) {
  const locked = milestone.state === "locked"
  return (
    <article
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl border border-brand/30 bg-brand-muted/40 px-5 py-4 transition-shadow hover:shadow-md",
        locked && "opacity-60",
      )}
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-brand" />
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
          <Rocket className="size-4 text-brand" />
          {milestone.title}
        </h3>
        <span className="shrink-0 rounded-full border border-brand/40 bg-brand-muted px-2.5 py-0.5 text-[11px] font-semibold text-brand">
          Friday Drop
        </span>
      </div>
      <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-muted-foreground">
        {milestone.description}
      </p>
      {locked && (
        <p className="mt-2 text-[12px] italic text-muted-foreground">
          Complete all milestones above to unlock this drop.
        </p>
      )}
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

  return (
    <article
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl border bg-card px-5 py-4 shadow-sm transition-shadow hover:shadow-md",
        state === "current" ? "border-brand shadow-md" : "border-line",
        state === "locked" && "opacity-60",
      )}
    >
      <span aria-hidden className={cn("absolute inset-y-0 left-0 w-1", edgeColor)} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-foreground">
            <span className="text-muted-foreground">{milestone.code} · </span>
            {milestone.title}
          </h3>
          <p
            className={cn(
              "mt-0.5 text-[13px] text-muted-foreground",
              state === "done" && "opacity-90",
            )}
          >
            {milestone.description}
          </p>
        </div>
        <StateBadge state={state} />
      </div>

      {milestone.subtopics && (
        <ul className="mt-3 flex flex-col gap-2 border-t border-line pt-3">
          {milestone.subtopics.map((item) => (
            <SubtopicRow key={item.type} item={item} locked={state === "locked"} />
          ))}
        </ul>
      )}
    </article>
  )
}
