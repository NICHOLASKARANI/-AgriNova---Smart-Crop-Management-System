import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { fieldId, newStage, notes } = await request.json()

    const field = await prisma.field.findUnique({
      where: { id: fieldId },
    })

    if (!field) {
      return NextResponse.json({ message: 'Field not found' }, { status: 404 })
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (user?.role !== 'ADMIN' && field.agentId !== user?.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    await prisma.update.create({
      data: {
        fieldId,
        userId: decoded.userId,
        newStage,
        notes,
        healthScore: Math.floor(Math.random() * 30) + 70,
      },
    })

    const updatedField = await prisma.field.update({
      where: { id: fieldId },
      data: { currentStage: newStage },
    })

    return NextResponse.json({
      message: 'Field updated successfully',
      field: updatedField,
    })
  } catch (error) {
    console.error('Update field error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}