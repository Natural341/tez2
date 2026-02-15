import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"
import { Check, Sparkles, TrendingUp, Zap, Shield, Upload, Brain } from "lucide-react"

export default function RegisterPage() {
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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Sparkles className="h-3 w-3" />
              14 Days Free
            </div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Create Free Account
            </h1>
            <p className="mt-2 text-base text-zinc-600">
              Get started now, no credit card required. Access powerful analytics in minutes.
            </p>
          </div>

          {/* Form */}
          <RegisterForm />

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-600" />
              No Credit Card
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-600" />
              SSL Protected
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-600" />
              Cancel Anytime
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Marketing Content */}
      <div className="hidden w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 lg:flex">
        <div className="flex flex-col justify-center px-12 py-12 text-white xl:px-16">
          <div className="max-w-lg">
            <h2 className="mb-6 text-4xl font-bold leading-tight">
              Professional Analytics in Minutes
            </h2>
            <p className="mb-12 text-lg text-blue-100">
              No technical knowledge required. Drag and drop your data, AI handles the rest.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Easy Data Upload</h3>
                  <p className="text-sm text-blue-100">
                    Upload your CSV and Excel files with drag and drop in seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">AI-Powered Recommendations</h3>
                  <p className="text-sm text-blue-100">
                    AI automatically analyzes your data and provides insights.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Visual Reports</h3>
                  <p className="text-sm text-blue-100">
                    Visualize your data with interactive charts and tables.
                  </p>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="mt-12 rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold">Included in your 14-day trial:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Unlimited datasets and analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-sm">AI-powered insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Advanced visualizations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Priority support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
