import { redirect } from 'next/navigation';

import InventoryLayout from '@/components/layouts/InventoryLayout';
import { mainRoutes } from '@/routes/mainRoutes';
import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userProfile = await getUserInServerComponant();

  if (!userProfile) {
    redirect(mainRoutes.login.path);
  }

  if (!userProfile.hasInventoryManagementServiceActivated) {
    redirect(`${mainRoutes.profile.path}/?tab=settings&displayHelpIM=true`);
  }
  return <InventoryLayout>{children}</InventoryLayout>;
};
export default Layout;
