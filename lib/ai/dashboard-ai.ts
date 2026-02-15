import { GoogleGenerativeAI } from "@google/generative-ai";
import { DataPoint, ExpertSettings, ChatMessage, AnalysisType, MockRow, DataQualityIssue } from "@/types/new-dashboard";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Helper to handle API errors gracefully
const handleGenAIError = (error: any): string => {
    console.error("Gemini API Error:", error);
    
    const errorCode = error?.code || error?.error?.code || error?.status;
    const errorMessage = error?.message || error?.error?.message || error?.toString();
    const errorStatus = error?.status || error?.error?.status;

    if (
        errorCode === 429 || 
        errorStatus === 'RESOURCE_EXHAUSTED' || 
        (typeof errorMessage === 'string' && (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("RESOURCE_EXHAUSTED")))
    ) {
        return "⚠️ API quota exceeded (429). Please wait 1-2 minutes and try again.";
    }
    
    return "The service is currently unavailable. Please check your connection.";
};

export const generateInsight = async (
  dataWindow: DataPoint[], 
  query: string | null,
  settings: ExpertSettings,
  analysisType: AnalysisType
): Promise<string> => {
  if (!apiKey) return "API Key not configured.";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const recentData = dataWindow.slice(-15);
    const dataSummary = JSON.stringify(recentData);
    
    let prompt = `
      You are a Senior Data Scientist at InsightFlow platform.
      Current Analysis Mode: **${analysisType}**.
      
      Dataset Summary: ${dataSummary}.
      
      Expert Settings:
      - Confidence Interval (CI): ${settings.confidenceInterval}%
      - Alpha Level: ${settings.alphaLevel}
      - Outlier Threshold: ${settings.outlierThreshold} sigma
    `;

    if (query) {
      prompt += `
User Question: "${query}"
Please provide a detailed and professional response to this question based on the available data in English.`;
    } else {
      prompt += `
Please interpret the current data stream from the perspective of **${analysisType}**. 
      
      Rules:
      1. Your response should be in **English** and in **academic/professional** language.
      2. Do not use emojis.
      3. Elaborate on the situation using statistical terms (p-value, standard deviation, trend tendency).
      4. Provide a comprehensive insight by forming at least 3-4 sentences. Don't just say "increasing/decreasing", state the reason and possible result as well.`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Analysis could not be generated at this time.";
  } catch (error) {
    return handleGenAIError(error);
  }
};

export const chatWithAssistant = async (
  history: ChatMessage[],
  currentContext: string
): Promise<string> => {
  if (!apiKey) return "Please configure your API Key.";

  try {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `Your name is InsightFlow AI Assistant. You are a professional assistant specialized in data analytics, statistics, and system security.
        
        Current Context: ${currentContext}.
        
        Rules:
        1. Always respond in **English**.
        2. Do not use emojis.
        3. Use a very serious, reassuring, and technical language.
        4. Emphasize privacy and security when talking about user data.
        5. Provide balanced responses - neither too short nor too long.`
    });

    const chat = model.startChat({
        history: history.slice(0, -1).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
        })),
    });

    const lastUserMessage = history[history.length - 1].content;
    const result = await chat.sendMessage(lastUserMessage);
    const response = await result.response;

    return response.text() || "Sorry, I cannot process this request right now.";

  } catch (error) {
    return handleGenAIError(error);
  }
};

export const analyzeDataQuality = async (data: MockRow[]): Promise<DataQualityIssue[]> => {
  if (!apiKey) return [];

  const prompt = `
    Analyze the following dataset and find data quality issues (missing data, illogical values, format errors).
    
    Dataset: ${JSON.stringify(data)}
    
    Please provide your response ONLY in a valid JSON array format. Do not add any other text.
    Format should be:
    [
      {
        "id": "unique_string",
        "rowId": number (id of the related row),
        "column": "string" (problematic column name),
        "issue": "string" (issue description in English),
        "suggestion": "string" (suggested fix description in English),
        "suggestedValue": any (suggested corrected value)
      }
    ]
    If there is missing data (null), suggest a logical mean or median by looking at other rows.
    If there is an illogical value (e.g., negative sales), suggest its absolute value or the mean.
  `;

  try {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
        }
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    if (!text) return [];
    
    return JSON.parse(text) as DataQualityIssue[];
  } catch (error) {
    console.error("Wrangling Error:", error);
    return [];
  }
};

export const generateSQLFromText = async (nlQuery: string): Promise<string> => {
  if (!apiKey) return "-- API Key missing.";

  const prompt = `
    You are an SQL expert. Translate the user's natural language request into a PostgreSQL-compatible SQL query.
    
    Table Schema:
    Table: sales_data
    Columns: id (int), region (varchar), product_category (varchar), amount (decimal), transaction_date (timestamp), customer_segment (varchar)

    User Request: "${nlQuery}"

    Rules:
    1. Return only the SQL code.
    2. Do not use markdown formatting, let it be plain text.
    3. Write safe and optimized queries.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text()?.replace(/```sql/g, '').replace(/```/g, '').trim() || "-- SQL could not be generated.";
  } catch (error) {
    const err = handleGenAIError(error);
    return `-- ${err}`;
  }
};
