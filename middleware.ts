import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Public paths
  if (pathname === '/login' || pathname === '/') {
    if (token) {
      try {
        const decoded = verify(token, process.env.JWT_SECRET!) as any
        const redirectUrl = decoded.role === 'ADMIN' ? '/admin' : '/agent'
        return NextResponse.redirect(new URL(redirectUrl, request.url))
      } catch (error) {
        // Invalid token, let them go to login
      }
    }
    return NextResponse.next()
  }

  // Protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as any
    
    // Role-based routing
    if (pathname.startsWith('/admin') && decoded.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/agent', request.url))
    }
    
    if (pathname.startsWith('/agent') && decoded.role !== 'FIELD_AGENT') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    
    return NextResponse.next()
  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('token')
    return response
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}