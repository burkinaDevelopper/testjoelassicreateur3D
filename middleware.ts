import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur est authentifié via NextAuth (JWT)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = request.nextUrl;

  // Routes qui nécessitent une authentification
  const protectedPaths = ['/dashboards', '/settings', '/mon-espace'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  // Espace apprenant (is_admin: 0)
  const isMonEspacePath = pathname.startsWith('/mon-espace');
  // Espace réservé aux admins
  const isAdminOnlyPath = pathname.startsWith('/dashboards');

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

  if (isProtectedPath && token) {
    const isVerified = Boolean(token.email_verified_at);
    const isAdmin = Boolean(token.is_admin);

    // Email non vérifié -> bloqué en dehors de /verify-email
    if (!isVerified) {
      const url = request.nextUrl.clone();
      url.pathname = '/verify-email';
      return NextResponse.redirect(url);
    }

    // Apprenant vérifié qui tente d'accéder à l'espace admin -> mon-espace
    if (isAdminOnlyPath && !isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = '/mon-espace';
      return NextResponse.redirect(url);
    }

    // Admin qui tente d'accéder à mon-espace (et ses sous-pages) -> dashboards
    if (isMonEspacePath && isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboards/home';
      return NextResponse.redirect(url);
    }
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
