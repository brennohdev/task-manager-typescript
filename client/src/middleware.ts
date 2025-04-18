import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const isAuth = Boolean(session);

  const { pathname } = request.nextUrl;

  const publicPaths = ['/login', '/register', '/favicon.ico'];

  const isPublic = publicPaths.includes(pathname) || pathname.startsWith('/_next');

  if (!isAuth && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuth && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // protege todas as rotas
};
