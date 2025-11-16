import React, { useMemo } from 'react'

const PricingStep = ({ data, onChange }) => {
  const finalPrice = useMemo(() => {
    if (data.is_free) return 0
    let final = data.price_original || 0
    if (data.offer_fixed != null && data.offer_fixed !== '') {
      final = Math.max(0, (data.price_original || 0) - Number(data.offer_fixed))
    } else if (data.offer_percent != null && data.offer_percent !== '') {
      final = Math.max(0, (data.price_original || 0) * (1 - Number(data.offer_percent)/100))
    }
    return Number(final.toFixed(2))
  }, [data])

  const lockOffers = data.is_free

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-red-500 mb-1">Precio original*</label>
        <input
          type="number"
          min={1}
          max={1000}
          step="0.01"
          disabled={lockOffers}
          value={data.price_original ?? ''}
          onChange={(e) => onChange({ price_original: Number(e.target.value) })}
          className="w-48 px-3 py-2 rounded bg-gray-900 border border-gray-800 text-gray-100 disabled:opacity-50"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-300">Gratis</label>
        <input
          type="checkbox"
          checked={data.is_free || false}
          onChange={(e) => onChange({ is_free: e.target.checked, offer_fixed: null, offer_percent: null })}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Oferta (Monto fijo)</label>
          <input
            type="number"
            min={0}
            step="0.01"
            disabled={lockOffers}
            value={data.offer_fixed ?? ''}
            onChange={(e) => onChange({ offer_fixed: e.target.value === '' ? null : Number(e.target.value), offer_percent: null })}
            className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-800 text-gray-100 disabled:opacity-50"
          />
          <p className="text-xs text-gray-500 mt-1">No puede ser mayor o igual al precio original.</p>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Oferta (Porcentaje)</label>
          <input
            type="number"
            min={0}
            max={90}
            disabled={lockOffers}
            value={data.offer_percent ?? ''}
            onChange={(e) => onChange({ offer_percent: e.target.value === '' ? null : Number(e.target.value), offer_fixed: null })}
            className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-800 text-gray-100 disabled:opacity-50"
          />
          <p className="text-xs text-gray-500 mt-1">Máximo 90%.</p>
        </div>
      </div>

      <div className="p-4 rounded border border-gray-800 bg-black/40">
        <div className="text-sm text-gray-300">Precio final</div>
        <div className="text-2xl font-semibold text-purple-300">${finalPrice}</div>
        {!data.is_free && data.price_original && finalPrice < data.price_original && (
          <div className="text-xs text-gray-400 mt-1">
            <span className="line-through mr-2">${Number(data.price_original).toFixed(2)}</span>
            <span>${finalPrice}</span>
          </div>
        )}
        {data.is_free && (
          <div className="text-xs text-gray-400 mt-1">Precio bloqueado en $0.00 por ser gratis (captura de email en descarga).</div>
        )}
      </div>
    </div>
  )
}

export default PricingStep
