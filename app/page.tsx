import { redirect } from "next/navigation"

export default async function Home() {
  // Demo Modu: Ana sayfaya gelen herkesi direkt dashboard'a at
  redirect("/dashboard")
  
  // Kod buraya asla ulaşmaz
  return null
}
