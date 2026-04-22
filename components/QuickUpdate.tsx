'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

interface Field {
  id: string
  name: string
  currentStage: string
}

interface QuickUpdateProps {
  fields: Field[]
  onUpdate: () => void
}

export default function QuickUpdate({ fields, onUpdate }: QuickUpdateProps) {
  const [selectedField, setSelectedField] = useState('')
  const [newStage, setNewStage] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedField || !newStage) {
      toast.error('Please select field and stage')
      return
    }

    setLoading(true)
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
      onUpdate()
    } catch (error) {
      toast.error('Failed to update field')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Quick Update</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Field
          </label>
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Choose a field...</option>
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name} (Current: {field.currentStage})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Update Stage
          </label>
          <select
            value={newStage}
            onChange={(e) => setNewStage(e.target.value)}
            className="input-field"
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
            className="input-field"
            placeholder="Add your observations..."
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Field'}
        </button>
      </form>
    </div>
  )
}