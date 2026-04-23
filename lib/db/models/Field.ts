import mongoose from 'mongoose'

export interface IField {
  name: string
  cropType: string
  plantingDate: Date
  currentStage: 'PLANTED' | 'GROWING' | 'READY' | 'HARVESTED'
  location: string
  size: number
  agentId: string
  agentName: string
  notes: Array<{
    text: string
    createdAt: Date
    author: string
    stage: string
  }>
  lastUpdate: Date
  createdAt: Date
  updatedAt: Date
}

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  author: { type: String, required: true },
  stage: { type: String, required: true }
})

const fieldSchema = new mongoose.Schema<IField>({
  name: { type: String, required: true },
  cropType: { type: String, required: true },
  plantingDate: { type: Date, required: true },
  currentStage: { 
    type: String, 
    enum: ['PLANTED', 'GROWING', 'READY', 'HARVESTED'],
    default: 'PLANTED'
  },
  location: { type: String, required: true },
  size: { type: Number, required: true },
  agentId: { type: String, required: true },
  agentName: { type: String, required: true },
  notes: [noteSchema],
  lastUpdate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Field = mongoose.models.Field || mongoose.model<IField>('Field', fieldSchema)
