import { Suspense } from "react"
import { WelcomeClient } from "@/components/welcome-client"

export default function WelcomePage() {
  return (
    <Suspense>
      <WelcomeClient />
    </Suspense>
  )
}
