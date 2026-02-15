import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/session"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const user = await requireAuth()

    let datasets = []
    try {
      datasets = await prisma.dataset.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          rowCount: true,
          columnCount: true,
          createdAt: true,
        }
      })
    } catch (dbError) {
      console.error("DB Error, returning mock data:", dbError)
      // Mock Data for Demo
      datasets = [
        {
          id: 'mock-1',
          name: 'Örnek Satış Verileri (Demo)',
          rowCount: 1250,
          columnCount: 8,
          createdAt: new Date().toISOString()
        },
        {
          id: 'mock-2',
          name: 'Müşteri Profilleri (Demo)',
          rowCount: 500,
          columnCount: 12,
          createdAt: new Date().toISOString()
        }
      ]
    }

    return NextResponse.json({ datasets })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Veri setleri alınamadı' },
      { status: 500 }
    )
  }
}
