import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Rocket, FileText, Users, CheckCircle2, Lock, Circle } from "lucide-react"
import type { Milestone } from "@/lib/journey-data"

const stateConfig = {
  done: {
    edge: "bg-success",
    badgeLabel: "Done",
    badgeClass: "bg-success-muted text-success border-transparent",
    icon: CheckCircle2,
    iconClass: "text-success",
  },
  current: {
    edge: "bg-brand",
    badgeLabel: "In progress",
    badgeClass: "bg-brand-muted text-brand border-transparent",
    icon: Circle,
    iconClass: "text-brand",
  },
  locked: {
    edge: "bg-border",
    badgeLabel: "Locked",
    badgeClass: "bg-muted text-muted-foreground border-transparent",
    icon: Lock,
    iconClass: "text-muted-foreground",
  },
} as const

export function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const config = stateConfig[milestone.state]
  const StateIcon = config.icon
  const isFriday = milestone.fridayDrop
  const isLocked = milestone.state === "locked"

  return (
    <button
      type="button"
      className={cn(
        "group relative flex w-full items-start gap-4 overflow-hidden rounded-lg border bg-card p-5 text-left transition-all",
        "hover:border-brand/40 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
        milestone.state === "current" && "shadow-md shadow-brand/5 ring-1 ring-brand/20",
        milestone.state === "done" && "opacity-90",
        isFriday && "border-friday-border bg-friday hover:bg-friday",
      )}
    >
      {/* Left edge color indicator */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-1.5",
          isFriday ? "bg-friday-accent" : config.edge,
        )}
      />

      {/* Icon */}
      <span
        className={cn(
          "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full",
          isFriday ? "bg-friday-accent/15 text-friday-accent" : "bg-muted",
        )}
      >
        {isFriday ? (
          <Rocket className="size-4.5 text-friday-accent" />
        ) : (
          <StateIcon className={cn("size-4.5", config.iconClass)} />
        )}
      </span>

      {/* Content */}
      <div className={cn("min-w-0 flex-1", isLocked && "opacity-70")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {isFriday && (
              <span className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-friday-accent">
                <Rocket className="size-3" />
                Friday drop
              </span>
            )}
            <h3 className="text-pretty font-medium text-card-foreground">{milestone.title}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{milestone.description}</p>
          </div>
          <Badge variant="outline" className={cn("shrink-0", config.badgeClass)}>
            {config.badgeLabel}
          </Badge>
        </div>

        {/* Sub-badges */}
        {(milestone.deliverable || milestone.buddySession) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {milestone.deliverable && (
              <Badge variant="outline" className="gap-1.5 bg-transparent font-normal text-muted-foreground">
                <FileText className="size-3" />
                Deliverable
              </Badge>
            )}
            {milestone.buddySession && (
              <Badge variant="outline" className="gap-1.5 bg-transparent font-normal text-muted-foreground">
                <Users className="size-3" />
                Session w/ buddy
              </Badge>
            )}
          </div>
        )}
      </div>
    </button>
  )
}
