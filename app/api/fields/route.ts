import { NextRequest, NextResponse } from 'next/server'

// Sample field data
const fields = [
  { 
    id: '1', 
    name: 'North Field', 
    cropType: 'Corn', 
    currentStage: 'GROWING', 
    location: 'North Region', 
    size: 45.5, 
    status: 'ACTIVE',
    plantingDate: '2024-03-15'
  },
  { 
    id: '2', 
    name: 'South Valley', 
    cropType: 'Wheat', 
    currentStage: 'READY', 
    location: 'South Region', 
    size: 32.0, 
    status: 'ACTIVE',
    plantingDate: '2024-02-20'
  },
  { 
    id: '3', 
    name: 'East Garden', 
    cropType: 'Tomatoes', 
    currentStage: 'PLANTED', 
    location: 'East Region', 
    size: 12.5, 
    status: 'ACTIVE',
    plantingDate: '2024-04-01'
  },
  { 
    id: '4', 
    name: 'West Field', 
    cropType: 'Soybeans', 
    currentStage: 'HARVESTED', 
    location: 'West Region', 
    size: 28.0, 
    status: 'COMPLETED',
    plantingDate: '2024-01-10'
  },
]

export async function GET(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(fields)
}

export async function POST(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const body = await request.json()
    const newField = {
      id: String(Date.now()),
      ...body,
      status: 'ACTIVE'
    }
    fields.push(newField)
    return NextResponse.json(newField)
  } catch (error) {
    return NextResponse.json({ message: 'Error creating field' }, { status: 500 })
  }
}
