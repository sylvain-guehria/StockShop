import { redirect } from 'next/navigation';
import { getUserInServerComponant } from 'supabase/getUserInServerComponant';

import InventoryManagementLayout from '@/components/layouts/InventoryManagementLayout';
import type { User } from '@/modules/user/userType';
import { mainRoutes } from '@/routes/mainRoutes';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userProfile = await getUserInServerComponant();

  if (!userProfile) {
    redirect(mainRoutes.login.path);
  }

  if (!userProfile.hasInventoryManagementServiceActivated) {
    redirect(`${mainRoutes.profile.path}/?tab=settings&displayHelpIM=true`);
  }
  return (
    <InventoryManagementLayout userProfile={userProfile as User}>
      {children}
    </InventoryManagementLayout>
  );
};
export default Layout;
