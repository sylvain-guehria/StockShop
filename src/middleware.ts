import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest as NextRequestType } from 'next/server';
import { NextResponse } from 'next/server';

import { inventoryManagementRoutes } from './routes/inventoryManagementRoutes';
import { mainRoutes } from './routes/mainRoutes';
import { marketplaceRoutes } from './routes/marketplaceRoutes';
import type { Database } from './types/supabase';

export async function middleware(req: NextRequestType) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });

  const session = await supabase.auth?.getSession();
  const userId = session?.data?.session?.user?.id;

  const result = userId
    ? await supabase.from('profiles').select('*').eq('id', userId).single()
    : null;

  const userProfile = result?.data;

  // LOGGEDIN USER
  if (userProfile) {
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
  if (!userProfile) {
    if (
      pathname.startsWith(inventoryManagementRoutes.dashboard.path) ||
      pathname.startsWith(mainRoutes.profile.path)
    ) {
      return NextResponse.redirect(new URL(mainRoutes.login.path, req.url));
    }
  }

  return res;
}
