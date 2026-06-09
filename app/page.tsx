import { JourneyApp } from "@/components/journey-app"
import { JourneyProvider } from "@/lib/journey-store"

export default function JourneyHomePage() {
  return (
    <JourneyProvider>
      <JourneyApp />
    </JourneyProvider>
  )
}
