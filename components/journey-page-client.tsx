"use client"

import { useSearchParams } from "next/navigation"
import { JourneyProvider } from "@/lib/journey-store"
import { JourneyApp } from "@/components/journey-app"

function formatDate(iso: string): string {
  if (!iso) return ""
  try {
    const [year, month, day] = iso.split("-")
    return `${month}/${day}/${year}`
  } catch {
    return iso
  }
}

export function JourneyPageClient() {
  const params = useSearchParams()
  const pmName = params.get("name") ?? "PM"
  const startIso = params.get("start") ?? ""
  const startDate = formatDate(startIso)

  return (
    <JourneyProvider pmName={pmName} startDate={startDate}>
      <JourneyApp />
    </JourneyProvider>
  )
}
