"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface GenerateInsightsButtonProps {
  analysisId: string
}

export function GenerateInsightsButton({ analysisId }: GenerateInsightsButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch('/api/analyses/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisId }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'İçgörüler oluşturulamadı')
      }

      router.refresh()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleGenerate}
        disabled={loading}
        variant="outline"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        {loading ? 'Oluşturuluyor...' : 'AI İçgörüleri Oluştur'}
      </Button>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
