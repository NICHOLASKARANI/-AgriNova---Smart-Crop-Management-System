import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  const { pathname } = request.nextUrl

  // Public paths
  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return NextResponse.next()
  }

  // Protect dashboard routes
  if (!session && (pathname.startsWith('/admin') || pathname.startsWith('/agent'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
