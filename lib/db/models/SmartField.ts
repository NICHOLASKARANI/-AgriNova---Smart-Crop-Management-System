import mongoose from 'mongoose'

export interface ISmartField {
  name: string
  cropType: string
  plantingDate: Date
  currentStage: string
  location: string
  size: number
  agentId: string
  agentName: string
  healthScore: number
  status: string
  notes: any[]
  lastUpdate: Date
  createdAt: Date
  updatedAt: Date
}

const smartFieldSchema = new mongoose.Schema<ISmartField>({
  name: { type: String, required: true },
  cropType: { type: String, required: true },
  plantingDate: { type: Date, required: true },
  currentStage: { type: String, default: 'PLANTED' },
  location: { type: String, required: true },
  size: { type: Number, required: true },
  agentId: { type: String, required: true },
  agentName: { type: String, required: true },
  healthScore: { type: Number, default: 85 },
  status: { type: String, default: 'ACTIVE' },
  notes: [{
    text: String,
    createdAt: { type: Date, default: Date.now },
    author: String,
    stage: String
  }],
  lastUpdate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const SmartField = mongoose.models.SmartField || mongoose.model<ISmartField>('SmartField', smartFieldSchema)
