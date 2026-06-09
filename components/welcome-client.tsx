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

function LaunchScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-foreground">
      <div aria-hidden className="lp-stars pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,131,0,0.25), transparent 70%)",
        }}
      />

      {/* Rising rocket */}
      <div
        aria-hidden
        className="lp-rocket-launch absolute left-1/2 flex flex-col items-center"
      >
        <Rocket className="size-9 -rotate-45 text-brand drop-shadow-[0_0_12px_rgba(255,131,0,0.6)]" />
        <span className="lp-flame -mt-1 h-5 w-1.5 rounded-full bg-gradient-to-b from-brand via-amber-300 to-transparent" />
      </div>

      {/* Liftoff glow at the pad */}
      <span
        aria-hidden
        className="lp-liftoff-glow absolute bottom-[10%] left-1/2 size-10 rounded-full bg-brand/60 blur-md"
      />

      {/* Launch pad */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-6">
        <span className="h-6 w-px bg-white/25" />
        <span className="-mt-px h-1.5 w-16 rounded-full bg-white/40" />
        <span className="mt-1 h-1 w-28 rounded-full bg-white/15" />
      </div>

      <p className="absolute inset-x-0 bottom-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
        Cleared for launch
      </p>
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
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[7fr_3fr]">
          {/* Content — 70% */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
              <Rocket className="size-3.5" />
              Mission Briefing
            </span>

            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Welcome aboard, {name}.
            </h1>
            <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
              Over the next three weeks you won't just read about being a PM at ArcTouch — you'll
              <span className="font-semibold text-foreground"> live a real project from day one</span>,
              with a buddy beside you the whole way. This page is your pre-flight briefing. Read it
              once, then start your ascent.
            </p>

            {/* Mobile launch scene */}
            <div className="mt-8 h-44 lg:hidden">
              <LaunchScene />
            </div>

            <div className="mt-10 space-y-9">
              <section>
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  What is the PM Launchpad?
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  The Launchpad is your single source of truth for becoming a Product Manager at
                  ArcTouch. Instead of scattered docs and "figure it out as you go," it gives you one
                  guided path: a clear set of milestones, the exact materials to read, and concrete
                  things to produce — week by week. By the end, you'll have done the real work of a
                  PM at least once, in a safe environment, before it ever counts on a live account.
                </p>
              </section>

              <section>
                <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                  <Compass className="size-4 text-brand" />
                  What you'll actually do
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  You'll run a hands-on study case built on <span className="font-semibold text-foreground">Lonely Planet</span>,
                  a real ArcTouch project. You start the moment the first SOW is signed and move all
                  the way to the first release — exactly as if you'd just been handed the account.
                  You'll take the sales handoff, run the kickoffs, build the discovery and story map,
                  and produce the artifacts a PM owns. Then you'll hit real project challenges: read
                  the scenario, understand what's at stake, and design the action plan.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  It's simulated — but nothing about the work is fake. The deliverables are real, the
                  decisions are real, and the feedback is real.
                </p>
              </section>

              <section>
                <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                  <Users className="size-4 text-brand" />
                  You're not doing this alone
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  A peer buddy is with you the entire journey. Lean on them for any question, big or
                  small. Beyond your regular 1:1s, the Launchpad will nudge you to set up working
                  sessions with them — presentations and mock meetings that mirror what a PM really
                  faces day to day. You'll present, they'll play the room, and you'll get the kind of
                  candid feedback that actually builds confidence.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold tracking-tight text-foreground">The three-week arc</h2>
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
                  Starting a new PM role is exciting — and a little daunting. The Launchpad exists so
                  that on the day you join your first real project, you've already been through the
                  motions: you've run the handoff, faced the client moment, made the call under
                  ambiguity. That's the whole point of the name. By the time you reach the end, you
                  shouldn't just <em>know</em> how a PM works at ArcTouch — you should feel ready to be
                  launched.
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
          </div>

          {/* Animation — 30%, desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-10 h-[calc(100vh-5rem)] min-h-[480px]">
              <LaunchScene />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
