import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { Check, TrendingUp, Zap, Shield, BarChart3 } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Logo & Back Link */}
          <Link href="/" className="mb-8 inline-flex items-center gap-3 transition-all hover:scale-105">
            <img src="/logo.png" alt="InsightFlow" className="h-12 w-auto drop-shadow-sm" />
            <span className="text-xl font-bold text-zinc-900">
              Insight<span className="text-blue-600">Flow</span>
            </span>
          </Link>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900">
              Welcome Back
            </h1>
            <p className="mt-2 text-base text-zinc-600">
              Your data is waiting for you. Continue your powerful analyses.
            </p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-600" />
              Secure
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-600" />
              SSL Protected
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Marketing Content */}
      <div className="hidden w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 lg:flex">
        <div className="flex flex-col justify-center px-12 py-12 text-white xl:px-16">
          <div className="max-w-lg">
            <h2 className="mb-6 text-4xl font-bold leading-tight">
              Keep Making Data-Driven Decisions
            </h2>
            <p className="mb-12 text-lg text-blue-100">
              Take your business to the next level with AI-powered analytics.
            </p>

            {/* Benefits */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Instant Analytics</h3>
                  <p className="text-sm text-blue-100">
                    Upload your data, get results instantly. In minutes, not hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">AI-Powered Insights</h3>
                  <p className="text-sm text-blue-100">
                    Discover hidden opportunities with AI-driven recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Trend Tracking</h3>
                  <p className="text-sm text-blue-100">
                    Track your business trends and stay ahead of the competition.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/20 pt-8">
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-blue-100">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold">500K+</div>
                <div className="text-sm text-blue-100">Analyses</div>
              </div>
              <div>
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm text-blue-100">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
