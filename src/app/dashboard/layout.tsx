import InventoryLayout from '@/components/layouts/InventoryLayout';
import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

export const revalidate = 0;

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserInServerComponant();

  return <InventoryLayout user={user}>{children}</InventoryLayout>;
};
export default Layout;
