import InventoryLayout from '@/components/layouts/InventoryLayout';
import type { User } from '@/modules/user/userType';
import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

export const revalidate = 0;

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserInServerComponant();

  return <InventoryLayout user={user as User}>{children}</InventoryLayout>;
};
export default Layout;
