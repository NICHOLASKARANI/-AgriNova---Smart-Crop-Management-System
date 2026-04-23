'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function SmartSeasonDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [fields, setFields] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedField, setSelectedField] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    cropType: '',
    plantingDate: '',
    location: '',
    size: '',
    agentId: '',
    agentName: '',
    lat: '',
    lng: '',
    region: '',
    seasonType: 'LONG_RAINS'
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        if (data.user.role !== 'admin') {
          router.push('/agent')
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

  const handleCreateField = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/fields', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        setShowCreateModal(false)
        setFormData({
          name: '', cropType: '', plantingDate: '', location: '', size: '', agentId: '', agentName: '',
          lat: '', lng: '', region: '', seasonType: 'LONG_RAINS'
        })
        fetchFields()
      }
    } catch (error) {
      console.error('Error creating field:', error)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  // Chart data
  const healthData = {
    labels: fields.map((f: any) => f.name),
    datasets: [{
      label: 'Health Score',
      data: fields.map((f: any) => f.healthScore || 85),
      backgroundColor: 'rgba(76, 175, 80, 0.5)',
      borderColor: 'rgb(76, 175, 80)',
      borderWidth: 1
    }]
  }

  const stageDistribution = {
    labels: ['Planted', 'Growing', 'Flowering', 'Maturing', 'Ready', 'Harvested'],
    datasets: [{
      data: [
        fields.filter((f: any) => f.currentStage === 'PLANTED').length,
        fields.filter((f: any) => f.currentStage === 'GROWING').length,
        fields.filter((f: any) => f.currentStage === 'FLOWERING').length,
        fields.filter((f: any) => f.currentStage === 'MATURING').length,
        fields.filter((f: any) => f.currentStage === 'READY').length,
        fields.filter((f: any) => f.currentStage === 'HARVESTED').length
      ],
      backgroundColor: ['#FFC107', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#795548']
    }]
  }

  const stats = {
    total: fields.length,
    active: fields.filter((f: any) => f.status === 'ACTIVE').length,
    atRisk: fields.filter((f: any) => f.status === 'AT_RISK').length,
    completed: fields.filter((f: any) => f.status === 'COMPLETED').length,
    avgHealth: Math.round(fields.reduce((acc: number, f: any) => acc + (f.healthScore || 85), 0) / (fields.length || 1))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SmartSeason Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl animate-pulse">??</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                SmartSeason Field Monitor
              </h1>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-3xl mb-2">??</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-gray-600">Total Fields</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-3xl mb-2">?</div>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-gray-600">Active Fields</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-3xl mb-2">??</div>
            <div className="text-2xl font-bold text-red-600">{stats.atRisk}</div>
            <div className="text-gray-600">At Risk</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-3xl mb-2">??</div>
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-3xl mb-2">??</div>
            <div className="text-2xl font-bold text-green-600">{stats.avgHealth}%</div>
            <div className="text-gray-600">Avg Health</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Health Scores</h3>
            <Bar data={healthData} options={{ responsive: true }} />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stage Distribution</h3>
            <Doughnut data={stageDistribution} options={{ responsive: true }} />
          </div>
        </div>

        {/* AI Insights Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl mb-2">?? AI Insights</div>
              <p className="text-white/90">Based on current data, {stats.atRisk} fields require immediate attention.</p>
              <p className="text-white/80 text-sm mt-2">Average field health is {stats.avgHealth}% - {stats.avgHealth > 80 ? 'Good' : stats.avgHealth > 60 ? 'Moderate' : 'Critical'}</p>
            </div>
            <div className="text-5xl animate-pulse">??</div>
          </div>
        </div>

        {/* Fields Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Smart Fields Monitor</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-white text-green-600 px-4 py-2 rounded-lg hover:shadow-lg transition font-semibold"
              >
                + New Smart Field
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Field</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Crop</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Health</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fields.map((field: any) => (
                  <tr key={field._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{field.name}</div>
                      <div className="text-xs text-gray-500">{field.location?.region || field.location}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{field.cropType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        field.currentStage === 'PLANTED' ? 'bg-yellow-100 text-yellow-800' :
                        field.currentStage === 'GROWING' ? 'bg-green-100 text-green-800' :
                        field.currentStage === 'FLOWERING' ? 'bg-purple-100 text-purple-800' :
                        field.currentStage === 'MATURING' ? 'bg-blue-100 text-blue-800' :
                        field.currentStage === 'READY' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {field.currentStage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 rounded-full h-2" style={{ width: `${field.healthScore || 85}%` }}></div>
                        </div>
                        <span className="text-sm font-semibold">{field.healthScore || 85}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        field.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                        field.status === 'AT_RISK' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {field.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{field.agentName}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => setSelectedField(field)}
                        className="text-green-600 hover:text-green-900 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Field Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Create Smart Field</h2>
            <form onSubmit={handleCreateField} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field Name *</label>
                  <input type="text" required className="w-full px-3 py-2 border rounded-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type *</label>
                  <select required className="w-full px-3 py-2 border rounded-lg" value={formData.cropType} onChange={(e) => setFormData({...formData, cropType: e.target.value})}>
                    <option value="">Select</option>
                    <option value="Corn">Corn</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Soybeans">Soybeans</option>
                    <option value="Tomatoes">Tomatoes</option>
                    <option value="Potatoes">Potatoes</option>
                    <option value="Rice">Rice</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planting Date *</label>
                  <input type="date" required className="w-full px-3 py-2 border rounded-lg" value={formData.plantingDate} onChange={(e) => setFormData({...formData, plantingDate: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Season Type *</label>
                  <select required className="w-full px-3 py-2 border rounded-lg" value={formData.seasonType} onChange={(e) => setFormData({...formData, seasonType: e.target.value})}>
                    <option value="LONG_RAINS">Long Rains</option>
                    <option value="SHORT_RAINS">Short Rains</option>
                    <option value="DRY">Dry Season</option>
                    <option value="IRRIGATED">Irrigated</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size (ha) *</label>
                  <input type="number" step="0.1" required className="w-full px-3 py-2 border rounded-lg" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg" value={formData.lat} onChange={(e) => setFormData({...formData, lat: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg" value={formData.lng} onChange={(e) => setFormData({...formData, lng: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location/Region *</label>
                  <input type="text" required className="w-full px-3 py-2 border rounded-lg" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Agent *</label>
                  <select required className="w-full px-3 py-2 border rounded-lg" value={formData.agentId} onChange={(e) => {
                    const agent = e.target.options[e.target.selectedIndex].text
                    setFormData({...formData, agentId: e.target.value, agentName: agent})
                  }}>
                    <option value="">Select Agent</option>
                    <option value="agent1">John Field Agent</option>
                    <option value="agent2">Sarah Agent</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
                  Create Smart Field
                </button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition">
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
