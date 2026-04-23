import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory store for reset tokens (same as above)
const resetTokens = new Map()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, newPassword } = body

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      )
    }

    // Check if token exists and is valid
    const tokenData = resetTokens.get(token)
    
    if (!tokenData) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    if (Date.now() > tokenData.expiresAt) {
      resetTokens.delete(token)
      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // In production, update the user's password in the database here
    // For demo, just delete the token
    resetTokens.delete(token)

    return NextResponse.json({
      success: true,
      message: 'Password reset successful! Please login with your new password.'
    })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    )
  }
}
