import { GoogleGenAI } from "@google/genai";
import { DataPoint, ExpertSettings, ChatMessage, AnalysisType, MockRow, DataQualityIssue } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to handle API errors gracefully
const handleGenAIError = (error: any): string => {
    console.error("Gemini API Error:", error);
    
    // Check various paths for the error code/status based on different error object structures
    const errorCode = error?.code || error?.error?.code || error?.status;
    const errorMessage = error?.message || error?.error?.message || error?.toString();
    const errorStatus = error?.status || error?.error?.status;

    if (
        errorCode === 429 || 
        errorStatus === 'RESOURCE_EXHAUSTED' || 
        (typeof errorMessage === 'string' && (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("RESOURCE_EXHAUSTED")))
    ) {
        return "⚠️ API kotası aşıldı (429). Lütfen 1-2 dakika bekleyip tekrar deneyin.";
    }
    
    return "Servis şu an yanıt veremiyor. Lütfen bağlantınızı kontrol edin.";
};

export const generateInsight = async (
  dataWindow: DataPoint[], 
  query: string | null,
  settings: ExpertSettings,
  analysisType: AnalysisType
): Promise<string> => {
  if (!apiKey) return "API Anahtarı yapılandırılmamış.";

  try {
    const recentData = dataWindow.slice(-15);
    const dataSummary = JSON.stringify(recentData);
    
    let prompt = `
      Sen StatFlow platformunda görevli Kıdemli Veri Bilimci'sin (Senior Data Scientist).
      Şu anki Analiz Modu: **${analysisType}**.
      
      Veri Seti Özeti: ${dataSummary}.
      
      Uzman Ayarları:
      - Güven Aralığı (CI): %${settings.confidenceInterval}
      - Alpha Seviyesi: ${settings.alphaLevel}
      - Sapma Eşiği: ${settings.outlierThreshold} sigma
    `;

    if (query) {
      prompt += `\nKullanıcı Sorusu: "${query}"\nLütfen bu soruya eldeki verilere dayanarak, Türkçe, detaylı ve profesyonel bir yanıt ver.`;
    } else {
      prompt += `\nLütfen mevcut veri akışını **${analysisType}** perspektifinden yorumla. 
      
      Kurallar:
      1. Yanıtın **Türkçe** ve **akademik/profesyonel** dilde olsun.
      2. Asla emoji kullanma.
      3. İstatistiksel terimler (p-value, standart sapma, trend eğilimi) kullanarak durumu detaylandır.
      4. En az 3-4 cümle kurarak kapsamlı bir içgörü sağla. Sadece "artıyor/azalıyor" deme, nedenini ve olası sonucunu da belirt.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });

    return response.text || "Şu anda analiz oluşturulamıyor.";
  } catch (error) {
    return handleGenAIError(error);
  }
};

export const chatWithAssistant = async (
  history: ChatMessage[],
  currentContext: string
): Promise<string> => {
  if (!apiKey) return "Lütfen API Anahtarınızı yapılandırın.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Adın StatFlow AI Asistanı. Sen veri analitiği, istatistik ve sistem güvenliği konularında uzmanlaşmış profesyonel bir asistansın.
        
        Mevcut Bağlam: ${currentContext}.
        
        Kurallar:
        1. Her zaman **Türkçe** yanıt ver.
        2. Emoji kullanma.
        3. Çok ciddi, güven verici ve teknik bir dil kullan.
        4. Kullanıcı verileri hakkında konuşurken gizlilik ve güvenlik vurgusu yap.
        5. Yanıtların ne çok kısa ne çok uzun olsun, tam kararında bilgi ver.`
      }
    });

    const lastUserMessage = history[history.length - 1].content;

    const result = await chat.sendMessage({
      message: lastUserMessage
    });

    return result.text || "Üzgünüm, bu isteği şu an işleyemiyorum.";

  } catch (error) {
    return handleGenAIError(error);
  }
};

// --- Innovation Lab Functions ---

export const analyzeDataQuality = async (data: MockRow[]): Promise<DataQualityIssue[]> => {
  if (!apiKey) return [];

  const prompt = `
    Aşağıdaki veri setini analiz et ve veri kalitesi sorunlarını (eksik veri, mantıksız değerler, format hataları) bul.
    
    Veri Seti: ${JSON.stringify(data)}
    
    Lütfen yanıtını SADECE geçerli bir JSON array formatında ver. Başka hiçbir metin ekleme.
    Format şu olmalı:
    [
      {
        "id": "unique_string",
        "rowId": number (ilgili satırın id'si),
        "column": "string" (sorunlu sütun adı),
        "issue": "string" (sorun açıklaması, Türkçe),
        "suggestion": "string" (önerilen düzeltme açıklaması, Türkçe),
        "suggestedValue": any (önerilen düzeltilmiş değer)
      }
    ]
    Eğer eksik veri (null) varsa, diğer satırlara bakarak mantıklı bir ortalama veya medyan öner.
    Eğer mantıksız bir değer varsa (örn: negatif satış), mutlak değerini veya ortalamayı öner.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return [];
    
    // Clean up potential markdown code blocks if the model adds them despite instructions
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString) as DataQualityIssue[];
  } catch (error) {
    console.error("Wrangling Error:", error); // Quality check errors can return empty array silently
    return [];
  }
};

export const generateSQLFromText = async (nlQuery: string): Promise<string> => {
  if (!apiKey) return "-- API Anahtarı eksik.";

  const prompt = `
    Sen bir SQL uzmanısın. Kullanıcının doğal dildeki isteğini PostgreSQL uyumlu bir SQL sorgusuna çevir.
    
    Tablo Şeması:
    Table: sales_data
    Columns: id (int), region (varchar), product_category (varchar), amount (decimal), transaction_date (timestamp), customer_segment (varchar)

    Kullanıcı İsteği: "${nlQuery}"

    Kurallar:
    1. Sadece SQL kodunu döndür.
    2. Markdown formatı kullanma, düz metin olsun.
    3. Güvenli ve optimize sorgular yaz.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });

    return response.text?.replace(/```sql/g, '').replace(/```/g, '').trim() || "-- SQL oluşturulamadı.";
  } catch (error) {
    const err = handleGenAIError(error);
    return `-- ${err}`;
  }
};