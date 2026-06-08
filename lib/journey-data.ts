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
  inputs?: string[]
  tip?: string
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
        inputs: ["Your personal HR onboarding page (generated per hire by the HR team)"],
      },
      {
        id: "w1-m2",
        code: "M2",
        title: "Tool setup & hours logging",
        description: "Get your PM toolset running before Week 2.",
        state: "done",
        subtopics: [inputs(true)],
        inputs: [
          "IT PM-toolset access checklist",
          "Mavenlink intro — how hours logging works",
          "Jira access basics",
        ],
        tip: "By the end of this week your hours are automatically logged as idle on Mavenlink — understand what that means and how it works.",
      },
      {
        id: "w1-m3",
        code: "M3",
        title: "Meet the team & map the org",
        description: "Build relationships early — they compound.",
        state: "done",
        subtopics: [inputs(true)],
        inputs: [
          "Org chart — Lattice",
          "Team pages",
          "Company meeting recording [PLACEHOLDER: Sept/Oct 20XX — important org changes and new roles]",
        ],
        tip: "Schedule your 1:1s with your buddy, manager, and peers this week. The journey won't manage this for you — but do it now.",
      },
      {
        id: "w1-m4",
        code: "M4",
        title: "Company & role orientation",
        description: "Understand where you fit and how the career path works.",
        state: "done",
        subtopics: [inputs(true)],
        inputs: [
          "Important company docs",
          "Career path and leveling guide",
          "Self-assessment tools",
        ],
      },
      {
        id: "w1-m5",
        code: "M5",
        title: "Friday kickoff",
        description:
          "Your study case starts Monday. Here's what's coming and how to make the most of Week 2.",
        state: "done",
        fridayDrop: true,
        inputs: [
          "Lonely Planet SOW (Statement of Work)",
          "Notion: 'Understanding the Scope of Work'",
          "Notion: 'How projects start at ArcTouch'",
        ],
        tip: "Pick your growth focus: choose the PM area(s) you'd most like to strengthen — client-facing situations · organizing product artifacts · product craft · delivery & process. Exercises that build your choice get tagged along the way.",
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
        inputs: [
          "Product team project portfolio template",
          "Project context shared at the start of Week 2",
        ],
        tip: "Read the template, explore a few existing project pages in the portfolio to understand how they're structured, then create your own. Every deliverable from here on gets filed here.",
      },
      {
        id: "w2-m2",
        code: "M2",
        title: "Sales handoff",
        description: "Take ownership from the sales team.",
        state: "current",
        subtopics: [inputs(true), deliverable(false), buddy(false)],
        inputs: [
          "Notion: 'Sales handoff meeting' — what the PM should do, what to gather, how to prepare, after-meeting steps",
        ],
        tip: "Read the inputs, then turn your Week 1 questions and the gaps you noticed on the Project Page into your handoff questions. Use those to run the session with your buddy.",
      },
      {
        id: "w2-m3",
        code: "M3",
        title: "Kickoffs",
        description: "Align the team and set client expectations.",
        state: "locked",
        subtopics: [inputs(false), deliverable(false), buddy(false)],
        inputs: [
          "Notion: 'Internal Kick-off'",
          "Notion: 'Client Kick-off' — scope review, budget vs. timeline, project plan, kickoff deck preparation",
        ],
        tip: "Read the inputs, then build your kickoff deck using the template. Use what you learned in the handoff session to fill in the project context. Run the client kickoff with your buddy.",
      },
      {
        id: "w2-m4",
        code: "M4",
        title: "Friday discovery drop",
        description: "Real Lonely Planet discovery material drops here before Week 3.",
        state: "locked",
        fridayDrop: true,
        inputs: [
          "Lonely Planet Figma — personas",
          "Target audience research and studies",
          "User pain points prioritized against app features (output of a real discovery session)",
        ],
        tip: "Read and digest this material over the end of the week. You don't need to produce anything yet — just understand it. Week 3 starts with this context in hand.",
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
        inputs: [
          "Notion: 'Writing Effective Project Status Reports'",
          "One-page status report template (Figma)",
        ],
        tip: "Read the inputs, then write your status report for the Lonely Planet project based on where things stand. Keep it to one page. Send it to your buddy.",
      },
      {
        id: "w3-m2",
        code: "M2",
        title: "User Story Map & MVP",
        description: "The capstone — build and present your story map to your buddy.",
        state: "locked",
        subtopics: [inputs(false), deliverable(false), buddy(false)],
        inputs: [
          "Notion: 'User Story Mapping' — what it is, why we use it, step-by-step",
          "MVP/MLP prioritization guide",
          "Lonely Planet discovery Figma — personas and pain points (delivered at end of Week 2)",
        ],
        tip: "Use the discovery context to build your story map in Figma. Prioritize the MVP. Then present the full USM to your buddy, walking through your scope decisions and trade-offs.",
      },
      {
        id: "w3-m3",
        code: "M3",
        title: "Project challenge",
        description: "Real projects don't go to plan. Practice responding as a PM.",
        state: "locked",
        subtopics: [inputs(false), deliverable(false)],
        inputs: [
          "Sprint prep and execution",
          "Daily / planning / review / retro facilitation",
          "Jira reports — burndown chart, velocity",
          "Budget/EAC, margin, invoicing basics",
        ],
        tip: "Read the inputs to ground yourself in delivery concepts. Then pick one scenario: (A) A developer takes 3 days off mid-sprint. (B) Your burndown is flat for 4 days. (C) The project is burning budget faster than planned. Assess the situation, structure an action plan, and write a clear message to the management channel.",
      },
    ],
  },
]
