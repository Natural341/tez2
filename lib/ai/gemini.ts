import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function generateInsights(analysisData: {
  datasetName: string
  analysisType: string
  results: any
  rowCount?: number
  columnCount?: number
}) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
Aşağıdaki veri analizi sonuçlarını inceleyin ve Türkçe olarak içgörüler oluşturun:

Veri Seti: ${analysisData.datasetName}
Analiz Tipi: ${analysisData.analysisType}
Satır Sayısı: ${analysisData.rowCount || 'Bilinmiyor'}
Sütun Sayısı: ${analysisData.columnCount || 'Bilinmiyor'}

İstatistiksel Sonuçlar:
${JSON.stringify(analysisData.results, null, 2)}

Lütfen şu konularda içgörüler sağlayın:
1. Genel gözlemler ve önemli bulgular
2. Dikkat çeken değerler veya aykırı değerler
3. Veri kalitesi hakkında yorumlar
4. İş kararları için öneriler

Yanıtınızı açık ve anlaşılır bir şekilde, iş analisti perspektifinden yazın.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw new Error('AI içgörüleri oluşturulamadı')
  }
}
