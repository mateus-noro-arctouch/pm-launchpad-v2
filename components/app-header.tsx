import { pmName, startDate, overallProgress } from "@/lib/journey-data"
import { cn } from "@/lib/utils"

const weeks = [
  { label: "Week 1", state: "done" as const },
  { label: "Week 2", state: "current" as const },
  { label: "Week 3", state: "locked" as const },
]

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white">
      <div className="mx-auto max-w-2xl px-6 py-4">
        {/* Row 1: wordmark + PM */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-foreground">PM Launchpad</span>
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-medium text-foreground">{pmName}</span>
            <span
              aria-hidden
              className="flex size-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground"
            >
              {pmName.charAt(0)}
            </span>
          </div>
        </div>

        {/* Row 2: progress timeline */}
        <div className="mt-5">
          <div className="flex items-center">
            {weeks.map((week, i) => (
              <div key={week.label} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    aria-hidden
                    className={cn(
                      "size-3.5 rounded-full",
                      week.state === "done" && "bg-foreground",
                      week.state === "current" && "bg-brand ring-4 ring-brand/20",
                      week.state === "locked" && "border-2 border-line bg-card",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[11px] font-medium",
                      week.state === "locked" ? "text-muted-foreground" : "text-foreground",
                    )}
                  >
                    {week.label}
                  </span>
                </div>
                {i < weeks.length - 1 && (
                  <span
                    aria-hidden
                    className={cn(
                      "mx-1 -mt-5 h-0.5 flex-1",
                      week.state === "done" ? "bg-foreground" : "bg-line",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Started {startDate}</span>
            <span className="text-xs text-muted-foreground">
              Week 2 of 3 ·{" "}
              <span className="font-semibold text-brand">{overallProgress}% complete</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
