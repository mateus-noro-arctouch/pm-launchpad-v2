"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Copy, Rocket } from "lucide-react"

export function SetupForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [start, setStart] = useState("")
  const [link, setLink] = useState("")
  const [copied, setCopied] = useState(false)

  const canGenerate = name.trim().length > 0 && start.length > 0

  function generate() {
    const url = `${window.location.origin}/journey?name=${encodeURIComponent(name.trim())}&start=${encodeURIComponent(start)}`
    setLink(url)
    setCopied(false)
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {}
  }

  function startJourney() {
    const path = `/journey?name=${encodeURIComponent(name.trim())}&start=${encodeURIComponent(start)}`
    router.push(path)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">

        {/* Brand header */}
        <div className="mb-8 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-foreground">
            <Rocket className="size-7 text-brand" />
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">PM Launchpad</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Set up a new onboarding journey for a PM joining your team.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-line bg-card px-8 py-8 shadow-sm">
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-foreground" htmlFor="pm-name">
                New PM's name
              </label>
              <input
                id="pm-name"
                type="text"
                placeholder="e.g. Mateus"
                value={name}
                onChange={(e) => { setName(e.target.value); setLink("") }}
                className="w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-foreground" htmlFor="start-date">
                Start date
              </label>
              <input
                id="start-date"
                type="date"
                value={start}
                onChange={(e) => { setStart(e.target.value); setLink("") }}
                className="w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>

            <button
              type="button"
              disabled={!canGenerate}
              onClick={generate}
              className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40 hover:opacity-80"
            >
              Generate Launchpad
            </button>
          </div>

          {/* Generated link */}
          {link && (
            <div className="mt-6 border-t border-line pt-6 space-y-4">
              <div>
                <p className="mb-2 text-[13px] font-semibold text-foreground">Shareable link</p>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={link}
                    className="min-w-0 flex-1 rounded-lg border border-line bg-muted px-3.5 py-2.5 text-[12px] text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={copyLink}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-card px-3 py-2.5 text-[12px] font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    {copied ? <Check className="size-3.5 text-brand" /> : <Copy className="size-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  Share this link with the new PM. Both of you can use it to follow the journey — just open the same link anytime. Need to onboard another PM? Come back here and generate a new Launchpad.
                </p>
              </div>

              <button
                type="button"
                onClick={startJourney}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Rocket className="size-4" />
                Start journey
              </button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          Progress is saved per browser — the same link opens the same saved state.
        </p>
      </div>
    </div>
  )
}
