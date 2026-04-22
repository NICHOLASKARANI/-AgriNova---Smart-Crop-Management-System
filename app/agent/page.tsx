'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

export default function AgentDashboard() {
  const [user, setUser] = useState<any>(null)
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedField, setSelectedField] = useState('')
  const [newStage, setNewStage] = useState('')
  const [notes, setNotes] = useState('')
  const [updating, setUpdating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (!res.ok) {
        router.push('/login')
        return
      }
      const data = await res.json()
      setUser(data.user)
      fetchMyFields()
    } catch (error) {
      router.push('/login')
    }
  }

  const fetchMyFields = async () => {
    try {
      const res = await fetch('/api/fields/my-fields')
      const data = await res.json()
      setFields(data)
    } catch (error) {
      toast.error('Failed to load fields')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateField = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedField || !newStage) {
      toast.error('Please select field and stage')
      return
    }

    setUpdating(true)
    try {
      const res = await fetch('/api/fields/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fieldId: selectedField,
          newStage,
          notes,
        }),
      })

      if (!res.ok) throw new Error('Update failed')

      toast.success('Field updated successfully!')
      setSelectedField('')
      setNewStage('')
      setNotes('')
      fetchMyFields()
    } catch (error) {
      toast.error('Failed to update field')
    } finally {
      setUpdating(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-green-600">AgriNova</h1>
              <span className="ml-4 text-sm text-gray-500">Agent Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My Fields List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">My Assigned Fields</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {fields.map((field: any) => (
                    <div key={field.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{field.name}</h4>
                          <p className="text-sm text-gray-500">{field.cropType} • {field.size} ha • {field.location}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Planted: {new Date(field.plantingDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            field.currentStage === 'PLANTED' ? 'bg-yellow-100 text-yellow-800' :
                            field.currentStage === 'GROWING' ? 'bg-green-100 text-green-800' :
                            field.currentStage === 'READY' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {field.currentStage}
                          </span>
                          <p className={`text-xs mt-1 ${
                            field.status === 'ACTIVE' ? 'text-green-600' :
                            field.status === 'AT_RISK' ? 'text-red-600' :
                            'text-blue-600'
                          }`}>
                            {field.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {fields.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                      No fields assigned yet
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Update Form */}
            <div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Update Field</h3>
                <form onSubmit={handleUpdateField} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Field
                    </label>
                    <select
                      value={selectedField}
                      onChange={(e) => setSelectedField(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Choose a field...</option>
                      {fields.map((field: any) => (
                        <option key={field.id} value={field.id}>
                          {field.name} (Current: {field.currentStage})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Stage
                    </label>
                    <select
                      value={newStage}
                      onChange={(e) => setNewStage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select new stage...</option>
                      <option value="PLANTED">Planted</option>
                      <option value="GROWING">Growing</option>
                      <option value="READY">Ready</option>
                      <option value="HARVESTED">Harvested</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Add your observations..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={updating}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
                  >
                    {updating ? 'Updating...' : 'Update Field'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}