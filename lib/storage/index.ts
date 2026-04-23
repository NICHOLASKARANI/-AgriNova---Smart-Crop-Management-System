import { connectDB } from '../db/mongodb'

// Simple in-memory storage
let memoryFields: any[] = []
let memoryUsers: any[] = []

// Initialize demo data
const initDemoData = () => {
  if (memoryFields.length === 0) {
    memoryFields = [
      {
        _id: '1',
        name: 'North Field',
        cropType: 'Corn',
        plantingDate: new Date('2024-03-15'),
        currentStage: 'GROWING',
        location: 'North Region',
        size: 45.5,
        agentId: 'agent1',
        agentName: 'John Field Agent',
        healthScore: 85,
        status: 'ACTIVE',
        notes: [],
        lastUpdate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        name: 'South Valley',
        cropType: 'Wheat',
        plantingDate: new Date('2024-02-20'),
        currentStage: 'READY',
        location: 'South Region',
        size: 32.0,
        agentId: 'agent1',
        agentName: 'John Field Agent',
        healthScore: 92,
        status: 'ACTIVE',
        notes: [],
        lastUpdate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  }
}

initDemoData()

export const storage = {
  getFields: async () => {
    try {
      await connectDB()
    } catch (error) {
      console.log('Using in-memory storage')
    }
    return memoryFields
  },
  
  addField: async (field: any) => {
    memoryFields.push(field)
    return field
  },
  
  updateField: async (id: string, data: any) => {
    const index = memoryFields.findIndex((f: any) => f._id === id)
    if (index !== -1) {
      memoryFields[index] = { ...memoryFields[index], ...data }
      return memoryFields[index]
    }
    return null
  },
  
  deleteField: async (id: string) => {
    const index = memoryFields.findIndex((f: any) => f._id === id)
    if (index !== -1) {
      memoryFields.splice(index, 1)
      return true
    }
    return false
  },
  
  findFieldById: async (id: string) => {
    return memoryFields.find((f: any) => f._id === id)
  },
  
  findFieldsByAgent: async (agentId: string) => {
    return memoryFields.filter((f: any) => f.agentId === agentId)
  },
  
  findUserByEmail: async (email: string) => {
    return memoryUsers.find((u: any) => u.email === email)
  },
  
  createUser: async (user: any) => {
    memoryUsers.push(user)
    return user
  }
}
