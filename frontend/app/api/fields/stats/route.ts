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

    const fields = await prisma.field.findMany()

    const byStage = {
      PLANTED: fields.filter(f => f.currentStage === 'PLANTED').length,
      GROWING: fields.filter(f => f.currentStage === 'GROWING').length,
      READY: fields.filter(f => f.currentStage === 'READY').length,
      HARVESTED: fields.filter(f => f.currentStage === 'HARVESTED').length,
    }

    const byStatus = {
      ACTIVE: fields.filter(f => f.currentStage !== 'HARVESTED').length,
      AT_RISK: 0,
      COMPLETED: fields.filter(f => f.currentStage === 'HARVESTED').length,
    }

    return NextResponse.json({
      total: fields.length,
      byStage,
      byStatus,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}