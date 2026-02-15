export interface DataPoint {
  time: string;
  valueA: number;
  valueB: number;
  confidence: number;
}

export interface StatMetric {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  icon: 'activity' | 'shield' | 'alert' | 'users';
}

export interface AIInsight {
  title: string;
  description: string;
  timestamp: Date;
}

export enum AnalysisMode {
  STANDARD = 'STANDARD',
  EXPERT = 'EXPERT'
}

export enum AnalysisType {
  VARIANCE = 'Varyans Analizi',
  REGRESSION = 'Lineer Regresyon',
  ANOMALY = 'Anomali Tespiti',
  FORECAST = 'Gelecek Tahmini (AI)'
}

export interface ExpertSettings {
  alphaLevel: number;
  confidenceInterval: number;
  smoothingFactor: number;
  outlierThreshold: number;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'REST API' | 'WebSocket' | 'CSV Upload' | 'SQL Database';
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
  latency: number;
}

export interface ReportItem {
  id: string;
  title: string;
  date: string;
  type: 'PDF' | 'CSV' | 'XLSX';
  size: string;
  status: 'ready' | 'processing';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// New Types for Innovation Lab
export interface DataQualityIssue {
  id: string;
  rowId: number;
  column: string;
  issue: string;
  suggestion: string;
  suggestedValue?: any;
}

export interface MockRow {
  id: number;
  product: string;
  sales: number | null;
  region: string;
  status: string;
}