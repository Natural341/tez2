import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { LandingPage } from "@/components/landing/landing-page"

export default async function Home() {
  const user = await getCurrentUser()

  if (user) {
    redirect("/dashboard")
  }

  return <LandingPage />
}
