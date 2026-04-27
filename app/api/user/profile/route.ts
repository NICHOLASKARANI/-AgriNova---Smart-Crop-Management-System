import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { dbOps } from '@/lib/dbOps'

const JWT_SECRET = process.env.JWT_SECRET || 'agrinova-secret-key-2026'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    const user = dbOps.findUserById(decoded.userId)
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const orders = dbOps.getOrdersByUser(user.id)
    const wishlist = dbOps.getWishlist(user.id)
    const notifications = dbOps.getNotifications(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location
      },
      orders,
      wishlist,
      notifications
    })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    const body = await request.json()
    
    dbOps.updateUser(decoded.userId, body)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
