import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest as NextRequestType } from 'next/server';
import { NextResponse } from 'next/server';
import { sessionCookieName } from 'supabase/constant';

import { inventoryManagementRoutes } from './routes/inventoryManagementRoutes';
import { mainRoutes } from './routes/mainRoutes';

export async function middleware(req: NextRequestType) {
  const sessionCookie = req.cookies.get(sessionCookieName);
  const { pathname } = req.nextUrl;

  // LOGGEDIN USER
  if (sessionCookie) {
    if (
      pathname === mainRoutes.login.path ||
      pathname === mainRoutes.register.path
    ) {
      return NextResponse.redirect(new URL(mainRoutes.home.path, req.url));
    }
  }

  // VISITOR USER
  if (!sessionCookie) {
    if (pathname.includes(inventoryManagementRoutes.dashboard.path)) {
      return NextResponse.redirect(new URL(mainRoutes.login.path, req.url));
    }
  }
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Set the session cookie, is this necessary ??
  // res.cookies.set(sessionCookieName, session?.access_token || '');

  return res;
}

// export const config = {
//   matcher: ['/optional-session', '/required-session', '/realtime'],
// }
