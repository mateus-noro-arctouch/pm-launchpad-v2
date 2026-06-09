import { Suspense } from "react"
import { JourneyPageClient } from "@/components/journey-page-client"

export default function JourneyPage() {
  return (
    <Suspense>
      <JourneyPageClient />
    </Suspense>
  )
}
