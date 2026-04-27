import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { memoryStore } from '@/lib/memoryStore'

const JWT_SECRET = process.env.JWT_SECRET || 'agrinova-secret-key-2026'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    
    const user = memoryStore.findUserByEmail(decoded.email)
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
