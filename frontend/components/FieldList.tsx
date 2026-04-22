'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

interface Field {
  id: string
  name: string
  cropType: string
  plantingDate: string
  currentStage: string
  location: string
  size: number
  status: string
  agent?: { name: string }
}

interface FieldListProps {
  fields: Field[]
  isAdmin: boolean
  onUpdate: () => void
}

export default function FieldList({ fields, isAdmin, onUpdate }: FieldListProps) {
  const [selectedField, setSelectedField] = useState<Field | null>(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [newStage, setNewStage] = useState('')
  const [notes, setNotes] = useState('')

  const handleUpdateStage = async (fieldId: string) => {
    try {
      const res = await fetch('/api/fields/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fieldId,
          newStage,
          notes,
        }),
      })

      if (!res.ok) throw new Error('Update failed')

      toast.success('Field updated successfully!')
      setShowUpdateModal(false)
      setNewStage('')
      setNotes('')
      onUpdate()
    } catch (error) {
      toast.error('Failed to update field')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'AT_RISK':
        return 'bg-red-100 text-red-800'
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'PLANTED':
        return 'bg-yellow-100 text-yellow-800'
      case 'GROWING':
        return 'bg-green-100 text-green-800'
      case 'READY':
        return 'bg-purple-100 text-purple-800'
      case 'HARVESTED':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Fields Overview</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Field Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Crop
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Planting Date
              </th>
              {isAdmin && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fields.map((field) => (
              <tr key={field.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{field.name}</div>
                  <div className="text-sm text-gray-500">{field.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{field.cropType}</div>
                  <div className="text-sm text-gray-500">{field.size} ha</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageColor(field.currentStage)}`}>
                    {field.currentStage}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(field.status)}`}>
                    {field.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(field.plantingDate), 'MMM dd, yyyy')}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {field.agent?.name || 'Unassigned'}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedField(field)
                      setShowUpdateModal(true)
                    }}
                    className="text-primary hover:text-primary-dark"
                  >
                    Update Stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Update Field: {selectedField.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Stage
                </label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select stage</option>
                  <option value="PLANTED">Planted</option>
                  <option value="GROWING">Growing</option>
                  <option value="READY">Ready</option>
                  <option value="HARVESTED">Harvested</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes / Observations
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="input-field"
                  placeholder="Add your observations here..."
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handleUpdateStage(selectedField.id)}
                  className="btn-primary flex-1"
                >
                  Submit Update
                </button>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}