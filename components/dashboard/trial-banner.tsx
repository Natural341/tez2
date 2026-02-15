"use client"

import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TrialBannerProps {
  trialEndsAt?: Date | null
  isPremium: boolean
}

export function TrialBanner({ trialEndsAt, isPremium }: TrialBannerProps) {
  if (isPremium) return null
  if (!trialEndsAt) return null

  const now = new Date()
  const daysLeft = Math.ceil((new Date(trialEndsAt).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (daysLeft < 0) {
    return (
      <div className="border-b border-red-200 bg-gradient-to-r from-red-50 to-red-100 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-semibold text-red-900">
              Your trial has expired. Upgrade to Premium to enjoy all features.
            </span>
          </div>
          <Link href="/pricing">
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Upgrade to Premium
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (daysLeft <= 3) {
    return (
      <div className="border-b border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-900">
              Your trial expires in {daysLeft} days. Upgrade to Premium!
            </span>
          </div>
          <Link href="/pricing">
            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
              Upgrade to Premium
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="border-b border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-sm font-medium text-blue-900">
          🎉 Your trial is active - {daysLeft} days left
        </span>
        <Link href="/pricing">
          <Button size="sm" variant="ghost" className="text-blue-700 hover:bg-blue-200">
            Upgrade to Premium
          </Button>
        </Link>
      </div>
    </div>
  )
}
