import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongodb'
import { User } from '@/lib/db/models/User'
import { memoryStorage } from '@/lib/memoryStorage'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'agrinova-super-secret-key-2026'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    let user = null
    let usingMongoDB = false

    // Try MongoDB first
    try {
      await connectDB()
      user = await User.findOne({ email: email.toLowerCase() })
      if (user) usingMongoDB = true
    } catch (mongoError) {
      console.log('?? MongoDB unavailable, using memory storage')
    }

    // Try memory storage if MongoDB didn't find user
    if (!user) {
      user = memoryStorage.findUserByEmail(email.toLowerCase())
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Update last login
    user.lastLogin = new Date()
    if (usingMongoDB && user.save) {
      await user.save()
    }

    // Generate token
    const tokenPayload = { userId: user._id.toString(), email: user.email, role: user.role }
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' })

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription || 'free'
      }
    })

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7
    })

    console.log('? Login successful for:', email)
    return response

  } catch (error: any) {
    console.error('? Login error:', error)
    return NextResponse.json(
      { error: error.message || 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}
