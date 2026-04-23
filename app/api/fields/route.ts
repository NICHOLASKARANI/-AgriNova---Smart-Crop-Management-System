import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { verifyAccessToken } from '@/lib/authUtils'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyAccessToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    let fields = await storage.getFields()
    
    if (decoded.role !== 'admin') {
      fields = await storage.findFieldsByAgent(decoded.userId)
    }

    // Calculate status for each field
    const fieldsWithStatus = fields.map((field: any) => {
      const daysSincePlanting = Math.floor((Date.now() - new Date(field.plantingDate).getTime()) / (1000 * 60 * 60 * 24))
      const daysSinceLastUpdate = Math.floor((Date.now() - new Date(field.lastUpdate).getTime()) / (1000 * 60 * 60 * 24))
      
      let status = 'ACTIVE'
      
      if (field.currentStage === 'HARVESTED') {
        status = 'COMPLETED'
      } else if (daysSinceLastUpdate > 14) {
        status = 'AT_RISK'
      } else if (field.currentStage === 'PLANTED' && daysSincePlanting > 60) {
        status = 'AT_RISK'
      } else if (field.currentStage === 'GROWING' && daysSincePlanting > 90) {
        status = 'AT_RISK'
      } else if (field.currentStage === 'READY' && daysSincePlanting > 120) {
        status = 'AT_RISK'
      }
      
      return { ...field, status, daysSincePlanting, daysSinceLastUpdate }
    })

    return NextResponse.json(fieldsWithStatus)
  } catch (error) {
    console.error('Fields error:', error)
    return NextResponse.json({ error: 'Failed to fetch fields' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyAccessToken(token)
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can create fields' }, { status: 403 })
    }

    const body = await request.json()
    const { name, cropType, plantingDate, location, size, agentId, agentName } = body

    if (!name || !cropType || !plantingDate || !location || !size || !agentId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const newField = {
      _id: Date.now().toString(),
      name,
      cropType,
      plantingDate: new Date(plantingDate),
      location,
      size: parseFloat(size),
      agentId,
      agentName,
      currentStage: 'PLANTED',
      notes: [],
      lastUpdate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const created = await storage.addField(newField)

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Create field error:', error)
    return NextResponse.json({ error: 'Failed to create field' }, { status: 500 })
  }
}
