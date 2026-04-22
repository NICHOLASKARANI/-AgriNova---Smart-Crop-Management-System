import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')?.value

    if (!sessionCookie) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const session = JSON.parse(sessionCookie)
    
    // Simple user lookup
    const users = {
      '1': { id: '1', email: 'admin@agrinova.com', name: 'Admin User', role: 'ADMIN' },
      '2': { id: '2', email: 'john@agrinova.com', name: 'John Field Agent', role: 'FIELD_AGENT' }
    }
    
    const user = users[session.userId]

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}
