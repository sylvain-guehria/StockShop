import { redirect } from 'next/navigation';

import MarketplaceLayout from '@/layouts/MarketplaceLayout';
import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const uid = await validateUser();
  if (!uid) {
    redirect(mainRoutes.home.path);
  }
  return <MarketplaceLayout>{children}</MarketplaceLayout>;
}
