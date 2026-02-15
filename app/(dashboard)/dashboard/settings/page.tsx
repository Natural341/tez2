"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [kdv] = useState(0) // KDV sabit 0
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // Profil güncelleme mantığı buraya eklenecek
    setTimeout(() => {
      setMessage("Profil bilgileri güncellendi")
      setLoading(false)
    }, 1000)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setMessage("Şifreler eşleşmiyor")
      return
    }

    setLoading(true)
    setMessage("")

    // Şifre değiştirme mantığı buraya eklenecek
    setTimeout(() => {
      setMessage("Şifre güncellendi")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Ayarlar</h1>
        <p className="text-zinc-600">
          Hesap ve uygulama ayarlarınızı yönetin
        </p>
      </div>

      {message && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">
          {message}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Profil Bilgileri</CardTitle>
          <CardDescription>
            Hesap bilgilerinizi güncelleyin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Ad Soyad
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Ahmet Yılmaz"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Güncelleniyor..." : "Profili Güncelle"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Şifre Değiştir</CardTitle>
          <CardDescription>
            Hesap şifrenizi güncelleyin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-medium">
                Mevcut Şifre
              </label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium">
                Yeni Şifre
              </label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Yeni Şifre (Tekrar)
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Güncelleniyor..." : "Şifreyi Değiştir"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uygulama Ayarları</CardTitle>
          <CardDescription>
            Genel uygulama ayarları
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="kdv" className="text-sm font-medium">
                KDV Oranı (%)
              </label>
              <Input
                id="kdv"
                type="number"
                min="0"
                max="100"
                value="0"
                disabled
                className="bg-zinc-100 dark:bg-zinc-900"
              />
              <p className="text-xs text-zinc-500">
                KDV oranı şu anda sabit 0% olarak ayarlanmıştır
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="currency" className="text-sm font-medium">
                Para Birimi
              </label>
              <select
                id="currency"
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <option value="TRY">Türk Lirası (₺)</option>
                <option value="USD">Amerikan Doları ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium">
                Dil
              </label>
              <select
                id="language"
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </div>

            <Button type="submit" disabled={loading}>
              Ayarları Kaydet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
