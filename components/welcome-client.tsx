"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Rocket, Users, Compass, Target, ArrowRight } from "lucide-react"

function AstronautSVG() {
  return (
    <svg viewBox="0 0 100 148" width="108" height="160" fill="none" aria-hidden>
      {/* Helmet */}
      <ellipse cx="50" cy="30" rx="22" ry="24" fill="#e8eaed" />
      <ellipse cx="50" cy="30" rx="14" ry="16" fill="#1c2535" />
      <ellipse cx="44" cy="25" rx="5" ry="4" fill="white" opacity="0.16" />
      {/* Collar ring */}
      <rect x="34" y="51" width="32" height="6" rx="3" fill="#d0d2d6" />

      {/* Torso */}
      <rect x="28" y="57" width="44" height="43" rx="8" fill="#e2e4e8" />
      {/* Shoulder pads */}
      <rect x="21" y="57" width="14" height="12" rx="4" fill="#d2d4d8" />
      <rect x="65" y="57" width="14" height="12" rx="4" fill="#d2d4d8" />
      {/* Chest panel */}
      <rect x="36" y="64" width="28" height="20" rx="3" fill="#c8cacd" />
      <rect x="38" y="67" width="11" height="7" rx="2" fill="#FF8300" opacity="0.9" />
      <rect x="51" y="67" width="11" height="7" rx="2" fill="#3a7bd5" opacity="0.85" />
      <rect x="38" y="76" width="24" height="3" rx="1.5" fill="#aaa" opacity="0.4" />
      {/* Belt */}
      <rect x="28" y="97" width="44" height="5" rx="2.5" fill="#c8cace" />

      {/* Left arm — upper-left, independently animated */}
      <g className="lp-arm-l">
        <path d="M 32 64 C 22 61 13 56 7 51" stroke="#d8dadd" strokeWidth="13" strokeLinecap="round" />
        <circle cx="4" cy="49" r="8" fill="#FF8300" />
      </g>

      {/* Right arm — lower-right */}
      <g className="lp-arm-r">
        <path d="M 68 64 C 78 62 87 59 93 57" stroke="#d8dadd" strokeWidth="13" strokeLinecap="round" />
        <circle cx="96" cy="56" r="8" fill="#d0d2d6" />
      </g>

      {/* Left leg */}
      <g className="lp-leg-l">
        <path d="M 40 100 C 36 113 33 123 31 133" stroke="#d8dadd" strokeWidth="12" strokeLinecap="round" />
        <ellipse cx="30" cy="137" rx="9" ry="5" fill="#c0c2c6" />
      </g>

      {/* Right leg */}
      <g className="lp-leg-r">
        <path d="M 60 100 C 64 113 67 123 69 133" stroke="#d8dadd" strokeWidth="12" strokeLinecap="round" />
        <ellipse cx="70" cy="137" rx="9" ry="5" fill="#c0c2c6" />
      </g>

      {/* Tether from belt extending right, clipped by container */}
      <path
        d="M 72 100 C 88 96 105 91 130 87 C 160 83 190 80 230 77"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

function AstronautScene() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-foreground">
      {/* Stars */}
      <div aria-hidden className="lp-stars pointer-events-none absolute inset-0 opacity-80" />
      {/* Extra scattered stars */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(1px 1px at 10% 55%, rgba(255,255,255,0.55), transparent)",
            "radial-gradient(1px 1px at 80% 30%, rgba(255,255,255,0.5), transparent)",
            "radial-gradient(1.5px 1.5px at 35% 80%, rgba(255,255,255,0.4), transparent)",
            "radial-gradient(1px 1px at 88% 78%, rgba(255,255,255,0.45), transparent)",
            "radial-gradient(1px 1px at 20% 16%, rgba(255,255,255,0.6), transparent)",
            "radial-gradient(1px 1px at 60% 92%, rgba(255,255,255,0.3), transparent)",
            "radial-gradient(1px 1px at 6% 40%, rgba(255,255,255,0.4), transparent)",
            "radial-gradient(1px 1px at 52% 12%, rgba(255,255,255,0.5), transparent)",
            "radial-gradient(1px 1px at 94% 52%, rgba(255,255,255,0.35), transparent)",
            "radial-gradient(1px 1px at 44% 64%, rgba(255,255,255,0.3), transparent)",
          ].join(", "),
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Planet — upper right */}
      <div
        aria-hidden
        className="absolute right-3 top-[10%] size-16 rounded-full"
        style={{
          background: "radial-gradient(circle at 32% 32%, #2d4a7a 0%, #0c1828 100%)",
          opacity: 0.6,
          boxShadow: "0 0 18px rgba(45,74,122,0.35)",
        }}
      />
      {/* Planet ring */}
      <div
        aria-hidden
        className="absolute right-[-2px] top-[calc(10%+22px)] h-5 w-24 rounded-full"
        style={{
          border: "1.5px solid rgba(90,130,200,0.28)",
          transform: "scaleY(0.28) rotate(-4deg)",
        }}
      />

      {/* Small moon — lower left */}
      <div
        aria-hidden
        className="absolute left-3 bottom-[22%] size-6 rounded-full"
        style={{
          background: "radial-gradient(circle at 38% 38%, #888, #3a3a3a)",
          opacity: 0.38,
        }}
      />

      {/* Floating astronaut — centered, gently drifts and rotates */}
      <div
        aria-hidden
        className="lp-astronaut-float absolute left-1/2 top-[46%]"
        style={{ transform: "translate(-50%, -50%) rotate(-8deg)" }}
      >
        <AstronautSVG />
      </div>
    </div>
  )
}

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

      {/* Faint exhaust trail */}
      <span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-[5%] bottom-[24%] w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)" }}
      />

      {/* Liftoff glow — behind everything */}
      <span
        aria-hidden
        className="lp-liftoff-glow absolute bottom-[4%] left-1/2 size-16 rounded-full blur-xl"
        style={{ background: "rgba(255,131,0,0.45)", transform: "translateX(-50%)" }}
      />

      {/* Rocket — renders before launchpad so it sits behind it */}
      <div
        aria-hidden
        className="lp-rocket-launch absolute left-1/2 flex flex-col items-center"
        style={{ transform: "translateX(-50%)" }}
      >
        <RocketSVG />
        <span
          className="lp-flame -mt-1 mx-auto h-8 w-2.5 rounded-full"
          style={{ background: "linear-gradient(to bottom, #FF8300, #fbbf24 40%, transparent)" }}
        />
      </div>

      {/* SpaceX-style launch mount — renders last, sits in front of rocket */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 px-1 pb-1">
        <LaunchpadSVG />
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
      {/* Left sidebar — dark strip with rocket animation, always visible */}
      <aside className="flex w-48 shrink-0 flex-col sm:w-56">
        <div className="sticky top-0 h-screen">
          <AstronautScene />
        </div>
      </aside>

      {/* Right — content */}
      <div className="flex-1 px-6 py-12 sm:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
            <Rocket className="size-3.5" />
            Mission Briefing
          </span>

          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome aboard, {name}.
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
            Over the next three weeks you'll gain{" "}
            <span className="font-semibold text-foreground">
              hands-on experience by building a study case for a real ArcTouch project
            </span>
            , with a buddy beside you the whole way. Starting from Week 2, you'll dive into the
            work of a PM — step by step, in a safe environment. This is your pre-flight briefing.
            You can come back to it anytime via the Mission Briefing link in the header.
          </p>

          <div className="mt-10 space-y-9">
            <section>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                What is the PM Launchpad?
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                The Launchpad is a structured companion for your onboarding — a guided path that
                connects the materials you need to read with the milestones you need to hit, week
                by week. It doesn't replace the existing resources and documentation your managers
                have built; it helps you connect the dots between all of them and your journey as
                a new PM. By the end, you'll have done the real work of a PM at least once, in a
                safe environment, before jumping into your first project.
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
                Not every ArcTouch project starts from scratch — sometimes you'll jump in halfway
                through, play a supporting role, or inherit someone else's setup. That's normal.
                The Launchpad isn't trying to cover every possible scenario. It gives you a
                practical case to get familiar with the processes, practice the key moments with
                your buddy, and build real hands-on experience before stepping into any reality.
                You'll keep learning a lot after this — but when your manager assigns you to your
                first project, you'll feel confident walking in.
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
