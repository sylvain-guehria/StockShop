import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest as NextRequestType } from 'next/server';
import { NextResponse } from 'next/server';

import { inventoryManagementRoutes } from './routes/inventoryManagementRoutes';
import { mainRoutes } from './routes/mainRoutes';

export async function middleware(req: NextRequestType) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const session = await supabase.auth.getSession();
  const user = session.data.session?.user;

  // LOGGEDIN USER
  if (user) {
    if (
      pathname.startsWith(mainRoutes.login.path) ||
      pathname.startsWith(mainRoutes.register.path) ||
      pathname.startsWith(mainRoutes.resetPassword.path)
    ) {
      return NextResponse.redirect(new URL(mainRoutes.home.path, req.url));
    }
  }

  // VISITOR USER
  if (!user) {
    if (pathname.startsWith(inventoryManagementRoutes.dashboard.path)) {
      return NextResponse.redirect(new URL(mainRoutes.login.path, req.url));
    }
  }

  return res;
}

// export const config = {
//   matcher: ['/optional-session', '/required-session', '/realtime'],
// }
