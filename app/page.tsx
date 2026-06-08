import { AppHeader } from "@/components/app-header"
import { WeekSection } from "@/components/week-section"
import { journey, pmName } from "@/lib/journey-data"

export default function JourneyHomePage() {
  return (
    <main className="min-h-screen bg-background">
      <AppHeader />

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="pb-2">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
            Welcome aboard, {pmName}
          </h1>
          <p className="mt-1.5 text-pretty text-muted-foreground">
            Your 3-week onboarding journey. One milestone at a time.
          </p>
        </div>

        <div className="divide-y">
          {journey.map((week) => (
            <WeekSection key={week.id} week={week} />
          ))}
        </div>
      </div>
    </main>
  )
}
