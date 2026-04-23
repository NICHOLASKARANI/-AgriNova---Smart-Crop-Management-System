import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { randomBytes } from 'crypto'

// Simple in-memory store for reset tokens (for demo purposes)
const resetTokens = new Map()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // For demo purposes, we'll just simulate the reset process
    // In production, you would check if the email exists in your database
    
    // Generate reset token
    const token = randomBytes(32).toString('hex')
    const expiresAt = Date.now() + 3600000 // 1 hour
    
    resetTokens.set(token, { email, expiresAt })

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || 'https://agrinova-rouge.vercel.app'}/reset-password?token=${token}`
    
    console.log('Password reset URL:', resetUrl)

    return NextResponse.json({
      success: true,
      message: 'Password reset link has been sent to your email.',
      resetUrl: resetUrl // For testing
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
