import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'agrinova-super-secret-key-2026'

// Simple in-memory user store (for demo)
const users = new Map()

// Pre-add a demo user
users.set('demo@agrinova.com', {
  id: '1',
  name: 'Demo User',
  email: 'demo@agrinova.com',
  password: 'Demo123!',
  role: 'user'
})

// Rate limiting
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body

    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
    const attempts = loginAttempts.get(clientIp)
    
    if (attempts && attempts.count >= 5 && Date.now() - attempts.lastAttempt < 15 * 60 * 1000) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      )
    }

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = users.get(email.toLowerCase())
    
    if (!user || user.password !== password) {
      loginAttempts.set(clientIp, {
        count: (attempts?.count || 0) + 1,
        lastAttempt: Date.now()
      })
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate token
    const tokenPayload = { userId: user.id, email: user.email, role: user.role }
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' })

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: 'free'
      }
    })

    // Set cookie
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}
