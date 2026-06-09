"use client"

import { useSearchParams } from "next/navigation"
import { JourneyProvider } from "@/lib/journey-store"
import { JourneyApp } from "@/components/journey-app"

function formatDate(iso: string): string {
  if (!iso) return ""
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
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
