// middleware.ts
import { sessionCookieName } from 'firebaseFolder/constant';
import type { NextRequest as NextRequestType } from 'next/server';
import { NextResponse } from 'next/server';

import { inventoryManagementRoutes } from './routes/inventoryManagementRoutes';
import { mainRoutes } from './routes/mainRoutes';

export function middleware(request: NextRequestType) {
  const sessionCookie = request.cookies.get(sessionCookieName);
  const { pathname } = request.nextUrl;

  if (pathname.includes(inventoryManagementRoutes.dashboard.path)) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL(mainRoutes.login.path, request.url));
    }
    if (pathname === inventoryManagementRoutes.dashboard.path) {
      return NextResponse.redirect(
        new URL(inventoryManagementRoutes.myInventory.path, request.url)
      );
    }
  }

  if (
    (pathname === mainRoutes.login.path ||
      pathname === mainRoutes.register.path) &&
    sessionCookie
  ) {
    return NextResponse.redirect(new URL(mainRoutes.home.path, request.url));
  }

  return NextResponse.next();
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: [
    '/dashboard/:path*',
    mainRoutes.login.path,
    mainRoutes.register.path,
  ],
};
