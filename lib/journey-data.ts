export type MilestoneState = "done" | "current" | "locked"

export interface Milestone {
  id: string
  title: string
  description: string
  state: MilestoneState
  deliverable?: boolean
  buddySession?: boolean
  fridayDrop?: boolean
}

export interface Week {
  id: string
  label: string
  theme: string
  description: string
  milestones: Milestone[]
}

export const pmName = "Mateus"

export const journey: Week[] = [
  {
    id: "week-1",
    label: "Week 1",
    theme: "Corporate & Foundations",
    description: "Get settled, meet the team, and prepare for the project.",
    milestones: [
      {
        id: "w1-m1",
        title: "Corporate onboarding",
        description: "Your HR onboarding is the priority.",
        state: "done",
      },
      {
        id: "w1-m2",
        title: "Tool setup & hours logging",
        description: "Get your PM toolset running before Week 2.",
        state: "done",
      },
      {
        id: "w1-m3",
        title: "Meet the team & map the org",
        description: "Build relationships early — they compound.",
        state: "done",
      },
      {
        id: "w1-m4",
        title: "Company & role orientation",
        description: "Understand where you fit and how the career path works.",
        state: "done",
      },
      {
        id: "w1-m5",
        title: "Friday kickoff",
        description: "Your study case starts Monday. Here's what's coming.",
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
      "Dive into the Lonely Planet project: set up your base, run the first client-facing moments.",
    milestones: [
      {
        id: "w2-m1",
        title: "Project Page",
        description: "Single source of truth for everything on this project.",
        state: "done",
        deliverable: true,
      },
      {
        id: "w2-m2",
        title: "Sales handoff",
        description: "Take ownership from the sales team.",
        state: "current",
        deliverable: true,
        buddySession: true,
      },
      {
        id: "w2-m3",
        title: "Kickoffs",
        description: "Align the team and set expectations with the client.",
        state: "locked",
        deliverable: true,
        buddySession: true,
      },
      {
        id: "w2-m4",
        title: "Friday discovery drop",
        description: "Real discovery material drops here before Week 3.",
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
    milestones: [
      {
        id: "w3-m1",
        title: "Status report",
        description: "Communicate where the project stands before a big milestone.",
        state: "locked",
        deliverable: true,
      },
      {
        id: "w3-m2",
        title: "User Story Map & MVP",
        description: "The capstone — present your story map to your buddy.",
        state: "locked",
        deliverable: true,
        buddySession: true,
      },
      {
        id: "w3-m3",
        title: "Project challenge",
        description: "Real projects don't go to plan. Practice responding.",
        state: "locked",
        deliverable: true,
      },
    ],
  },
]
