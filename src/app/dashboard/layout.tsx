import { getUserInServerComponant } from 'supabase/getUserInServerComponant';

import InventoryManagementLayout from '@/layouts/InventoryManagementLayout';
import type { User } from '@/modules/user/userType';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userProfile = await getUserInServerComponant();
  return (
    <InventoryManagementLayout userProfile={userProfile as User}>
      {children}
    </InventoryManagementLayout>
  );
};
export default Layout;
