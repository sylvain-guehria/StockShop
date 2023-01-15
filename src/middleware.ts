import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest as NextRequestType } from 'next/server';
import { NextResponse } from 'next/server';
import { superBaseAuthTokenCookieName } from 'supabase/constant';

import { inventoryManagementRoutes } from './routes/inventoryManagementRoutes';
import { mainRoutes } from './routes/mainRoutes';

export async function middleware(req: NextRequestType) {
  const sessionCookie = req.cookies.get(superBaseAuthTokenCookieName);
  const { pathname } = req.nextUrl;

  // LOGGEDIN USER
  if (sessionCookie) {
    if (
      pathname.startsWith(mainRoutes.login.path) ||
      pathname.startsWith(mainRoutes.register.path) ||
      pathname.startsWith(mainRoutes.resetPassword.path)
    ) {
      return NextResponse.redirect(new URL(mainRoutes.home.path, req.url));
    }
  }

  // VISITOR USER
  if (!sessionCookie) {
    if (pathname.startsWith(inventoryManagementRoutes.dashboard.path)) {
      return NextResponse.redirect(new URL(mainRoutes.login.path, req.url));
    }
  }
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  await supabase.auth.getSession();

  return res;
}

// export const config = {
//   matcher: ['/optional-session', '/required-session', '/realtime'],
// }
