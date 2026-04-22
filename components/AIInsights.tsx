'use client'

import { useState, useEffect } from 'react'

export default function AIInsights() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate AI predictions
    setTimeout(() => {
      setPredictions([
        { field: 'North Field', risk: 'Low', confidence: 92, recommendation: 'Optimal conditions. Continue current plan.' },
        { field: 'South Valley', risk: 'Medium', confidence: 78, recommendation: 'Monitor for pests. Consider early harvest.' },
        { field: 'East Garden', risk: 'High', confidence: 85, recommendation: 'Immediate attention needed. Check soil moisture.' },
      ])
      setLoading(false)
    }, 1500)
  }, [])

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/70 mt-2">AI analyzing fields...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-2xl">??</div>
        <h3 className="text-white font-semibold">AI Risk Predictions</h3>
        <span className="text-xs bg-green-500/20 px-2 py-1 rounded-full text-green-400">Live</span>
      </div>
      <div className="space-y-4">
        {predictions.map((pred, idx) => (
          <div key={idx} className="border-b border-white/10 pb-3 last:border-0">
            <div className="flex justify-between items-start mb-2">
              <span className="text-white font-medium">{pred.field}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                pred.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                pred.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {pred.risk} Risk
              </span>
            </div>
            <div className="text-white/60 text-sm mb-2">{pred.recommendation}</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: `${pred.confidence}%` }}></div>
              </div>
              <span className="text-white/60 text-xs">{pred.confidence}% confidence</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
