import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur est authentifié via NextAuth (JWT)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  const { pathname } = request.nextUrl;

  // Routes qui nécessitent une authentification
  const protectedPaths = ['/dashboards', '/settings'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  // Routes accessibles uniquement aux non-authentifiés
  const ghostPaths = ['/login'];
  const isGhostPath = ghostPaths.some(path => pathname.startsWith(path));

  // Rediriger les utilisateurs non authentifiés vers login
  if (isProtectedPath && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Rediriger les utilisateurs authentifiés loin des pages ghost
  if (isGhostPath && token) {
    const redirect = request.nextUrl.searchParams.get('redirect');
    const url = request.nextUrl.clone();
    url.pathname = redirect || '/dashboards/home';
    url.searchParams.delete('redirect');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
