import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Eksik bilgi" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Şifre en az 6 karakter olmalı" },
        { status: 400 }
      )
    }

    // Demo Modu: Veritabanına bakmadan başarılı dönüyoruz
    return NextResponse.json({ 
      user: { 
        id: "demo-" + Math.random().toString(36).substr(2, 9),
        name, 
        email 
      },
      message: "Demo hesabı başarıyla oluşturuldu" 
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: "Kayıt sırasında bir hata oluştu" },
      { status: 500 }
    )
  }
}
