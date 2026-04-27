import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongodb'
import { User } from '@/lib/db/models/User'
import { memoryStorage } from '@/lib/memoryStorage'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    console.log('?? Registration attempt...')
    
    const body = await request.json()
    const { name, email, password, confirmPassword, phone, location } = body

    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }
    
    if (!/[A-Z]/.test(password)) {
      return NextResponse.json(
        { error: 'Password must have at least one uppercase letter' },
        { status: 400 }
      )
    }
    
    if (!/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: 'Password must have at least one number' },
        { status: 400 }
      )
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    let newUser = null
    let usingMongoDB = false

    // Try MongoDB first
    try {
      await connectDB()
      const existingUser = await User.findOne({ email: email.toLowerCase() })
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }

      newUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone: phone || '',
        location: location || '',
        role: 'user',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      usingMongoDB = true
      console.log('? User saved to MongoDB')
    } catch (mongoError) {
      console.log('?? MongoDB unavailable, using memory storage')
      
      // Check in memory storage
      const existingUser = memoryStorage.findUserByEmail(email.toLowerCase())
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }

      newUser = memoryStorage.createUser({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone: phone || '',
        location: location || '',
        role: 'user',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    console.log('? Registration successful:', { email, usingMongoDB })

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Please login.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }, { status: 201 })
    
  } catch (error: any) {
    console.error('? Registration error:', error)
    return NextResponse.json(
      { error: error.message || 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}
