"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { MilestoneCard } from "@/components/milestone-card"
import type { Week } from "@/lib/journey-data"

export function WeekSection({ week }: { week: Week }) {
  const [open, setOpen] = useState(true)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="py-8">
      <CollapsibleTrigger className="group flex w-full items-start justify-between gap-4 text-left">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {week.label}
          </span>
          <h2 className="text-balance text-xl font-semibold text-foreground">{week.theme}</h2>
          <p className="mt-1 max-w-xl text-pretty text-sm text-muted-foreground">
            {week.description}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 size-5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-5 flex flex-col gap-3">
        {week.milestones.map((milestone) => (
          <MilestoneCard key={milestone.id} milestone={milestone} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
