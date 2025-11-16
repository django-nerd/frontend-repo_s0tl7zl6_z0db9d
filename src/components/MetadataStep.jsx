import React from 'react'

const MetadataStep = ({ data, onChange }) => {
  const addTag = () => {
    const t = prompt('Nuevo tag (max 15 chars)')
    if (!t) return
    if (t.length > 15) return alert('Máximo 15 caracteres')
    const current = data.tags || []
    if (current.length >= 3) return alert('Máximo 3 tags')
    onChange({ tags: [...current, t] })
  }

  const removeTag = (idx) => {
    const current = data.tags || []
    const next = current.filter((_, i) => i !== idx)
    onChange({ tags: next })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Tags (máx 3)</label>
        <div className="flex flex-wrap gap-2">
          {(data.tags || []).map((t, idx) => (
            <span key={idx} className="px-2 py-1 bg-purple-700/30 text-purple-300 rounded text-xs">
              {t}
              <button className="ml-2 text-gray-400 hover:text-gray-200" onClick={() => removeTag(idx)}>×</button>
            </span>
          ))}
          <button
            onClick={addTag}
            className="px-2 py-1 rounded bg-gray-900 border border-gray-800 text-gray-300 hover:border-gray-700"
          >
            Añadir tag
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm text-red-500 mb-1">Número de sonidos*</label>
        <input
          type="number"
          min={0}
          max={999}
          value={data.sounds_count ?? ''}
          onChange={(e) => onChange({ sounds_count: Number(e.target.value) })}
          className="w-40 px-3 py-2 rounded bg-gray-900 border border-gray-800 text-gray-100"
        />
      </div>
    </div>
  )
}

export default MetadataStep
