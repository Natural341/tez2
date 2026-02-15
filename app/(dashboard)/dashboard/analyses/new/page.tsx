"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewAnalysisPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const datasetId = searchParams.get('datasetId')

  const [datasets, setDatasets] = useState<any[]>([])
  const [selectedDataset, setSelectedDataset] = useState(datasetId || '')
  const [name, setName] = useState('')
  const [type, setType] = useState('descriptive')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDatasets()
  }, [])

  const fetchDatasets = async () => {
    try {
      const res = await fetch('/api/datasets')
      if (res.ok) {
        const data = await res.json()
        setDatasets(data.datasets)
      }
    } catch (error) {
      console.error('Failed to fetch datasets:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDataset || !name) {
      setError('Lütfen tüm alanları doldurun')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/analyses/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type,
          datasetId: selectedDataset,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Analiz oluşturulamadı')
      }

      router.push(`/dashboard/analyses/${data.analysis.id}`)
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
        <h1 className="text-3xl font-bold">Yeni Analiz Oluştur</h1>
        <p className="text-zinc-500">
          Bir veri seti üzerinde analiz başlatın
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analiz Bilgileri</CardTitle>
          <CardDescription>
            Analiz parametrelerini belirleyin
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
                Analiz Adı *
              </label>
              <Input
                id="name"
                placeholder="Örn: Satış Trendleri Analizi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dataset" className="text-sm font-medium">
                Veri Seti *
              </label>
              <select
                id="dataset"
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950"
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
                required
              >
                <option value="">Veri seti seçin...</option>
                {datasets.map((dataset: any) => (
                  <option key={dataset.id} value={dataset.id}>
                    {dataset.name} ({dataset.rowCount} satır)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Analiz Tipi *
              </label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="descriptive">Tanımlayıcı İstatistikler</option>
                <option value="correlation">Korelasyon Analizi</option>
                <option value="regression">Regresyon Analizi</option>
                <option value="clustering">Kümeleme Analizi</option>
                <option value="timeseries">Zaman Serisi Analizi</option>
              </select>
              <p className="text-xs text-zinc-500">
                {type === 'descriptive' && 'Ortalama, medyan, standart sapma gibi temel istatistikler'}
                {type === 'correlation' && 'Değişkenler arası ilişkileri inceleyin'}
                {type === 'regression' && 'Bağımlı ve bağımsız değişkenler arasındaki ilişki'}
                {type === 'clustering' && 'Veri noktalarını gruplara ayırın'}
                {type === 'timeseries' && 'Zaman içindeki değişimleri analiz edin'}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading || !selectedDataset || !name}
              >
                {loading ? 'Oluşturuluyor...' : 'Analiz Başlat'}
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
