import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { memoryStore } from '@/lib/memoryStore'

const JWT_SECRET = process.env.JWT_SECRET || 'agrinova-secret-key-2026'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log('?? Login attempt:', email)

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Find user
    const user = memoryStore.findUserByEmail(email.toLowerCase())
    console.log('?? User found:', user ? 'Yes' : 'No')

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    console.log('?? Password valid:', isValid)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    )

    console.log('? Login successful:', email)

    const response = NextResponse.json({
      success: true,
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    })

    response.cookies.set('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 
    })

    return response
    
  } catch (error) {
    console.error('? Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
