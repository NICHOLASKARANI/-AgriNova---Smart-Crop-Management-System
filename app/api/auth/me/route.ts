import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  
  if (session === 'admin') {
    return NextResponse.json({ user: { id: '1', email: 'admin@agrinova.com', name: 'Admin User', role: 'ADMIN' } })
  }
  
  if (session === 'agent') {
    return NextResponse.json({ user: { id: '2', email: 'john@agrinova.com', name: 'John Agent', role: 'FIELD_AGENT' } })
  }
  
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}
