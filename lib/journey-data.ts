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

export interface InputLink {
  label: string
  url?: string
}

export interface Milestone {
  id: string
  code: string
  title: string
  description: string
  state: MilestoneState
  fridayDrop?: boolean
  subtopics?: Subtopic[]
  inputs?: InputLink[]
  tip?: string
  scenarios?: Scenario[]
  complementary?: InputLink[]
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
  label: "Read through the material for this milestone",
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
        inputs: [
          { label: "Your personal HR onboarding page (generated per hire — shared by HR on day 1)" },
        ],
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
          { label: "Request access to the PM toolset from IT", url: "https://www.notion.so/35adb8adf61181a383b1d3986a0fc0c8" },
          { label: "Mavenlink — Introduction", url: "https://www.notion.so/cb94427b705b46158ed43ad5af04ff75" },
          { label: "Mavenlink — Creating/Updating a New Project", url: "https://www.notion.so/dbfc780610f14006a9ff1b9be93b2ca4" },
          { label: "Mavenlink — Project and Timesheets Maintenance", url: "https://www.notion.so/88140b345e9c475a9bfcbf57c1a25980" },
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
          { label: "Review our Organization Chart on Lattice", url: "https://www.notion.so/35adb8adf6118118afe2d744daffb3dd" },
          { label: "Meet your Peer Buddy", url: "https://www.notion.so/35adb8adf6118196941bee71d1393485" },
          { label: "Schedule 1:1s with Managers", url: "https://www.notion.so/35adb8adf611817a8277f10a4309c251" },
          { label: "Company meeting — September 2025 (important org changes and new roles)", url: "https://app.notion.com/p/arctouch/Company-Meetings-f39a87f35f5f4695a73a01114c1334ab" },
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
          { label: "Important Company Documentation", url: "https://www.notion.so/35adb8adf61181aa82d0e17cfe91bc9c" },
          { label: "Career Path", url: "https://www.notion.so/35adb8adf611816c8edbee7659e9785c" },
          { label: "Self-Assessment Tools", url: "https://www.notion.so/35adb8adf61181d098f9f209c3640887" },
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
          { label: "Lonely Planet — Project files (Box)", url: "https://arctouch.app.box.com/folder/40486030792" },
          { label: "Understanding the Scope of Work", url: "https://www.notion.so/a1554889d62045b4ad6b58767a8d7297" },
          { label: "ArcTouch Process overview", url: "https://www.notion.so/74d795359704485499d4cf7cf3df762b" },
          { label: "Practical onboarding context", url: "https://www.notion.so/35adb8adf61181bf94d0cf1a8d639d4e" },
        ],
        tip: "Pick your growth focus: choose the PM area(s) you'd most like to strengthen — client-facing situations · organizing product artifacts · product craft · delivery & process. Exercises that build your choice get tagged along the way. Simple, private, just for you — not a test. Then read the SOW and jot down your questions. That's all for this week.",
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
        subtopics: [
          inputs(true),
          { type: "deliverable", label: "Create your Project Page in Notion (mirror the portfolio template)", checked: true },
        ],
        inputs: [
          { label: "Initial project activities", url: "https://www.notion.so/35adb8adf611817fba1fccbcb6b0c944" },
          { label: "Project communication & organization", url: "https://www.notion.so/35adb8adf61181dba528e7b3c49493f9" },
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
        subtopics: [
          inputs(false),
          { type: "deliverable", label: "File your handoff questions on the Project Page (Meetings tab)", checked: false },
          { type: "buddy", label: "Run the sales handoff meeting with your buddy", checked: false },
        ],
        inputs: [
          { label: "Sales handoff meeting — what the PM should do", url: "https://www.notion.so/80af79060df0439e904c825e24499631" },
          { label: "ArcTouch Process — Sales Handoff", url: "https://www.notion.so/9ba523d45a1747359ed71e5ec3077727" },
          { label: "Understanding the Scope of Work", url: "https://www.notion.so/a1554889d62045b4ad6b58767a8d7297" },
        ],
        tip: "Read the material, then turn your Week 1 questions and the gaps you noticed on the Project Page into your handoff questions. Use those to run the session with your buddy.",
      },
      {
        id: "w2-m3",
        code: "M3",
        title: "Kickoffs",
        description:
          "The kickoffs — internal and client-facing — are where you align the team and set expectations. Preparing a solid deck and running the meeting with confidence is one of the most visible things a PM does early in a project.",
        state: "locked",
        subtopics: [
          inputs(false),
          { type: "deliverable", label: "Submit your kickoff deck and file it on the Project Page", checked: false },
          { type: "buddy", label: "Present the client kickoff to your buddy", checked: false },
        ],
        inputs: [
          { label: "Kicking Off Projects — overview card", url: "https://www.notion.so/35adb8adf611814cb4f5e4bf4e3af429" },
          { label: "Internal Kick-off", url: "https://www.notion.so/5cf97610fe83499697d759c17d42d76a" },
          { label: "Client Kick-off", url: "https://www.notion.so/75f2d65cba3841de86fafc8f5e50e462" },
        ],
        tip: "Read the material, then build your kickoff deck using the template. Use what you learned in the handoff session to fill in the project context. Run the client kickoff with your buddy.",
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
          { label: "Strategy (Discovery) — ArcTouch Process", url: "https://www.notion.so/5d7128edbc644933b36dfcb9cf2ef756" },
          { label: "Product Discovery Guide for PMs", url: "https://www.notion.so/2b7db8adf61180679a43e26e252bc5da" },
          { label: "Lonely Planet — Figma team (personas, research, pain points)", url: "https://www.figma.com/files/1324018082588945788/team/1508821500807554926?fuid=1010227290774979230" },
        ],
        tip: "Read and digest this material over the end of the week. You don't need to produce anything yet — just understand it. Week 3 starts with this context in hand.",
        complementary: [
          { label: "AI for PMs — Workshop Series (Sessions 0–1)", url: "https://www.notion.so/f445ae4ff8804087b5cf44211e127dae" },
          { label: "ArcTouch AI Academy", url: "https://www.notion.so/321db8adf611811fa7adee37666d1844" },
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
        subtopics: [
          inputs(false),
          { type: "deliverable", label: "Send the one-page status report to your buddy and file it on the Project Page", checked: false },
        ],
        inputs: [
          { label: "Writing Effective Project Status Reports", url: "https://www.notion.so/26c1f443c4ea49399ba1a421af02d05b" },
          { label: "Create project Slack channels — management channel usage", url: "https://www.notion.so/2aedb8adf611809fa9f3ee588fbec245" },
          { label: "One-page status report template (Figma)", url: "https://www.figma.com/design/wLCAT3wjRzWvFVkJKPE7Eb/Template---One-page-report" },
          { label: "Budget Tracking", url: "https://www.notion.so/1fd4312c09b14d3bb9283d68cb5bf9da" },
          { label: "Billing types, EAC, and Margin concepts", url: "https://www.notion.so/ecc18b28b1f344f6a906456f193a2491" },
          { label: "How Finances Work in ArcTouch Projects", url: "https://www.notion.so/c6e8c74ce4f7442c9f04e2afd05a3284" },
          { label: "Monthly invoicing process", url: "https://www.notion.so/9ac9f3f1ae734982811c5e749b621848" },
        ],
        tip: "A status report is not just a task list — it's a financial and delivery signal. Read the finance docs to understand EAC, margin, and invoicing before writing. Then fill in the template and send it to your buddy.",
      },
      {
        id: "w3-m2",
        code: "M2",
        title: "User Story Map & MVP",
        description:
          "The USM is the backbone of how ArcTouch structures and scopes projects. Presenting it to your buddy is the capstone practice moment of the onboarding. You enter this milestone already familiar with the Lonely Planet users from the discovery material.",
        state: "locked",
        subtopics: [
          inputs(false),
          { type: "deliverable", label: "Submit your USM + MVP prioritization in Figma and file it on the Project Page", checked: false },
          { type: "buddy", label: "Present the USM to your buddy — walk through scope decisions and trade-offs", checked: false },
        ],
        inputs: [
          { label: "User Story Mapping — what it is, why we use it, step-by-step", url: "https://www.notion.so/1e0db8adf6118004aa61c709d730f776" },
          { label: "ArcTouch Process — Running a Project", url: "https://www.notion.so/35adb8adf61181c3ba41de594fefbb86" },
          { label: "Backlog Refinement Process", url: "https://www.notion.so/e89d628c1bb34e34b34a1304fbc08d9f" },
          { label: "Calculating Sprint Capacity", url: "https://www.notion.so/6dca26a43d8346329f4109aa2a85c61d" },
          { label: "Lonely Planet — Figma team (personas + pain points from Week 2)", url: "https://www.figma.com/files/1324018082588945788/team/1508821500807554926?fuid=1010227290774979230" },
          { label: "Resources Allocation Plan (staffing context)", url: "https://www.notion.so/f75ff8938785431291db005b95e2be46" },
        ],
        tip: "Use the discovery context to build your story map in Figma. Prioritize the MVP. Then present the full USM to your buddy, walking through your scope decisions and trade-offs.",
      },
      {
        id: "w3-m3",
        code: "M3",
        title: "Project challenge",
        description:
          "Real projects don't go exactly to plan. This milestone simulates real-world pressure: you'll pick one of three realistic scenarios — unexpected team changes, delivery blockers, or budget risk — and respond the way a PM does. You assess what's happening, structure a plan, and communicate it clearly to the right stakeholders. The goal is to practice staying calm, direct, and solution-oriented under pressure.",
        state: "locked",
        subtopics: [
          inputs(false),
          { type: "deliverable", label: "File your action plan + management channel message on the Project Page", checked: false },
        ],
        inputs: [
          { label: "ArcTouch Process — Implementation (sprint prep & execution)", url: "https://www.notion.so/dd8b0549c9bd4fa6a5a0386c1d202631" },
          { label: "Facilitating Effective Daily Meetings", url: "https://www.notion.so/1857fe74bfeb484faf3dd7d4305e8e74" },
          { label: "Facilitating Effective Sprint Plannings", url: "https://www.notion.so/b8f3daade0734fba8b56264e178e3a58" },
          { label: "Facilitating Effective Sprint Reviews / Demo meetings", url: "https://www.notion.so/b8409d19e5524553935aff80079428ec" },
          { label: "Facilitating Effective Sprint Retrospectives", url: "https://www.notion.so/ae782a9bfd6b4bac9ac85a4a4cebcd98" },
          { label: "Jira Guide — reports (burndown, velocity, flow)", url: "https://www.notion.so/2a0db8adf61180dfbc34e8a849a877d6" },
        ],
        tip: "Your management channel message should follow this structure — (1) Situation: what happened, what's at risk and why it matters. (2) Plan: what you're doing about it, in concrete steps. (3) Who you need: name the stakeholders you're pulling in and what you need from them. (4) Ask or signal: are you requesting a decision, asking for approval, or just keeping everyone informed? Keep it under 150 words. Direct, no drama, solution-first.",
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
        complementary: [
          { label: "AI for PMs — Workshop Series (continued)", url: "https://www.notion.so/f445ae4ff8804087b5cf44211e127dae" },
          { label: "ArcTouch AI Academy", url: "https://www.notion.so/321db8adf611811fa7adee37666d1844" },
          { label: "Wrapping up projects", url: "https://www.notion.so/35adb8adf611814b9508eb2e59e9aa32" },
        ],
      },
    ],
  },
]
