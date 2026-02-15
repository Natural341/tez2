"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  Database,
  Sparkles,
  TrendingUp,
  Upload,
  Zap,
  Check,
  ArrowRight,
  Activity,
  Brain,
  LineChart,
} from "lucide-react"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Modern */}
      <header className="fixed top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-md transition-all duration-300">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-4 transition-all hover:scale-105">
            <img src="/logo.png" alt="InsightFlow" className="h-14 w-auto drop-shadow-sm" />
            <span className="text-2xl font-bold text-zinc-900">
              Insight<span className="text-blue-600">Flow</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="group relative text-sm font-medium text-zinc-600 transition-all duration-200 hover:text-blue-600">
              <span>Features</span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="group relative text-sm font-medium text-zinc-600 transition-all duration-200 hover:text-blue-600">
              <span>Pricing</span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#demo" className="group relative text-sm font-medium text-zinc-600 transition-all duration-200 hover:text-blue-600">
              <span>Demo</span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-medium transition-all duration-200 hover:scale-105">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-sm font-medium shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/40">
                Try Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Clean & Professional */}
      <section className="bg-gradient-to-b from-white to-zinc-50/50 pt-24 pb-16 transition-all lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-700 shadow-sm">
              <Sparkles className="h-3 w-3" />
              AI-Powered Analytics
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-5xl font-bold leading-tight text-zinc-900 sm:text-6xl lg:text-7xl">
              Turn Data Into
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Powerful Insights</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-zinc-600">
              Unlock the power of <span className="font-semibold text-zinc-700">AI-driven analytics</span> to make smarter decisions, faster.
              <br />
              Upload, analyze, and visualize your data in minutes - no technical expertise required.
            </p>

            {/* CTA Buttons */}
            <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30">
                  Start Free 14-Day Trial
                </Button>
              </Link>
              <a href="#demo">
                <Button size="lg" variant="outline" className="transition-all hover:shadow-md">
                  Watch Demo
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" /> No credit card required
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" /> 14 days free
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" /> Cancel anytime
              </span>
            </div>
          </div>

          {/* Dashboard Preview - Modern */}
          <div className="mx-auto mt-16 max-w-6xl lg:mt-20">
            <div className="group relative">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 animate-pulse rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-30"></div>

              <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white shadow-2xl shadow-zinc-900/10 transition-all duration-300">
                {/* Browser Bar - Modern */}
                <div className="flex items-center gap-3 border-b border-zinc-200/80 bg-gradient-to-r from-zinc-50 to-zinc-100 px-5 py-3.5">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-sm transition-all hover:scale-110" />
                    <div className="h-3 w-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-sm transition-all hover:scale-110" />
                    <div className="h-3 w-3 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-sm transition-all hover:scale-110" />
                  </div>
                  <div className="ml-2 flex flex-1 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 rounded-lg bg-white/60 px-3 py-1.5">
                      <div className="h-3 w-3 text-zinc-400">🔒</div>
                      <div className="h-2 flex-1 rounded-full bg-zinc-200" style={{maxWidth: '200px'}} />
                    </div>
                  </div>
                </div>

                {/* Dashboard Content - Modern */}
                <div className="bg-gradient-to-br from-zinc-50 via-white to-blue-50/20 p-8">
                  {/* Top Stats - Modern Cards */}
                  <div className="mb-6 grid gap-4 sm:grid-cols-4">
                    <div className="group/card relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-gradient-to-br from-white to-zinc-50 p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-600/5 blur-2xl transition-all group-hover/card:bg-blue-600/10"></div>
                      <div className="relative">
                        <div className="mb-3 inline-flex rounded-xl bg-blue-600/10 p-2.5">
                          <Database className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-zinc-900">2,547</div>
                        <div className="text-xs font-medium text-zinc-600">Datasets</div>
                      </div>
                    </div>

                    <div className="group/card relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-gradient-to-br from-white to-zinc-50 p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-600/5 blur-2xl transition-all group-hover/card:bg-purple-600/10"></div>
                      <div className="relative">
                        <div className="mb-3 inline-flex rounded-xl bg-purple-600/10 p-2.5">
                          <Activity className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold text-zinc-900">15.2K</div>
                        <div className="text-xs font-medium text-zinc-600">Analysis</div>
                      </div>
                    </div>

                    <div className="group/card relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-gradient-to-br from-white to-zinc-50 p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-600/5 blur-2xl transition-all group-hover/card:bg-indigo-600/10"></div>
                      <div className="relative">
                        <div className="mb-3 inline-flex rounded-xl bg-indigo-600/10 p-2.5">
                          <Brain className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="text-2xl font-bold text-zinc-900">1,234</div>
                        <div className="text-xs font-medium text-zinc-600">AI Insights</div>
                      </div>
                    </div>

                    <div className="group/card relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50 to-white p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-green-600/5 blur-2xl transition-all group-hover/card:bg-green-600/10"></div>
                      <div className="relative">
                        <div className="mb-3 inline-flex rounded-xl bg-green-600/10 p-2.5">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-green-600">+23%</div>
                        <div className="text-xs font-medium text-zinc-600">Growth</div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid gap-4 lg:grid-cols-3">
                    {/* Chart - Modern */}
                    <div className="rounded-2xl border border-zinc-200/60 bg-gradient-to-br from-white to-zinc-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md lg:col-span-2">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-zinc-900">Performance Analysis</h3>
                          <p className="text-xs text-zinc-500">Real-time data stream</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></div>
                          <span className="text-xs font-medium text-blue-700">Live</span>
                        </div>
                      </div>
                      <div className="relative flex h-40 items-end justify-between gap-1.5">
                        {[45, 52, 48, 65, 58, 72, 68, 75, 71, 82, 78, 88, 85, 92, 89, 95].map((height, i) => (
                          <div key={i} className="group/bar relative flex-1">
                            <div
                              className="rounded-t-lg bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 shadow-sm transition-all duration-300 hover:from-blue-700 hover:via-blue-600 hover:to-blue-500"
                              style={{ height: `${height}%` }}
                            />
                            <div className="absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded bg-zinc-900 px-2 py-1 text-[10px] font-medium text-white group-hover/bar:block">
                              {height}%
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-3">
                        <span className="text-xs text-zinc-500">Last 30 days</span>
                        <span className="text-xs font-medium text-green-600">↑ 12.5%</span>
                      </div>
                    </div>

                    {/* Quick Stats - Modern */}
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-zinc-200/60 bg-gradient-to-br from-white to-blue-50/50 p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-zinc-600">Active Projects</span>
                          <LineChart className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-3xl font-bold text-zinc-900">24</div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5">
                            <ArrowRight className="h-3 w-3 rotate-[-45deg] text-green-600" />
                            <span className="text-xs font-medium text-green-700">+12%</span>
                          </div>
                          <span className="text-xs text-zinc-500">this month</span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-zinc-200/60 bg-gradient-to-br from-white to-purple-50/50 p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-zinc-600">Success Rate</span>
                          <Zap className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="text-3xl font-bold text-zinc-900">94.2%</div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100">
                          <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Table Preview - Modern */}
                  <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200/60 bg-white shadow-sm">
                    <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-zinc-900">Recent Analysis</h3>
                        <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
                          View All →
                        </button>
                      </div>
                    </div>
                    <div className="divide-y divide-zinc-100">
                      {[
                        { name: "Q4 Sales Analysis", status: "Completed", value: "$1.2M", trend: "+18%", color: "green" },
                        { name: "Customer Segmentation", status: "In Progress", value: "2,341", trend: "+5%", color: "blue" },
                        { name: "Financial Forecast", status: "Completed", value: "$890K", trend: "+12%", color: "green" },
                      ].map((row, i) => (
                        <div key={i} className="group/row grid grid-cols-4 gap-3 p-4 transition-colors hover:bg-zinc-50">
                          <div className="font-semibold text-zinc-900">{row.name}</div>
                          <div>
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                              row.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}>
                              <div className={`h-1.5 w-1.5 rounded-full ${row.status === "Completed" ? "bg-green-600" : "bg-blue-600 animate-pulse"}`}></div>
                              {row.status}
                            </span>
                          </div>
                          <div className="font-medium text-zinc-700">{row.value}</div>
                          <div className="text-right font-bold text-green-600">{row.trend}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Clean */}
      <section id="features" className="bg-zinc-50 py-16 transition-all lg:py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900 sm:text-4xl">
              Powerful Features
            </h2>
            <p className="text-zinc-600">
              Everything you need for professional data analysis
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-zinc-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Clean */}
      <section className="bg-white py-16 transition-all">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="transition-all">
                <div className="mb-2 text-4xl font-bold text-zinc-900">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Clean */}
      <section id="pricing" className="bg-zinc-50 py-16 transition-all lg:py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900 sm:text-4xl">
              Simple Pricing
            </h2>
            <p className="text-zinc-600">
              Try free for 14 days, then continue with affordable plans
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl border bg-white p-6 transition-all ${
                  plan.popular
                    ? "border-blue-200/60 shadow-xl shadow-blue-100/50"
                    : "border-zinc-200/60 shadow-sm hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="mb-4">
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="mb-2 text-xl font-bold text-zinc-900">
                  {plan.name}
                </h3>
                <p className="mb-4 text-sm text-zinc-600">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-zinc-900">
                    {plan.price}
                  </span>
                  {plan.price !== "Free" && plan.price !== "Custom" && (
                    <span className="text-zinc-500">/mo</span>
                  )}
                </div>

                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                      <span className="text-zinc-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/register">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern */}
      <section className="bg-white py-20 transition-all">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-200/60 bg-gradient-to-br from-zinc-50 to-white p-12 shadow-xl">
            <div className="text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                <Sparkles className="h-4 w-4" />
                Limited Time Offer
              </div>

              <h2 className="mb-4 text-4xl font-bold text-zinc-900 sm:text-5xl">
                <span className="text-blue-600">Start Today</span> and Transform Your Data
              </h2>

              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-zinc-600">
                Try <span className="font-semibold text-blue-600">all features free</span> for <span className="font-semibold text-blue-600">14 days</span>.
                <br />
                <span className="font-semibold text-blue-600">No credit card required</span>. Cancel anytime. Get instant access to powerful analytics.
              </p>

              <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-zinc-900 px-8 py-6 text-base font-semibold shadow-xl transition-colors hover:bg-blue-600">
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span><span className="font-semibold text-zinc-700">Free</span> 14-day trial</span>
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span><span className="font-semibold text-zinc-700">No</span> credit card needed</span>
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span><span className="font-semibold text-zinc-700">Cancel</span> anytime</span>
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span><span className="font-semibold text-zinc-700">Instant</span> access</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Modern */}
      <footer className="border-t border-zinc-200 bg-gradient-to-b from-white to-zinc-50 transition-all">
        <div className="container mx-auto px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Brand Column - Larger */}
            <div className="lg:col-span-2">
              <Link href="/" className="mb-6 inline-flex items-center gap-3 transition-all hover:scale-105">
                <img src="/logo.png" alt="InsightFlow" className="h-16 w-auto drop-shadow-lg" />
                <span className="text-2xl font-bold text-zinc-900">
                  Insight<span className="text-blue-600">Flow</span>
                </span>
              </Link>
              <p className="mb-6 max-w-sm text-base leading-relaxed text-zinc-600">
                Transform your business with <span className="font-semibold text-blue-600">AI-powered analytics</span>.
                Make data-driven decisions with confidence.
              </p>
              <div className="flex items-center gap-3">
                <Link href="/register">
                  <Button className="bg-blue-600 font-semibold shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="mb-4 text-base font-bold text-zinc-900">Product</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li><a href="#features" className="transition-colors hover:text-blue-600">Features</a></li>
                <li><a href="#pricing" className="transition-colors hover:text-blue-600">Pricing</a></li>
                <li><a href="#demo" className="transition-colors hover:text-blue-600">Demo</a></li>
                <li><a href="#" className="transition-colors hover:text-blue-600">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-base font-bold text-zinc-900">Company</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li><a href="#" className="transition-colors hover:text-blue-600">About</a></li>
                <li><a href="#" className="transition-colors hover:text-blue-600">Blog</a></li>
                <li><a href="#" className="transition-colors hover:text-blue-600">Careers</a></li>
                <li><a href="#" className="transition-colors hover:text-blue-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-base font-bold text-zinc-900">Legal</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li><a href="#" className="transition-colors hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="transition-colors hover:text-blue-600">Terms of Service</a></li>
                <li><a href="#" className="transition-colors hover:text-blue-600">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-zinc-200 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-zinc-500">
                © 2024 InsightFlow. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-zinc-400 transition-colors hover:text-blue-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-zinc-400 transition-colors hover:text-blue-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-zinc-400 transition-colors hover:text-blue-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: Upload,
    title: "Easy Data Upload",
    description: "Upload your CSV and Excel files in seconds with drag & drop",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description: "Descriptive statistics, correlation, regression, and more",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    description: "Automated insights and recommendations powered by AI",
  },
  {
    icon: TrendingUp,
    title: "Visualization",
    description: "Visualize your data with interactive charts and tables",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Organize all your datasets in one place",
  },
  {
    icon: Zap,
    title: "Fast & Secure",
    description: "Your data is safe, your analysis is fast",
  },
]

const stats = [
  { value: "10,000+", label: "Active Users" },
  { value: "500K+", label: "Analyses Completed" },
  { value: "1M+", label: "Datasets Processed" },
  { value: "99.9%", label: "Uptime" },
]

const pricingPlans = [
  {
    name: "Starter",
    description: "For individual users",
    price: "Free",
    popular: false,
    cta: "Start Free",
    features: [
      "5 datasets",
      "10 analyses/month",
      "Basic visualizations",
      "Email support",
    ],
  },
  {
    name: "Professional",
    description: "For small and medium businesses",
    price: "$29",
    popular: true,
    cta: "Try 14 Days Free",
    features: [
      "Unlimited datasets",
      "Unlimited analyses",
      "AI-powered insights",
      "Advanced visualizations",
      "Priority support",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    popular: false,
    cta: "Contact Sales",
    features: [
      "All Pro features",
      "Dedicated server",
      "Custom integrations",
      "Custom training",
      "24/7 support",
      "SLA guarantee",
    ],
  },
]
