import React, { useMemo } from 'react'

const BasicInfoStep = ({ data, onChange }) => {
  const nowISO = useMemo(() => new Date().toISOString(), [])

  const handleRelease = (value) => {
    const chosen = new Date(value)
    const now = new Date()
    // Same minute rule
    const toMinute = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes())
    if (toMinute(chosen) < toMinute(now)) {
      alert('La hora de lanzamiento ya pasó. Configura otra hora.')
      return
    }
    onChange({ release_at: chosen.toISOString() })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-red-500 mb-1">Portada*</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return
            // No real upload; store object URL
            const url = URL.createObjectURL(file)
            onChange({ cover_url: url })
          }}
          className="text-gray-300"
        />
        {data.cover_url && (
          <img src={data.cover_url} alt="cover" className="mt-3 w-40 h-40 object-cover rounded border border-gray-800" />
        )}
        <p className="text-xs text-gray-500 mt-1">Mínimo 1080x1080</p>
      </div>

      <div>
        <label className="block text-sm text-red-500 mb-1">Título*</label>
        <input
          type="text"
          value={data.title || ''}
          maxLength={60}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-800 text-gray-100"
          placeholder="Nombre del drumkit"
        />
        <div className="text-right text-xs text-gray-500">{(data.title?.length || 0)}/60</div>
      </div>

      <div>
        <label className="block text-sm text-red-500 mb-1">Fecha de lanzamiento*</label>
        <input
          type="datetime-local"
          defaultValue={nowISO.slice(0,16)}
          onChange={(e) => handleRelease(e.target.value)}
          className="px-3 py-2 rounded bg-gray-900 border border-gray-800 text-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Descripción</label>
        <textarea
          value={data.description || ''}
          maxLength={500}
          onChange={(e) => onChange({ description: e.target.value })}
          className="w-full h-24 px-3 py-2 rounded bg-gray-900 border border-gray-800 text-gray-100"
          placeholder="Describe tu drumkit"
        />
        <div className="text-right text-xs text-gray-500">{(data.description?.length || 0)}/500</div>
      </div>

      <div>
        <label className="block text-sm text-red-500 mb-1">Visibilidad*</label>
        <select
          value={data.visibility || 'privado'}
          onChange={(e) => onChange({ visibility: e.target.value })}
          className="px-3 py-2 rounded bg-gray-900 border border-gray-800 text-gray-100"
        >
          <option value="privado">Privado</option>
          <option value="publico">Público</option>
          <option value="no_listado">No listado</option>
        </select>
      </div>
    </div>
  )
}

export default BasicInfoStep
