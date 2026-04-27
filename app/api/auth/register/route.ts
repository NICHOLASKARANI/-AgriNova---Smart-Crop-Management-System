import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { dbOps } from '@/lib/dbOps'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, confirmPassword, phone, location } = body

    console.log('?? Registration attempt:', { name, email })

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
    const existingUser = dbOps.findUserByEmail(email)
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
      phone: phone || '',
      location: location || ''
    }

    dbOps.createUser(newUser)
    console.log('? User registered:', email)

    // Add welcome notification
    dbOps.addNotification(
      Date.now().toString(),
      newUser.id,
      'Welcome to AgriNova! Start exploring your dashboard.'
    )

    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful! Please login.' 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
