import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { fileStorage } from '@/lib/fileStorage'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, confirmPassword } = body

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
    const existingUser = fileStorage.findUserByEmail(email.toLowerCase())
    if (existingUser) {
      console.log('? User already exists:', email)
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user',
      createdAt: new Date().toISOString()
    }

    fileStorage.addUser(newUser)
    console.log('? User registered successfully:', email)
    console.log('?? Total users:', fileStorage.getUsers().length)

    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful! Please login.' 
    }, { status: 201 })
    
  } catch (error) {
    console.error('? Registration error:', error)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
