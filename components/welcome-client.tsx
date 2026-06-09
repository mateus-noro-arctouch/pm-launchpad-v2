"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Rocket, Users, Compass, Target, ArrowRight } from "lucide-react"

function welcomeKey(name: string, start: string) {
  return `pm-launchpad-welcomed-${encodeURIComponent(name)}-${encodeURIComponent(start)}`
}

const weeks = [
  {
    label: "Week 1",
    theme: "Corporate & Foundations",
    copy: "Merge with your corporate onboarding — meet the team, set up your tools, learn how ArcTouch works. The week ends with the kickoff that hands you your study case.",
  },
  {
    label: "Week 2",
    theme: "Case Begins",
    copy: "The project gets real. Set up your project home base, then practice the first client-facing moments — the sales handoff and the kickoffs — with your buddy.",
  },
  {
    label: "Week 3",
    theme: "Build",
    copy: "Turn discovery into deliverables: a status report, a story map, and a project challenge where you read a real scenario and design the action plan.",
  },
]

function LaunchSidebar() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-foreground">
      {/* Stars */}
      <div aria-hidden className="lp-stars pointer-events-none absolute inset-0 opacity-60" />

      {/* Faint vertical track */}
      <span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-[5%] bottom-[16%] w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)" }}
      />

      {/* Rocket — takes 2 min to rise from pad to top */}
      <div
        aria-hidden
        className="lp-rocket-launch absolute left-1/2 flex flex-col items-center"
        style={{ transform: "translateX(-50%)" }}
      >
        <Rocket className="size-5 -rotate-45 text-brand drop-shadow-[0_0_8px_rgba(255,131,0,0.7)]" />
        <span
          aria-hidden
          className="lp-flame -mt-0.5 mx-auto h-3.5 w-1 rounded-full"
          style={{ background: "linear-gradient(to bottom, #FF8300, #fbbf24, transparent)" }}
        />
      </div>

      {/* Liftoff glow at pad */}
      <span
        aria-hidden
        className="lp-liftoff-glow absolute bottom-[13%] left-1/2 size-8 rounded-full blur-lg"
        style={{ background: "rgba(255,131,0,0.55)", transform: "translateX(-50%)" }}
      />

      {/* Launch pad structure */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-5">
        <span className="h-7 w-px bg-white/20" />
        <span className="h-1 w-10 rounded-full bg-white/50" />
        <span className="mt-0.5 h-0.5 w-14 rounded-full bg-white/20" />
        <span className="mt-0.5 h-px w-full bg-white/5" />
      </div>
    </div>
  )
}

export function WelcomeClient() {
  const params = useSearchParams()
  const router = useRouter()
  const name = params.get("name") ?? "PM"
  const start = params.get("start") ?? ""

  function enterJourney() {
    try {
      localStorage.setItem(welcomeKey(name, start), "1")
    } catch {}
    const qs = `name=${encodeURIComponent(name)}&start=${encodeURIComponent(start)}`
    router.push(`/journey?${qs}`)
  }

  return (
    <main className="flex min-h-screen">
      {/* Left sidebar — thin dark strip with rocket animation */}
      <aside className="hidden lg:flex w-20 shrink-0 flex-col">
        <div className="sticky top-0 h-screen">
          <LaunchSidebar />
        </div>
      </aside>

      {/* Right — content */}
      <div className="flex-1 px-8 py-12 sm:px-14 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
            <Rocket className="size-3.5" />
            Mission Briefing
          </span>

          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome aboard, {name}.
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
            Over the next three weeks you won't just read about being a PM at ArcTouch — you'll{" "}
            <span className="font-semibold text-foreground">
              live a real project from day one
            </span>
            , with a buddy beside you the whole way. This is your pre-flight briefing. Read it
            once, then start your ascent.
          </p>

          <div className="mt-10 space-y-9">
            <section>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                What is the PM Launchpad?
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                The Launchpad is your single source of truth for becoming a Product Manager at
                ArcTouch. Instead of scattered docs and "figure it out as you go," it gives you
                one guided path: a clear set of milestones, the exact materials to read, and
                concrete things to produce — week by week. By the end, you'll have done the real
                work of a PM at least once, in a safe environment, before it ever counts on a
                live account.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                <Compass className="size-4 text-brand" />
                What you'll actually do
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                You'll run a hands-on study case built on{" "}
                <span className="font-semibold text-foreground">Lonely Planet</span>, a real
                ArcTouch project. You start the moment the first SOW is signed and move all the
                way to the first release — exactly as if you'd just been handed the account.
                You'll take the sales handoff, run the kickoffs, build the discovery and story
                map, and produce the artifacts a PM owns. Then you'll hit real project challenges:
                read the scenario, understand what's at stake, and design the action plan.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                It's simulated — but nothing about the work is fake. The deliverables are real,
                the decisions are real, and the feedback is real.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                <Users className="size-4 text-brand" />
                You're not doing this alone
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                A peer buddy is with you the entire journey. Lean on them for any question, big
                or small. Beyond your regular 1:1s, the Launchpad will nudge you to set up
                working sessions together — presentations and mock meetings that mirror what a PM
                really faces day to day. You'll present, they'll play the room, and you'll get
                the kind of candid feedback that actually builds confidence.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                The three-week arc
              </h2>
              <div className="mt-4 space-y-3">
                {weeks.map((w, i) => (
                  <div
                    key={w.label}
                    className="flex gap-4 rounded-xl border border-line bg-card px-4 py-3.5"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-muted text-sm font-bold text-brand">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {w.label} · {w.theme}
                      </p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                        {w.copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-brand/20 bg-brand-muted/50 px-5 py-5">
              <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                <Target className="size-4 text-brand" />
                Why we built this
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                Starting a new PM role is exciting — and a little daunting. The Launchpad exists
                so that on the day you join your first real project, you've already been through
                the motions: you've run the handoff, faced the client moment, made the call under
                ambiguity. That's the whole point of the name. By the time you reach the end, you
                shouldn't just <em>know</em> how a PM works at ArcTouch — you should feel ready
                to be launched.
              </p>
            </section>
          </div>

          <button
            type="button"
            onClick={enterJourney}
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Enter your journey
            <ArrowRight className="size-4" />
          </button>

          <p className="mt-6 text-xs text-muted-foreground">
            You can come back to this page anytime via the Mission Briefing link in the header.
          </p>
        </div>
      </div>
    </main>
  )
}
