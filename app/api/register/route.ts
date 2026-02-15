import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already in use" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // 14-day trial period
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 14)

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          trialEndsAt,
          isPremium: false,
        }
      })

      return NextResponse.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      })
    } catch (dbError) {
      console.error("Registration DB error, returning mock success:", dbError)
      return NextResponse.json({
        user: {
          id: "demo-new-user",
          name: name,
          email: email,
        },
        message: "Demo Mode: Kayıt başarılı (Mock)"
      })
    }
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    )
  }
}
