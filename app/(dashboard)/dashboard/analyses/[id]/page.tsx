import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Download, Trash2, Sparkles } from "lucide-react"
import Link from "next/link"
import { Chart } from "@/components/dashboard/chart"
import { GenerateInsightsButton } from "@/components/dashboard/generate-insights-button"

export default async function AnalysisDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getCurrentUser()

  if (!user?.id) {
    redirect("/login")
  }

  const analysis = await prisma.analysis.findUnique({
    where: {
      id: params.id,
      userId: user.id,
    },
    include: {
      dataset: true,
    }
  })

  if (!analysis) {
    notFound()
  }

  const results = analysis.results as any
  const visualizations = (analysis.visualizations as any[]) || []

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/analyses"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Analizlere Dön
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{analysis.name}</h1>
          <p className="mt-2 text-zinc-500">
            Veri Seti: {analysis.dataset.name}
          </p>
          <p className="text-sm text-zinc-400">
            {formatDate(analysis.createdAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              analysis.status === 'completed'
                ? 'bg-green-100 text-green-700'
                : analysis.status === 'pending'
                ? 'bg-yellow-100 text-yellow-700'
                : analysis.status === 'processing'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {analysis.status === 'completed' ? 'Tamamlandı' :
             analysis.status === 'pending' ? 'Bekliyor' :
             analysis.status === 'processing' ? 'İşleniyor' : 'Hata'}
          </span>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Rapor İndir
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Sil
          </Button>
        </div>
      </div>

      {analysis.status === 'pending' && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <CardContent className="pt-6">
            <p className="text-yellow-800 dark:text-yellow-200">
              ⏳ Analiz beklemede... İşlem başlatılacak.
            </p>
          </CardContent>
        </Card>
      )}

      {analysis.status === 'processing' && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardContent className="pt-6">
            <p className="text-blue-800 dark:text-blue-200">
              🔄 Analiz işleniyor... Lütfen bekleyin.
            </p>
          </CardContent>
        </Card>
      )}

      {analysis.status === 'failed' && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardContent className="pt-6">
            <p className="text-red-800 dark:text-red-200">
              ❌ Analiz işlenirken bir hata oluştu.
            </p>
          </CardContent>
        </Card>
      )}

      {analysis.status === 'completed' && results && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>İstatistiksel Sonuçlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(results).map(([column, stats]: [string, any]) => (
                  <div key={column} className="space-y-3">
                    <h3 className="font-semibold text-lg border-b pb-2">{column}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div>
                        <p className="text-sm text-zinc-500">Veri Sayısı</p>
                        <p className="text-xl font-bold">{stats.count}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Ortalama</p>
                        <p className="text-xl font-bold">{stats.mean}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Medyan</p>
                        <p className="text-xl font-bold">{stats.median}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Minimum</p>
                        <p className="text-xl font-bold">{stats.min}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Maksimum</p>
                        <p className="text-xl font-bold">{stats.max}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Std. Sapma</p>
                        <p className="text-xl font-bold">{stats.stdDev}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {visualizations.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {visualizations.map((viz: any, idx: number) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle>{viz.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Chart data={viz.data} type={viz.type} />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {analysis.insights && (
            <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  AI İçgörüleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-purple-900 dark:text-purple-100">
                  {analysis.insights}
                </p>
              </CardContent>
            </Card>
          )}

          {!analysis.insights && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Sparkles className="mb-3 h-10 w-10 text-zinc-400" />
                <p className="mb-2 text-sm text-zinc-500">
                  AI destekli içgörüler henüz oluşturulmadı
                </p>
                <GenerateInsightsButton analysisId={analysis.id} />
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
