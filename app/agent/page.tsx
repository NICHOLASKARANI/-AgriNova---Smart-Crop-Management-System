'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AgentDashboard() {
  const router = useRouter()
  const [fields, setFields] = useState([])

  useEffect(() => {
    const session = document.cookie.includes('session=agent')
    if (!session) {
      router.push('/login')
      return
    }
    
    fetch('/api/fields')
      .then(res => res.json())
      .then(setFields)
      .catch(console.error)
  }, [router])

  const handleLogout = () => {
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">??</span>
              <h1 className="text-xl font-bold">AgriNova Agent</h1>
            </div>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition">
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Assigned Fields</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field: any) => (
            <div key={field.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-3">??</div>
              <h3 className="text-lg font-bold text-gray-800">{field.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{field.cropType}</p>
              <p className="text-gray-500 text-sm mt-2">{field.location} ? {field.size} hectares</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium">Stage: {field.currentStage}</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {field.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
