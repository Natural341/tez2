import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth"

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)
    return session?.user
  } catch (error) {
    console.error("Session retrieval error:", error)
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Oturum açmanız gerekiyor")
  }
  return user
}
