import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/session"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const user = await requireAuth()
    const { name, type, datasetId } = await req.json()

    if (!name || !type || !datasetId) {
      return NextResponse.json(
        { error: 'Eksik bilgi' },
        { status: 400 }
      )
    }

    // Veri setinin kullanıcıya ait olduğunu kontrol et
    const dataset = await prisma.dataset.findUnique({
      where: {
        id: datasetId,
        userId: user.id,
      }
    })

    if (!dataset) {
      return NextResponse.json(
        { error: 'Veri seti bulunamadı' },
        { status: 404 }
      )
    }

    // Analiz oluştur
    const analysis = await prisma.analysis.create({
      data: {
        name,
        type,
        datasetId,
        userId: user.id,
        status: 'pending',
      }
    })

    // Arka planda analizi işle (şimdilik basit bir simülasyon)
    processAnalysis(analysis.id, dataset)

    return NextResponse.json({ analysis })
  } catch (error: any) {
    console.error('Analysis creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Analiz oluşturulamadı' },
      { status: 500 }
    )
  }
}

// Analizi işle (basitleştirilmiş versiyon)
async function processAnalysis(analysisId: string, dataset: any) {
  try {
    // Simüle edilmiş işlem
    await new Promise(resolve => setTimeout(resolve, 2000))

    const preview = dataset.preview as any[] || []
    const columns = dataset.columns as any[] || []

    // Sayısal sütunları bul
    const numericColumns = columns.filter((col: any) =>
      col.type === 'number' &&
      preview.some((row: any) => typeof row[col.name] === 'number')
    )

    // Basit istatistikler hesapla
    const results: any = {}

    numericColumns.forEach((col: any) => {
      const values = preview
        .map((row: any) => row[col.name])
        .filter((v: any) => typeof v === 'number' && !isNaN(v))

      if (values.length > 0) {
        const sum = values.reduce((a: number, b: number) => a + b, 0)
        const mean = sum / values.length
        const sorted = [...values].sort((a: number, b: number) => a - b)
        const median = sorted.length % 2 === 0
          ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
          : sorted[Math.floor(sorted.length / 2)]

        const variance = values.reduce((acc: number, val: number) =>
          acc + Math.pow(val - mean, 2), 0) / values.length
        const stdDev = Math.sqrt(variance)

        results[col.name] = {
          count: values.length,
          mean: Number(mean.toFixed(2)),
          median: Number(median.toFixed(2)),
          min: Math.min(...values),
          max: Math.max(...values),
          stdDev: Number(stdDev.toFixed(2)),
        }
      }
    })

    // Görselleştirme verisi oluştur
    const visualizations = numericColumns.slice(0, 3).map((col: any) => ({
      type: 'bar',
      title: col.name,
      data: preview.slice(0, 20).map((row: any, idx: number) => ({
        name: `Satır ${idx + 1}`,
        value: row[col.name] || 0,
      }))
    }))

    // Analizi güncelle
    await prisma.analysis.update({
      where: { id: analysisId },
      data: {
        status: 'completed',
        results,
        visualizations,
      }
    })
  } catch (error) {
    console.error('Analysis processing error:', error)
    await prisma.analysis.update({
      where: { id: analysisId },
      data: { status: 'failed' }
    })
  }
}
