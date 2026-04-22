import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory user store for demo (replace with real DB later)
const users = [
  {
    id: '1',
    email: 'admin@agrinova.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'ADMIN'
  },
  {
    id: '2',
    email: 'john@agrinova.com',
    password: 'agent123',
    name: 'John Field Agent',
    role: 'FIELD_AGENT'
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    // Set a simple session cookie
    response.cookies.set('session', JSON.stringify({ userId: user.id, role: user.role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
