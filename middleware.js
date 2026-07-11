import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Public paths
  const publicPaths = ['/login', '/api/auth/login'];
  const isPublicPath = publicPaths.some(p => path.startsWith(p));
  
  // API paths that need protection
  const protectedApiPaths = ['/api/staff', '/api/departments'];
  const isProtectedApi = protectedApiPaths.some(p => path.startsWith(p));
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  
  // If trying to access protected route without token
  if (!token) {
    // For API routes, return 401
    if (isProtectedApi) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // For admin routes, redirect to login
    if (path.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // For public routes, allow
    return NextResponse.next();
  }
  
  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
  
  // For admin routes, check if user is admin
  if (path.startsWith('/admin') && decoded.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // If logged in and trying to access login page, redirect to admin
  if (path === '/login' && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/api/staff/:path*',
    '/api/departments/:path*',
  ],
};