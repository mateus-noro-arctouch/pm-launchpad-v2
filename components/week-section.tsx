import { MilestoneCard } from "@/components/milestone-card"
import type { Week } from "@/lib/journey-data"

export function WeekSection({ week }: { week: Week }) {
  return (
    <section className="mt-10 first:mt-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {week.label}
          </span>
          <h2 className="text-balance text-xl font-bold text-foreground">{week.theme}</h2>
          <p className="mt-1 max-w-xl text-pretty text-sm text-muted-foreground">
            {week.description}
          </p>
        </div>
        <span className="mt-1 shrink-0 text-sm font-semibold text-brand">
          {week.done}/{week.total} done
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {week.milestones.map((milestone) => (
          <MilestoneCard key={milestone.id} milestone={milestone} />
        ))}
      </div>
    </section>
  )
}
