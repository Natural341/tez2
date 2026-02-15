"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileUpload } from "@/components/dataset/file-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UploadDatasetPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Lütfen bir dosya seçin")
      return
    }

    if (!name) {
      setError("Lütfen veri seti adı girin")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("name", name)
      if (description) {
        formData.append("description", description)
      }

      const res = await fetch("/api/datasets/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Yükleme başarısız")
      }

      router.push("/dashboard/datasets")
      router.refresh()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Veri Seti Yükle</h1>
        <p className="text-zinc-500">
          CSV veya Excel dosyanızı yükleyin
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dosya Bilgileri</CardTitle>
          <CardDescription>
            Veri setiniz hakkında bilgi girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Veri Seti Adı *
              </label>
              <Input
                id="name"
                placeholder="Örn: Satış Verileri 2024"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Açıklama (İsteğe bağlı)
              </label>
              <textarea
                id="description"
                className="flex min-h-[80px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950"
                placeholder="Bu veri seti hakkında kısa bir açıklama..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Dosya *
              </label>
              <FileUpload
                onFileSelect={setFile}
                selectedFile={file}
                onRemove={() => setFile(null)}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading || !file || !name}
              >
                {loading ? "Yükleniyor..." : "Veri Seti Yükle"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
