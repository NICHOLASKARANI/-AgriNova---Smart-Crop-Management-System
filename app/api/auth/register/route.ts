import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory user store (for demo)
const users = new Map()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, confirmPassword, phone, location } = body

    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate name
    if (name.length < 2 || name.length > 50) {
      return NextResponse.json(
        { error: 'Name must be 2-50 characters' },
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

    // Check if user already exists
    if (users.has(email.toLowerCase())) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
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

    // Store user (in production, hash password and save to database)
    const user = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password, // In production, this should be hashed!
      phone: phone || '',
      location: location || '',
      role: 'user',
      createdAt: new Date().toISOString()
    }
    
    users.set(email.toLowerCase(), user)
    
    console.log('User registered:', { name, email })

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Please login.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}
