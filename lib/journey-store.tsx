"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { journey, type Milestone, type Week } from "@/lib/journey-data"

export type DerivedState = "done" | "current" | "available" | "locked"

export interface TaskVM {
  key: string
  label: string
  checked: boolean
}

interface WeekVM {
  done: number
  total: number
  unlocked: boolean
  complete: boolean
  state: "done" | "current" | "locked"
}

interface JourneyContextValue {
  pmName: string
  startDate: string
  getTasks: (milestone: Milestone) => TaskVM[]
  toggleTask: (milestoneId: string, key: string) => void
  resetProgress: () => void
  milestoneState: (id: string) => DerivedState
  isUnlocked: (id: string) => boolean
  weekVM: (weekId: string) => WeekVM
  overall: { percent: number; launched: boolean; currentWeekNumber: number }
}

const JourneyContext = createContext<JourneyContextValue | null>(null)

type Checks = Record<string, Record<string, boolean>>

function taskDefs(milestone: Milestone): { key: string; label: string }[] {
  if (milestone.fridayDrop) {
    return [{ key: "read", label: "Mark material as reviewed" }]
  }
  return (milestone.subtopics ?? []).map((s) => ({ key: s.type, label: s.label }))
}

function storageKey(name: string, start: string) {
  return `pm-launchpad-${encodeURIComponent(name)}-${encodeURIComponent(start)}`
}

function loadFromStorage(key: string): Checks {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as Checks) : {}
  } catch {
    return {}
  }
}

function saveToStorage(key: string, checks: Checks) {
  try {
    localStorage.setItem(key, JSON.stringify(checks))
  } catch {}
}

export function JourneyProvider({
  children,
  pmName = "PM",
  startDate = "",
}: {
  children: ReactNode
  pmName?: string
  startDate?: string
}) {
  const key = storageKey(pmName, startDate)

  const [checks, setChecks] = useState<Checks>(() => loadFromStorage(key))

  const value = useMemo<JourneyContextValue>(() => {
    const isTaskChecked = (id: string, k: string) => !!checks[id]?.[k]
    const isComplete = (m: Milestone) => {
      const defs = taskDefs(m)
      return defs.length > 0 && defs.every((d) => isTaskChecked(m.id, d.key))
    }

    const milestoneInfo: Record<string, { complete: boolean; unlocked: boolean }> = {}
    const weekInfoMap: Record<string, WeekVM> = {}

    let prevWeekComplete = true
    for (const week of journey) {
      const weekUnlocked = prevWeekComplete
      const regulars = week.milestones.filter((m) => !m.fridayDrop)
      const regularsComplete = regulars.every(isComplete)

      for (const m of week.milestones) {
        const complete = isComplete(m)
        const unlocked = m.fridayDrop ? weekUnlocked && regularsComplete : weekUnlocked
        milestoneInfo[m.id] = { complete, unlocked }
      }

      const doneCount = week.milestones.filter(isComplete).length
      const weekComplete = doneCount === week.milestones.length
      weekInfoMap[week.id] = {
        done: doneCount,
        total: week.milestones.length,
        unlocked: weekUnlocked,
        complete: weekComplete,
        state: weekComplete ? "done" : weekUnlocked ? "current" : "locked",
      }
      prevWeekComplete = weekComplete
    }

    let currentMilestoneId: string | null = null
    let currentWeekNumber = journey.length
    outer: for (let wi = 0; wi < journey.length; wi++) {
      for (const m of journey[wi].milestones) {
        const info = milestoneInfo[m.id]
        if (info.unlocked && !info.complete) {
          currentMilestoneId = m.id
          currentWeekNumber = wi + 1
          break outer
        }
      }
    }

    let totalTasks = 0
    let doneTasks = 0
    for (const week of journey) {
      for (const m of week.milestones) {
        for (const d of taskDefs(m)) {
          totalTasks++
          if (isTaskChecked(m.id, d.key)) doneTasks++
        }
      }
    }
    const percent = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100)
    const launched = journey.every((w) => weekInfoMap[w.id].complete)

    const milestoneState = (id: string): DerivedState => {
      const info = milestoneInfo[id]
      if (!info) return "locked"
      if (info.complete) return "done"
      if (!info.unlocked) return "locked"
      if (id === currentMilestoneId) return "current"
      return "available"
    }

    return {
      pmName,
      startDate,
      getTasks: (milestone: Milestone) =>
        taskDefs(milestone).map((d) => ({
          ...d,
          checked: isTaskChecked(milestone.id, d.key),
        })),
      toggleTask: (milestoneId: string, k: string) =>
        setChecks((prev) => {
          const next = {
            ...prev,
            [milestoneId]: { ...prev[milestoneId], [k]: !prev[milestoneId]?.[k] },
          }
          saveToStorage(key, next)
          return next
        }),
      resetProgress: () => {
        setChecks({})
        try { localStorage.removeItem(key) } catch {}
      },
      milestoneState,
      isUnlocked: (id: string) => !!milestoneInfo[id]?.unlocked,
      weekVM: (weekId: string) => weekInfoMap[weekId],
      overall: { percent, launched, currentWeekNumber },
    }
  }, [checks, pmName, startDate, key])

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
}

export function useJourney() {
  const ctx = useContext(JourneyContext)
  if (!ctx) throw new Error("useJourney must be used within JourneyProvider")
  return ctx
}

export type { Milestone, Week }
