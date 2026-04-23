'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AgentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [fields, setFields] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedField, setSelectedField] = useState<any>(null)
  const [updateData, setUpdateData] = useState({
    stage: '',
    note: ''
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        if (data.user.role !== 'user') {
          router.push('/admin')
          return
        }
        setUser(data.user)
        fetchFields()
      } else {
        router.push('/login')
      }
    } catch (error) {
      router.push('/login')
    }
  }

  const fetchFields = async () => {
    try {
      const res = await fetch('/api/fields')
      const data = await res.json()
      setFields(data)
    } catch (error) {
      console.error('Error fetching fields:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateField = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedField) return
    
    try {
      const res = await fetch(`/api/fields/${selectedField._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })
      
      if (res.ok) {
        setShowUpdateModal(false)
        setSelectedField(null)
        setUpdateData({ stage: '', note: '' })
        fetchFields()
      }
    } catch (error) {
      console.error('Error updating field:', error)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'AT_RISK': return 'bg-red-100 text-red-800'
      case 'COMPLETED': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'PLANTED': return 'bg-yellow-100 text-yellow-800'
      case 'GROWING': return 'bg-green-100 text-green-800'
      case 'READY': return 'bg-purple-100 text-purple-800'
      case 'HARVESTED': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: fields.length,
    active: fields.filter(f => f.status === 'ACTIVE').length,
    atRisk: fields.filter(f => f.status === 'AT_RISK').length,
    completed: fields.filter(f => f.status === 'COMPLETED').length
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your fields...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">??</span>
              <h1 className="text-xl font-bold text-green-600">AgriNova Agent</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-3xl mb-2">??</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-gray-600">My Fields</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-3xl mb-2">?</div>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-3xl mb-2">??</div>
            <div className="text-2xl font-bold text-red-600">{stats.atRisk}</div>
            <div className="text-gray-600">At Risk</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-3xl mb-2">??</div>
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        {/* Fields Grid */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Assigned Fields</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => (
            <div key={field._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4">
                <h3 className="text-lg font-bold text-white">{field.name}</h3>
                <p className="text-white/80 text-sm">{field.location}</p>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Crop: {field.cropType}</span>
                  <span className="text-sm text-gray-600">{field.size} ha</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStageColor(field.currentStage)}`}>
                    {field.currentStage}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(field.status)}`}>
                    {field.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Planted: {new Date(field.plantingDate).toLocaleDateString()}
                </div>
                <button
                  onClick={() => {
                    setSelectedField(field)
                    setShowUpdateModal(true)
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg hover:shadow-lg transition"
                >
                  Update Field
                </button>
              </div>
            </div>
          ))}
        </div>

        {fields.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">??</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Fields Assigned</h3>
            <p className="text-gray-600">You don't have any fields assigned yet.</p>
          </div>
        )}
      </div>

      {/* Update Field Modal */}
      {showUpdateModal && selectedField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Update Field: {selectedField.name}</h2>
            <form onSubmit={handleUpdateField} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Update Stage</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  value={updateData.stage}
                  onChange={(e) => setUpdateData({...updateData, stage: e.target.value})}
                >
                  <option value="">Select new stage</option>
                  <option value="PLANTED">Planted</option>
                  <option value="GROWING">Growing</option>
                  <option value="READY">Ready</option>
                  <option value="HARVESTED">Harvested</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Observations</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  value={updateData.note}
                  onChange={(e) => setUpdateData({...updateData, note: e.target.value})}
                  placeholder="Add your observations here..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                  Update Field
                </button>
                <button type="button" onClick={() => setShowUpdateModal(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
