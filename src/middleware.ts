import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest as NextRequestType } from 'next/server';
import { NextResponse } from 'next/server';

import { inventoryManagementRoutes } from './routes/inventoryManagementRoutes';
import { mainRoutes } from './routes/mainRoutes';
import { marketplaceRoutes } from './routes/marketplaceRoutes';

export async function middleware(req: NextRequestType) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const session = await supabase.auth?.getSession();
  const user = session?.data?.session?.user;

  const { data: userProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();

  // LOGGEDIN USER
  if (user) {
    if (
      pathname.startsWith(mainRoutes.login.path) ||
      pathname.startsWith(mainRoutes.register.path) ||
      pathname.startsWith(mainRoutes.resetPassword.path)
    ) {
      return NextResponse.redirect(new URL(mainRoutes.home.path, req.url));
    }

    if (
      pathname.startsWith(inventoryManagementRoutes.dashboard.path) &&
      userProfile?.hasSeenFirstConnectionModal &&
      !userProfile?.hasInventoryManagementServiceActivated
    ) {
      return NextResponse.redirect(
        new URL(
          `${mainRoutes.profile.path}/?tab=settings&displayHelpIM=true`,
          req.url
        )
      );
    }
    if (
      pathname === mainRoutes.home.path &&
      userProfile?.hasSeenFirstConnectionModal
    ) {
      if (userProfile?.hasInventoryManagementServiceActivated) {
        return NextResponse.redirect(
          new URL(inventoryManagementRoutes.myInventory.path, req.url)
        );
      }
      return NextResponse.redirect(
        new URL(marketplaceRoutes.marketplace.path, req.url)
      );
    }
  }

  // VISITOR USER
  if (!user) {
    if (
      pathname.startsWith(inventoryManagementRoutes.dashboard.path) ||
      pathname.startsWith(mainRoutes.profile.path)
    ) {
      return NextResponse.redirect(new URL(mainRoutes.login.path, req.url));
    }
  }

  return res;
}
