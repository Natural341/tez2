import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

export default async function AnalysesPage() {
  const user = await getCurrentUser()

  if (!user?.id) {
    return null
  }

  let analyses = []
  try {
    analyses = await prisma.analysis.findMany({
      where: { userId: user.id },
      include: { dataset: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch (dbError) {
    console.error("Analyses DB error, returning mock data:", dbError)
    analyses = [
      {
        id: 'mock-a1',
        name: 'Satış Trendleri Analizi (Demo)',
        type: 'descriptive',
        status: 'completed',
        createdAt: new Date(),
        dataset: { name: 'Örnek Satış Verileri' }
      },
      {
        id: 'mock-a2',
        name: 'Müşteri Segmentasyonu (Demo)',
        type: 'clustering',
        status: 'completed',
        createdAt: new Date(),
        dataset: { name: 'Müşteri Profilleri' }
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Analizler</h1>
          <p className="text-zinc-600">
            Veri analizlerinizi görüntüleyin ve yönetin
          </p>
        </div>
        <Link href="/dashboard/analyses/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Analiz
          </Button>
        </Link>
      </div>

      {analyses.length === 0 ? (
        <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/50 to-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 p-4">
              <BarChart3 className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-zinc-900">Henüz analiz yok</h3>
            <p className="mb-6 text-center text-sm text-zinc-600">
              İlk analizinizi oluşturarak başlayın
            </p>
            <Link href="/dashboard/analyses/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Analiz Oluştur
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis: any) => (
            <Link key={analysis.id} href={`/dashboard/analyses/${analysis.id}`}>
              <Card className="transition-all hover:shadow-lg hover:border-blue-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-3">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-zinc-900">{analysis.name}</CardTitle>
                        <p className="mt-1 text-sm text-zinc-600">
                          {analysis.dataset.name}
                        </p>
                        <p className="mt-1 text-sm text-zinc-500">
                          Tip: {analysis.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${analysis.status === 'completed'
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
                      <span className="text-xs text-zinc-500">
                        {formatDate(analysis.createdAt)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
