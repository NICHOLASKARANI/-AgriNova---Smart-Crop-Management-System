import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value
  const { pathname } = request.nextUrl

  // Public paths
  if (pathname === '/login' || pathname === '/') {
    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie)
        const redirectUrl = session.role === 'ADMIN' ? '/admin' : '/agent'
        return NextResponse.redirect(new URL(redirectUrl, request.url))
      } catch (error) {
        return NextResponse.next()
      }
    }
    return NextResponse.next()
  }

  // Protected routes
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const session = JSON.parse(sessionCookie)
    
    if (pathname.startsWith('/admin') && session.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/agent', request.url))
    }
    
    if (pathname.startsWith('/agent') && session.role !== 'FIELD_AGENT') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    
    return NextResponse.next()
  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('session')
    return response
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
