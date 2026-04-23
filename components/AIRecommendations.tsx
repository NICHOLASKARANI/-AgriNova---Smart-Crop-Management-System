'use client'

import { useState, useEffect } from 'react'

interface Recommendation {
  id: string
  title: string
  description: string
  impact: 'High' | 'Medium' | 'Low'
  category: 'Marketing' | 'Operations' | 'Finance' | 'Technology'
  actionItems: string[]
}

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate AI recommendations
    setTimeout(() => {
      setRecommendations([
        {
          id: '1',
          title: 'Optimize Irrigation Schedule',
          description: 'Based on weather patterns, adjust irrigation to save 30% water',
          impact: 'High',
          category: 'Operations',
          actionItems: ['Install soil sensors', 'Schedule morning irrigation', 'Monitor weekly rainfall']
        },
        {
          id: '2',
          title: 'Expand to Online Market',
          description: 'Digital marketplace integration could increase revenue by 45%',
          impact: 'High',
          category: 'Marketing',
          actionItems: ['Create product listings', 'Set up payment gateway', 'Launch social media campaign']
        },
        {
          id: '3',
          title: 'Crop Rotation Strategy',
          description: 'AI suggests rotating crops for better soil health',
          impact: 'Medium',
          category: 'Operations',
          actionItems: ['Plan rotation schedule', 'Order seeds', 'Prepare soil analysis']
        }
      ])
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">AI analyzing your business...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">AI-Powered Recommendations</h2>
      <div className="grid gap-6">
        {recommendations.map((rec) => (
          <div key={rec.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{rec.title}</h3>
                <p className="text-gray-600 mt-1">{rec.description}</p>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  rec.impact === 'High' ? 'bg-red-100 text-red-700' :
                  rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {rec.impact} Impact
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  {rec.category}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Action Items:</p>
              <ul className="space-y-1">
                {rec.actionItems.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-green-500">?</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
