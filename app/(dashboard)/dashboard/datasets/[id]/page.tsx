import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatBytes, formatDate } from "@/lib/utils"
import { ArrowLeft, Download, Trash2, Play } from "lucide-react"
import Link from "next/link"

export default async function DatasetDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getCurrentUser()

  if (!user?.id) {
    redirect("/login")
  }

  const dataset = await prisma.dataset.findUnique({
    where: {
      id: params.id,
      userId: user.id,
    },
    include: {
      analyses: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      }
    }
  })

  if (!dataset) {
    notFound()
  }

  const columns = (dataset.columns as any[]) || []
  const preview = (dataset.preview as any[]) || []

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/datasets"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Veri Setlerine Dön
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{dataset.name}</h1>
          {dataset.description && (
            <p className="mt-2 text-zinc-500">{dataset.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            İndir
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Sil
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-500">
              Satır Sayısı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {dataset.rowCount?.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-500">
              Sütun Sayısı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dataset.columnCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-500">
              Dosya Boyutu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatBytes(dataset.fileSize)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-500">
              Analiz Sayısı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dataset.analyses.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sütun Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-2 font-medium">Sütun Adı</th>
                  <th className="pb-2 font-medium">Veri Tipi</th>
                </tr>
              </thead>
              <tbody>
                {columns.map((col: any, idx: number) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-2 font-medium">{col.name}</td>
                    <td className="py-2 text-zinc-500">{col.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Veri Önizleme (İlk 10 satır)</CardTitle>
          <Link href={`/dashboard/analyses/new?datasetId=${dataset.id}`}>
            <Button size="sm">
              <Play className="mr-2 h-4 w-4" />
              Analiz Başlat
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  {columns.map((col: any, idx: number) => (
                    <th key={idx} className="pb-2 px-4 font-medium whitespace-nowrap">
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row: any, rowIdx: number) => (
                  <tr key={rowIdx} className="border-b last:border-0">
                    {columns.map((col: any, colIdx: number) => (
                      <td key={colIdx} className="py-2 px-4 text-zinc-600 dark:text-zinc-400">
                        {String(row[col.name] ?? '-')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {dataset.analyses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Son Analizler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataset.analyses.map((analysis) => (
                <Link
                  key={analysis.id}
                  href={`/dashboard/analyses/${analysis.id}`}
                  className="block rounded-lg border p-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{analysis.name}</h4>
                      <p className="text-sm text-zinc-500">{analysis.type}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          analysis.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {analysis.status}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {formatDate(analysis.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
