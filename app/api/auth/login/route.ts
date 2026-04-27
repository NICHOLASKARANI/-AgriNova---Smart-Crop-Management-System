import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongodb'
import { User } from '@/lib/db/models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'agrinova-super-secret-key-2026'

// Rate limiting
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
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

    // Find user in MongoDB
    const user = await User.findOne({ email: email.toLowerCase() })
    
    if (!user) {
      loginAttempts.set(clientIp, {
        count: (attempts?.count || 0) + 1,
        lastAttempt: Date.now()
      })
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      loginAttempts.set(clientIp, {
        count: (attempts?.count || 0) + 1,
        lastAttempt: Date.now()
      })
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const tokenPayload = { userId: user._id.toString(), email: user.email, role: user.role }
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' })

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription
      }
    })

    // Set cookie
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7
    })

    console.log('? User logged in:', { email: user.email, role: user.role })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}
