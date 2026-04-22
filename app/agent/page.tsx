'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AgentDashboard() {
  const [user, setUser] = useState<any>(null)
  const [fields, setFields] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchUser()
    fetchFields()
  }, [])

  const fetchUser = async () => {
    const res = await fetch('/api/auth/me')
    if (res.ok) {
      const data = await res.json()
      setUser(data.user)
    } else {
      router.push('/login')
    }
  }

  const fetchFields = async () => {
    const res = await fetch('/api/fields')
    const data = await res.json()
    setFields(data)
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-green-600">AgriNova</h1>
              <span className="ml-4 text-sm text-gray-500">Agent Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Assigned Fields</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field: any) => (
              <div key={field.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900">{field.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{field.cropType}</p>
                <p className="text-sm text-gray-500">{field.location} ? {field.size} ha</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm font-medium">Stage: {field.currentStage}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    field.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {field.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
