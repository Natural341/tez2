"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X } from "lucide-react"
import { formatBytes } from "@/lib/utils"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  selectedFile?: File | null
  onRemove?: () => void
}

export function FileUpload({ onFileSelect, selectedFile, onRemove }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
  })

  if (selectedFile) {
    return (
      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <File className="h-8 w-8 text-blue-500" />
            <div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-zinc-500">
                {formatBytes(selectedFile.size)}
              </p>
            </div>
          </div>
          {onRemove && (
            <button
              onClick={onRemove}
              className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
        isDragActive
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
          : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto mb-4 h-12 w-12 text-zinc-400" />
      {isDragActive ? (
        <p className="text-lg font-medium">Dosyayı buraya bırakın...</p>
      ) : (
        <>
          <p className="mb-2 text-lg font-medium">
            Dosya yüklemek için tıklayın veya sürükleyin
          </p>
          <p className="text-sm text-zinc-500">
            CSV veya Excel dosyası (.csv, .xls, .xlsx)
          </p>
        </>
      )}
    </div>
  )
}
