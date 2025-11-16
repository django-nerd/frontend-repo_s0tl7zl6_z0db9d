import { useMemo, useState } from 'react'
import StepIndicator from './components/StepIndicator'
import FilesStep from './components/FilesStep'
import BasicInfoStep from './components/BasicInfoStep'
import MetadataStep from './components/MetadataStep'
import PricingStep from './components/PricingStep'
import CollabStep from './components/CollabStep'

function App() {
  const steps = ['Archivos', 'Información', 'Metadatos', 'Precios', 'Colaboraciones', 'Resumen']
  const [current, setCurrent] = useState(0)
  const [form, setForm] = useState({
    visibility: 'privado',
    tags: [],
    collaborators: [],
    is_free: false,
  })

  const requiredFilled = useMemo(() => {
    return !!(form.title && form.title.length > 0 && form.price_original && form.sounds_count != null && form.cover_url && form.release_at)
  }, [form])

  const onChange = (patch) => setForm((prev) => ({ ...prev, ...patch }))

  const next = () => {
    if (current < steps.length - 1) setCurrent((c) => c + 1)
  }
  const prev = () => setCurrent((c) => Math.max(0, c - 1))

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const publish = async (mode) => {
    if (!requiredFilled) {
      alert('Completa los campos obligatorios marcados con *')
      return
    }
    try {
      const payload = {
        ...form,
        release_at: form.release_at || new Date().toISOString(),
        visibility: form.visibility,
      }
      const res = await fetch(`${baseUrl}/drumkits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const j = await res.json()
      if (!res.ok) throw new Error(j.detail || 'Error al publicar')
      alert(`Guardado con id: ${j.id} (${mode})`)
    } catch (e) {
      alert(e.message)
    }
  }

  const renderStep = () => {
    switch (current) {
      case 0:
        return <FilesStep data={form} onChange={onChange} />
      case 1:
        return <BasicInfoStep data={form} onChange={onChange} />
      case 2:
        return <MetadataStep data={form} onChange={onChange} />
      case 3:
        return <PricingStep data={form} onChange={onChange} />
      case 4:
        return <CollabStep data={form} onChange={onChange} />
      default:
        return (
          <div className="space-y-4 text-gray-300">
            <div className="text-lg text-purple-300 font-semibold">Resumen</div>
            <pre className="text-xs bg-black/40 p-3 rounded border border-gray-800 overflow-auto">{JSON.stringify(form, null, 2)}</pre>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-purple-300">Subir Drumkit</h1>
          <div className="text-xs text-gray-400">Marketplace</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <StepIndicator steps={steps} current={current} />
        </div>
        <div className="p-4 sm:p-6 rounded-lg border border-gray-800 bg-gray-950">
          {renderStep()}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button onClick={prev} className="px-4 py-2 rounded bg-gray-900 border border-gray-800 text-gray-200 hover:bg-gray-800">Anterior</button>
          {current < steps.length - 1 && (
            <button onClick={next} className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white">Siguiente</button>
          )}

          <div className="relative">
            <details className="group">
              <summary className="list-none px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white cursor-pointer">Publicar</summary>
              <div className="absolute right-0 mt-2 w-48 rounded border border-gray-800 bg-gray-950 shadow-lg p-1">
                <button onClick={() => publish('borrador')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-900 text-gray-200">Borrador</button>
                {requiredFilled && (
                  <button onClick={() => publish('publicar_ahora')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-900 text-gray-200">Publicar ahora</button>
                )}
              </div>
            </details>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Los campos con * son obligatorios y mostrarán alertas si faltan.
        </div>
      </main>
    </div>
  )
}

export default App
