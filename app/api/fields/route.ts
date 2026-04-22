import { NextRequest, NextResponse } from 'next/server'

// Sample fields data
const fields = [
  {
    id: '1',
    name: 'North Field',
    cropType: 'Corn',
    plantingDate: '2024-03-15',
    currentStage: 'GROWING',
    location: 'North Region',
    size: 45.5,
    status: 'ACTIVE'
  },
  {
    id: '2',
    name: 'South Valley',
    cropType: 'Wheat',
    plantingDate: '2024-02-20',
    currentStage: 'READY',
    location: 'South Region',
    size: 32.0,
    status: 'ACTIVE'
  },
  {
    id: '3',
    name: 'East Garden',
    cropType: 'Tomatoes',
    plantingDate: '2024-04-01',
    currentStage: 'PLANTED',
    location: 'East Region',
    size: 12.5,
    status: 'ACTIVE'
  },
  {
    id: '4',
    name: 'West Field',
    cropType: 'Soybeans',
    plantingDate: '2024-01-10',
    currentStage: 'HARVESTED',
    location: 'West Region',
    size: 28.0,
    status: 'COMPLETED'
  },
]

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')?.value
    
    if (!sessionCookie) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const session = JSON.parse(sessionCookie)
    
    // If agent, filter fields (for demo, show all)
    let userFields = fields
    if (session.role === 'FIELD_AGENT') {
      userFields = fields // In real app, filter by agent ID
    }

    return NextResponse.json(userFields)
  } catch (error) {
    console.error('Fields error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
