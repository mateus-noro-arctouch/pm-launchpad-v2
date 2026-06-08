export type MilestoneState = "done" | "current" | "locked"

export interface Subtopic {
  type: "inputs" | "deliverable" | "buddy"
  label: string
  checked: boolean
}

export interface Milestone {
  id: string
  code: string
  title: string
  description: string
  state: MilestoneState
  fridayDrop?: boolean
  subtopics?: Subtopic[]
}

export interface Week {
  id: string
  label: string
  theme: string
  description: string
  done: number
  total: number
  milestones: Milestone[]
}

export const pmName = "Mateus"
export const startDate = "Jun 2, 2026"
export const overallProgress = 38

const inputs = (checked: boolean): Subtopic => ({
  type: "inputs",
  label: "Read the inputs",
  checked,
})
const deliverable = (checked: boolean): Subtopic => ({
  type: "deliverable",
  label: "Deliverable submitted",
  checked,
})
const buddy = (checked: boolean): Subtopic => ({
  type: "buddy",
  label: "Session with buddy done",
  checked,
})

export const journey: Week[] = [
  {
    id: "week-1",
    label: "Week 1",
    theme: "Corporate & Foundations",
    description: "Get settled, meet the team, and prepare for your PM journey.",
    done: 5,
    total: 5,
    milestones: [
      {
        id: "w1-m1",
        code: "M1",
        title: "Corporate onboarding",
        description: "Your HR onboarding is the priority this week.",
        state: "done",
        subtopics: [inputs(true)],
      },
      {
        id: "w1-m2",
        code: "M2",
        title: "Tool setup & hours logging",
        description: "Get your PM toolset running before Week 2.",
        state: "done",
        subtopics: [inputs(true)],
      },
      {
        id: "w1-m3",
        code: "M3",
        title: "Meet the team & map the org",
        description: "Build relationships early — they compound.",
        state: "done",
        subtopics: [inputs(true)],
      },
      {
        id: "w1-m4",
        code: "M4",
        title: "Company & role orientation",
        description: "Understand where you fit and how the career path works.",
        state: "done",
        subtopics: [inputs(true)],
      },
      {
        id: "w1-m5",
        code: "M5",
        title: "Friday kickoff",
        description:
          "Your study case starts Monday. Here's what's coming and how to make the most of Week 2.",
        state: "done",
        fridayDrop: true,
      },
    ],
  },
  {
    id: "week-2",
    label: "Week 2",
    theme: "Case Begins",
    description:
      "Dive into the Lonely Planet project: set up your home base, run the first client-facing moments.",
    done: 2,
    total: 7,
    milestones: [
      {
        id: "w2-m1",
        code: "M1",
        title: "Project Page",
        description: "Single source of truth for everything on this project.",
        state: "done",
        subtopics: [inputs(true), deliverable(true)],
      },
      {
        id: "w2-m2",
        code: "M2",
        title: "Sales handoff",
        description: "Take ownership from the sales team.",
        state: "current",
        subtopics: [inputs(true), deliverable(false), buddy(false)],
      },
      {
        id: "w2-m3",
        code: "M3",
        title: "Kickoffs",
        description: "Align the team and set client expectations.",
        state: "locked",
        subtopics: [inputs(false), deliverable(false), buddy(false)],
      },
      {
        id: "w2-m4",
        code: "M4",
        title: "Friday discovery drop",
        description: "Real Lonely Planet discovery material drops here before Week 3.",
        state: "locked",
        fridayDrop: true,
      },
    ],
  },
  {
    id: "week-3",
    label: "Week 3",
    theme: "Build",
    description: "Close out the core deliverables and handle a real project challenge.",
    done: 0,
    total: 7,
    milestones: [
      {
        id: "w3-m1",
        code: "M1",
        title: "Status report",
        description: "Communicate project status before a big milestone.",
        state: "locked",
        subtopics: [inputs(false), deliverable(false)],
      },
      {
        id: "w3-m2",
        code: "M2",
        title: "User Story Map & MVP",
        description: "The capstone — build and present your story map to your buddy.",
        state: "locked",
        subtopics: [inputs(false), deliverable(false), buddy(false)],
      },
      {
        id: "w3-m3",
        code: "M3",
        title: "Project challenge",
        description: "Real projects don't go to plan. Practice responding as a PM.",
        state: "locked",
        subtopics: [inputs(false), deliverable(false)],
      },
    ],
  },
]
