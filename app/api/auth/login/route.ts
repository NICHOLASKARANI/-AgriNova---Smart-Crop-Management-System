import { NextRequest, NextResponse } from 'next/server'

// Shared storage
if (!global._users) {
  global._users = []
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log('Login attempt:', email)
    console.log('Total users in DB:', global._users.length)

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Find user
    const user = global._users.find((u: any) => u.email === email)
    
    if (!user) {
      console.log('User not found:', email)
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Check password (plain text for now)
    if (user.password !== password) {
      console.log('Invalid password for:', email)
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    console.log('Login successful:', email)

    // Create simple session token
    const sessionData = JSON.stringify({ userId: user.id, email: user.email, role: user.role })
    
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    })

    // Set session cookie
    response.cookies.set('session', sessionData, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 
    })

    return response
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
