import { NextResponse } from "next/server"

// Bu rota NextAuth'u tamamen taklit eder ama hata vermez
export async function GET() {
  return NextResponse.json({
    user: {
      name: "Demo Kullanıcı",
      email: "demo@example.com",
      image: null,
    },
    expires: "2030-01-01T00:00:00.000Z",
  })
}

export async function POST() {
  return NextResponse.json({ success: true })
}
