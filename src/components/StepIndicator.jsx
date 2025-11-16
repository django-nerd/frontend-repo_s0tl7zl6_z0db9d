import React from 'react'

const StepIndicator = ({ steps, current }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((label, idx) => {
        const active = idx === current
        const completed = idx < current
        return (
          <div key={label} className="flex-1 flex items-center">
            <div
              className={[
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border',
                completed
                  ? 'bg-purple-600 text-white border-purple-500'
                  : active
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-gray-900 text-gray-400 border-gray-800',
              ].join(' ')}
            >
              {idx + 1}
            </div>
            <div className="ml-3 text-sm font-medium text-gray-300 hidden sm:block">{label}</div>
            {idx < steps.length - 1 && (
              <div className="flex-1 h-px bg-gray-800 ml-3" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StepIndicator
