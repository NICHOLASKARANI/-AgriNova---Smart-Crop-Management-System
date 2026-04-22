import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    const fields = await prisma.field.findMany({
      where: { agentId: decoded.userId },
    })

    const fieldsWithStatus = fields.map(field => {
      let status = 'ACTIVE'
      if (field.currentStage === 'HARVESTED') {
        status = 'COMPLETED'
      }
      return { ...field, status }
    })

    return NextResponse.json(fieldsWithStatus)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}