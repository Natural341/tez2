import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { generateInsights } from "@/lib/ai/gemini"

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth()
    const { analysisId } = await req.json()

    if (!analysisId) {
      return NextResponse.json(
        { error: 'Analiz ID gerekli' },
        { status: 400 }
      )
    }

    // Analizi kontrol et
    const analysis = await prisma.analysis.findUnique({
      where: {
        id: analysisId,
        userId: user.id,
      },
      include: {
        dataset: true,
      }
    })

    if (!analysis) {
      return NextResponse.json(
        { error: 'Analiz bulunamadı' },
        { status: 404 }
      )
    }

    if (analysis.status !== 'completed') {
      return NextResponse.json(
        { error: 'Analiz henüz tamamlanmamış' },
        { status: 400 }
      )
    }

    if (!analysis.results) {
      return NextResponse.json(
        { error: 'Analiz sonuçları bulunamadı' },
        { status: 400 }
      )
    }

    // AI içgörüleri oluştur
    const insights = await generateInsights({
      datasetName: analysis.dataset.name,
      analysisType: analysis.type,
      results: analysis.results,
      rowCount: analysis.dataset.rowCount || undefined,
      columnCount: analysis.dataset.columnCount || undefined,
    })

    // Analizi güncelle
    await prisma.analysis.update({
      where: { id: analysisId },
      data: { insights }
    })

    return NextResponse.json({ insights })
  } catch (error: any) {
    console.error('Insights generation error:', error)
    return NextResponse.json(
      { error: error.message || 'İçgörüler oluşturulamadı' },
      { status: 500 }
    )
  }
}
