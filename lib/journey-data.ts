export type MilestoneState = "done" | "current" | "locked"

export interface Subtopic {
  type: "inputs" | "deliverable" | "buddy"
  label: string
  checked: boolean
}

export interface Scenario {
  id: string
  text: string
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
  scenarios?: Scenario[]
  complementary?: string[]
}

export interface Week {
  id: string
  label: string
  theme: string
  description: string
  mondayReentry?: string
  reflection?: string
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
    description:
      "This week is about getting settled. Your focus is the corporate onboarding — meeting the team, setting up your tools, and understanding the company. No project deliverables yet. The week ends with a kickoff moment that launches your PM study case and gets you ready for Week 2.",
    reflection:
      "What stood out this week? What questions do you have about the company, the team, or the project? Bring these to your first buddy 1:1.",
    done: 5,
    total: 5,
    milestones: [
      {
        id: "w1-m1",
        code: "M1",
        title: "Corporate onboarding",
        description:
          "Your personal HR onboarding is your priority this week. Complete all mandatory steps, sign documents, join the right channels, and attend the scheduled sessions.",
        state: "done",
        subtopics: [inputs(true)],
        inputs: ["Your personal HR onboarding page (generated per hire by the HR team)"],
      },
      {
        id: "w1-m2",
        code: "M2",
        title: "Tool setup & hours logging",
        description:
          "Getting your tools up and running early avoids blockers in Week 2. You need access to the PM toolset and a basic understanding of how hours are logged.",
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
        description:
          "Building relationships early is one of the most valuable things you can do in your first week. Knowing who's who and how the org is structured will help you navigate everything that follows.",
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
        description:
          "Understanding where you fit in the company, how the career path works, and how ArcTouch operates gives you context that makes every future interaction more meaningful.",
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
          "Congratulations on completing your first week. Starting Monday, you'll work on a practical PM study case using a real ArcTouch project — Lonely Planet — as your canvas. Over the next two weeks you'll practice the full PM lifecycle: from sales handoff to user story mapping. By the end you'll be ready to jump into a real client project with confidence.",
        state: "done",
        fridayDrop: true,
        inputs: [
          "Lonely Planet SOW (Statement of Work)",
          "Notion: 'Understanding the Scope of Work'",
          "Notion: 'How projects start at ArcTouch'",
        ],
        tip: "Pick your growth focus: choose the PM area(s) you'd most like to strengthen — client-facing situations · organizing product artifacts · product craft · delivery & process. Exercises that build your choice get tagged along the way. Simple, private, just for you — not a test.",
      },
    ],
  },
  {
    id: "week-2",
    label: "Week 2",
    theme: "Case Begins",
    description:
      "This week you dive into the project. You'll set up the project's home base, practice the first two client-facing moments, and start exploring the product to build your discovery and story map foundation. Everything you produce this week lives on your Project Page.",
    mondayReentry:
      "Last week you got set up, met the team, and read the Lonely Planet SOW. Now the project gets real. Here's what this week looks like.",
    reflection:
      "What did you learn from the handoff and kickoff that surprised you? What do you now understand about Lonely Planet's users that changes how you'd approach the story map? Bring these to your buddy 1:1.",
    done: 2,
    total: 7,
    milestones: [
      {
        id: "w2-m1",
        code: "M1",
        title: "Project Page",
        description:
          "The project page is the single source of truth for everything related to the project — meetings, team info, links, context, and all your deliverables. Creating it first is a mandatory habit.",
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
        description:
          "The sales handoff is where you take ownership of the project from the sales team. Knowing what to ask and how to capture the right information sets the foundation for everything that follows.",
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
        description:
          "The kickoffs — internal and client-facing — are where you align the team and set expectations. Preparing a solid deck and running the meeting with confidence is one of the most visible things a PM does early in a project.",
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
        description:
          "Great work this week. Before you start the story map in Week 3, you need to understand who Lonely Planet's users are and what the team already knows about them. This material gives you the real discovery context — not assumptions.",
        state: "locked",
        fridayDrop: true,
        inputs: [
          "Lonely Planet Figma — personas [PLACEHOLDER: link]",
          "Target audience research and studies",
          "User pain points prioritized against app features (output of a real discovery session)",
        ],
        tip: "Read and digest this material over the end of the week. You don't need to produce anything yet — just understand it. Week 3 starts with this context in hand.",
        complementary: [
          "Start using Jira and Mavenlink on the project",
          "AI for PMs — sessions 0–1 (light read)",
        ],
      },
    ],
  },
  {
    id: "week-3",
    label: "Week 3",
    theme: "Build",
    description:
      "This week you close out the core deliverables and practice handling real project situations. You come in already warmed up from the discovery material delivered at the end of Week 2. Start the week with the status report, finish the story map mid-week, and end by working through a project challenge scenario. The sprint rituals, metrics, and delivery concepts are covered through reading and observation in your shadowing sessions — not through additional deliverables.",
    mondayReentry:
      "Last week you ran the handoff and kickoff, and over the weekend you digested the Lonely Planet discovery material. You're warmed up. This week you turn that context into real deliverables.",
    reflection:
      "Look back across the three weeks. What clicked? What still feels uncertain and is worth a follow-up with your buddy? You're ready to jump into a real project — bring any open questions to your next 1:1.",
    done: 0,
    total: 7,
    milestones: [
      {
        id: "w3-m1",
        code: "M1",
        title: "Status report",
        description:
          "Writing a status report at the start of the week trains you to communicate where the project stands before a big milestone. It's one of the most frequent and important PM communication tools.",
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
        description:
          "The USM is the backbone of how ArcTouch structures and scopes projects. Presenting it to your buddy is the capstone practice moment of the onboarding. You enter this milestone already familiar with the Lonely Planet users from the discovery material.",
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
        description:
          "Real projects never go exactly to plan. This milestone puts you in a realistic situation and asks you to respond the way a PM would: with a clear action plan and a concise message to the team.",
        state: "locked",
        subtopics: [inputs(false), deliverable(false)],
        inputs: [
          "Sprint prep and execution",
          "Daily / planning / review / retro facilitation",
          "Jira reports — burndown chart, velocity",
          "Low-velocity and WIP management",
          "Budget/EAC, margin, invoicing basics",
        ],
        tip: "Assess the situation, structure an action plan, and write a clear message to send on the management channel (your buddy, in this case). Be direct and solution-oriented.",
        scenarios: [
          {
            id: "A",
            text: "A developer on your team needs to take 3 days off unexpectedly. You're mid-sprint and at risk of missing the sprint goal.",
          },
          {
            id: "B",
            text: "Your burndown chart is flat for the last 4 days. The team is busy but nothing is being completed.",
          },
          {
            id: "C",
            text: "You realize the project is burning budget faster than planned and the current pace puts you at risk of going over before the final sprint.",
          },
        ],
      },
    ],
  },
]
