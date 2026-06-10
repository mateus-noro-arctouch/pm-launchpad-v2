"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { JourneyProvider } from "@/lib/journey-store"
import { JourneyV2App } from "@/components/journey-v2-app"

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

function welcomeKey(name: string, start: string) {
  return `pm-launchpad-welcomed-${encodeURIComponent(name)}-${encodeURIComponent(start)}`
}

export function JourneyV2PageClient() {
  const params = useSearchParams()
  const router = useRouter()
  const pmName = params.get("name") ?? "PM"
  const startIso = params.get("start") ?? ""
  const startDate = formatDate(startIso)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let welcomed = false
    try {
      welcomed = !!localStorage.getItem(welcomeKey(pmName, startIso))
    } catch {}
    if (!welcomed) {
      const qs = `name=${encodeURIComponent(pmName)}&start=${encodeURIComponent(startIso)}`
      router.replace(`/welcome?${qs}`)
    } else {
      setReady(true)
    }
  }, [pmName, startIso, router])

  if (!ready) return null

  return (
    <JourneyProvider pmName={pmName} startDate={startDate}>
      <JourneyV2App />
    </JourneyProvider>
  )
}
