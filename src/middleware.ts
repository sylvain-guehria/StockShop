import type { NextRequest as NextRequestType } from 'next/server';
import { NextResponse } from 'next/server';
import { sessionCookieName } from 'superbase/constant';

import { inventoryManagementRoutes } from './routes/inventoryManagementRoutes';
import { mainRoutes } from './routes/mainRoutes';

export function middleware(request: NextRequestType) {
  const sessionCookie = request.cookies.get(sessionCookieName);
  const { pathname } = request.nextUrl;

  // LOGGEDIN USER
  if (sessionCookie) {
    if (
      pathname === mainRoutes.login.path ||
      pathname === mainRoutes.register.path
    ) {
      return NextResponse.redirect(new URL(mainRoutes.home.path, request.url));
    }
  }

  // VISITOR USER
  if (!sessionCookie) {
    if (pathname.includes(inventoryManagementRoutes.dashboard.path)) {
      return NextResponse.redirect(new URL(mainRoutes.login.path, request.url));
    }
  }

  return NextResponse.next();
}
