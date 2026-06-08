import { Rocket } from "lucide-react"
import { pmName } from "@/lib/journey-data"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-brand text-brand-foreground">
            <Rocket className="size-4" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">PM Launchpad</span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-sm font-medium text-foreground">{pmName}</span>
          <span
            aria-hidden
            className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground"
          >
            {pmName.charAt(0)}
          </span>
        </div>
      </div>
    </header>
  )
}
