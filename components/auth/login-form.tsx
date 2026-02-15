"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Demo Modu: Her türlü girişi kabul et
    if (password.length >= 6) {
        router.push("/dashboard")
    } else {
        setError("Şifre en az 6 karakter olmalıdır")
        setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 text-base"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Password
          </label>
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Forgot Password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-12 text-base"
        />
      </div>

      <Button type="submit" className="h-12 w-full bg-blue-600 text-base font-semibold shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
            or
          </span>
        </div>
      </div>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
          Register for Free
        </Link>
      </p>
    </form>
  )
}
