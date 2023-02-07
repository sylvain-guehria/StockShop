import MarketplaceLayout from '@/components/layouts/MarketplaceLayout';
import type { User } from '@/modules/user/userType';
import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userProfile = await getUserInServerComponant();

  return (
    <MarketplaceLayout userProfile={userProfile as User}>
      {children}
    </MarketplaceLayout>
  );
};

export default Layout;
