import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Demo authentication
    if (email === 'admin@agrinova.com' && password === 'admin123') {
      const response = NextResponse.json({ 
        user: { id: '1', email, name: 'Admin User', role: 'ADMIN' } 
      })
      response.cookies.set('session', 'admin', { httpOnly: true, maxAge: 86400 })
      return response
    }
    
    if (email === 'john@agrinova.com' && password === 'agent123') {
      const response = NextResponse.json({ 
        user: { id: '2', email, name: 'John Agent', role: 'FIELD_AGENT' } 
      })
      response.cookies.set('session', 'agent', { httpOnly: true, maxAge: 86400 })
      return response
    }
    
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
