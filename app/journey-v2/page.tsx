import { Suspense } from "react"
import { JourneyV2PageClient } from "@/components/journey-v2-page-client"

export default function JourneyV2Page() {
  return (
    <Suspense>
      <JourneyV2PageClient />
    </Suspense>
  )
}
