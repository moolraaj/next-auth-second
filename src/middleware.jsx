import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export default async function middleware(request) {
  let url = new URL(request.url)
  let pathname = url.pathname

  if (pathname === '/login' || pathname === '/signup' ,pathname === '/register') {
    return NextResponse.next()
  }

  // Get token from request
  let token = await getToken({ req: request })
  let userPrivateRoutes = ['/']
  let adminPrivateRoutes = ['/dashboard']

  // Check if user and admin have no token and want to access both private routes, redirect to the login page
  if (
    (token === null && userPrivateRoutes.includes(pathname)) ||
    (token === null && adminPrivateRoutes.includes(pathname))
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Get user from token
  let user = token?.user

  // If user.role is user and wants to access the admin route, redirect to the /signin page
  if (adminPrivateRoutes.includes(pathname) && user?.role === 'user') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user.role is admin and wants to access the user route, redirect to the /login page
  if (userPrivateRoutes.includes(pathname) && user?.role === 'admin') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard', '/login', '/register', '/signup'],
}
