import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Simple in-memory storage
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword } = await request.json()

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    // Check if user exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date()
    }
    users.push(newUser)

    console.log('User registered:', email)

    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful!' 
    }, { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
