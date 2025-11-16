import React, { useState } from 'react'

const FilesStep = ({ data, onChange }) => {
  const [previews, setPreviews] = useState(data.preview_urls || [])

  const handleArchive = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['application/zip', 'application/x-rar-compressed', 'application/octet-stream']
    if (!allowed.includes(file.type) && !file.name.match(/\.(zip|rar)$/i)) {
      alert('Formato no permitido. Sube un .zip o .rar')
      return
    }
    // Demo: guardamos solo el nombre
    onChange({ archive_url: `/uploads/${file.name}` })
  }

  const handlePreview = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.name.match(/\.(mp3|wav)$/i)) {
      alert('Formato no permitido. Solo .mp3 o .wav')
      return
    }
    const url = URL.createObjectURL(file)
    const next = [...previews, url]
    setPreviews(next)
    onChange({ preview_urls: next })
  }

  const removePreview = (idx) => {
    const next = previews.filter((_, i) => i !== idx)
    setPreviews(next)
    onChange({ preview_urls: next })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-red-500 mb-1">Archivos*</label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded border border-gray-800 bg-gray-900">
            <p className="text-gray-300 mb-2">Subir Archivo (.rar, .zip)</p>
            <input type="file" accept=".zip,.rar" onChange={handleArchive} className="text-gray-300" />
            {data.archive_url && (
              <p className="mt-2 text-xs text-gray-400 truncate">{data.archive_url}</p>
            )}
          </div>
          <div className="p-4 rounded border border-gray-800 bg-gray-900">
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Preview del audio (.mp3, .wav)</p>
              <label className="text-xs text-purple-400 cursor-pointer">
                Añadir preview
                <input type="file" accept=".mp3,.wav" onChange={handlePreview} className="hidden" />
              </label>
            </div>
            <div className="mt-3 space-y-2">
              {previews.map((url, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-black/40 p-2 rounded">
                  <audio controls src={url} className="flex-1" />
                  <button
                    onClick={() => removePreview(idx)}
                    className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-200"
                  >
                    Borrar
                  </button>
                </div>
              ))}
              {previews.length === 0 && (
                <p className="text-xs text-gray-500">No hay previews añadidos todavía.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilesStep
