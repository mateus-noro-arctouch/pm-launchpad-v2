import { MilestoneCard } from "@/components/milestone-card"
import type { Week } from "@/lib/journey-data"

export function WeekSection({ week }: { week: Week }) {
  return (
    <section className="mt-10 first:mt-0">

      {/* Monday re-entry callout (Week 2 & 3) */}
      {week.mondayReentry && (
        <div className="mb-5 rounded-lg border border-line bg-muted px-4 py-3">
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Monday re-entry — </span>
            {week.mondayReentry}
          </p>
        </div>
      )}

      {/* Week header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {week.label}
          </span>
          <h2 className="text-balance text-xl font-bold text-foreground">{week.theme}</h2>
          <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {week.description}
          </p>
        </div>
        <span className="mt-1 shrink-0 text-sm font-semibold text-brand">
          {week.done}/{week.total} done
        </span>
      </div>

      {/* Milestones */}
      <div className="mt-5 flex flex-col gap-3">
        {week.milestones.map((milestone) => (
          <MilestoneCard key={milestone.id} milestone={milestone} />
        ))}
      </div>

      {/* End-of-week reflection */}
      {week.reflection && (
        <div className="mt-5 rounded-xl border border-line bg-card px-5 py-4">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            End-of-week reflection
          </p>
          <p className="text-[13px] leading-relaxed text-foreground">{week.reflection}</p>
        </div>
      )}

    </section>
  )
}
