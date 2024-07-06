import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(request) {
  let url = new URL(request.url);
  let pathname = url.pathname;

  // Get token from request
  let token = await getToken({ req: request });
  let userPrivateRoutes = ['/'];
  let adminPrivateRoutes = ['/dashboard'];
  let publicRoutes = ['/', '/login','/signup','/signin']

  // If user or admin is logged in, they should not access login, register, or signup pages
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect to login if no token is found and trying to access private routes
  if (
    (token === null && userPrivateRoutes.includes(pathname)) ||
    (token === null && adminPrivateRoutes.includes(pathname))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Get user from token
  let user = token?.user;

  // If user is a regular user and tries to access an admin route, redirect to current path
  if (adminPrivateRoutes.includes(pathname) && user?.role === 'user') {
    return NextResponse.redirect(new URL(request.headers.get('referer') || '/', request.url));
  }

  // If user is an admin and tries to access a user route, redirect to current path
  if (userPrivateRoutes.includes(pathname) && user?.role === 'admin') {
    return NextResponse.redirect(new URL(request.headers.get('referer') || '/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/login','/signup','/signin'],
};
