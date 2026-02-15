export interface User {
  id: string
  name?: string | null
  email: string
  image?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Dataset {
  id: string
  name: string
  description?: string | null
  fileName: string
  filePath: string
  fileType: string
  fileSize: number
  rowCount?: number | null
  columnCount?: number | null
  columns?: any
  preview?: any
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface Analysis {
  id: string
  name: string
  type: string
  datasetId: string
  userId: string
  parameters?: any
  results?: any
  insights?: string | null
  visualizations?: any
  status: string
  createdAt: Date
  updatedAt: Date
}

export type AnalysisType =
  | 'descriptive'
  | 'correlation'
  | 'regression'
  | 'clustering'
  | 'timeseries'
  | 'custom'

export type AnalysisStatus = 'pending' | 'processing' | 'completed' | 'failed'
