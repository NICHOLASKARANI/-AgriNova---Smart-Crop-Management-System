import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage that persists across requests
if (!global._users) {
  global._users = []
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, confirmPassword } = body

    console.log('Registration attempt:', { name, email })

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    // Check if user exists
    const existingUser = global._users.find((u: any) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Create user (store plain password for now - we'll add hashing later)
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In production, hash this!
      role: 'user',
      createdAt: new Date().toISOString()
    }

    global._users.push(newUser)
    console.log('User registered:', email)
    console.log('Total users:', global._users.length)

    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful! Please login.' 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
