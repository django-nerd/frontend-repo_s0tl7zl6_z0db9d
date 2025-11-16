import React, { useState } from 'react'

const roles = ['productor', 'Ingeniero de audio', 'Artista']

const CollabStep = ({ data, onChange }) => {
  const [username, setUsername] = useState('')
  const [role, setRole] = useState(roles[0])
  const [share, setShare] = useState(0)

  const add = async () => {
    if (!username) return
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    try {
      const r = await fetch(`${base}/validate-username?username=${encodeURIComponent(username)}`)
      const j = await r.json()
      if (!j.exists) {
        alert('Usuario no válido')
        return
      }
    } catch (e) {
      // allow in demo
    }
    const current = data.collaborators || []
    if (current.length >= 5) return alert('Máximo 5 colaboradores')
    if (share < 0 || share > 100) return alert('Porcentaje inválido')
    const next = [...current, { username, role, share_percent: share }]
    onChange({ collaborators: next })
    setUsername('')
    setShare(0)
  }

  const remove = (idx) => {
    const next = (data.collaborators || []).filter((_, i) => i !== idx)
    onChange({ collaborators: next })
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-4 gap-3 items-end">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Buscar username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-800 text-gray-100"
            placeholder="username"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Rol principal</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-800 text-gray-100">
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Ventas %</label>
          <input type="number" min={0} max={100} value={share} onChange={(e) => setShare(Number(e.target.value))} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-800 text-gray-100" />
        </div>
        <button onClick={add} className="px-3 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white">Añadir</button>
      </div>

      <div className="space-y-2">
        {(data.collaborators || []).map((c, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded border border-gray-800 bg-black/40">
            <div className="text-gray-300 text-sm">{c.username} · {c.role}</div>
            <div className="text-purple-300 text-sm">{c.share_percent}%</div>
            <button onClick={() => remove(idx)} className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-200">Quitar</button>
          </div>
        ))}
        {(data.collaborators || []).length === 0 && (
          <p className="text-xs text-gray-500">No hay colaboradores añadidos.</p>
        )}
      </div>
    </div>
  )
}

export default CollabStep
