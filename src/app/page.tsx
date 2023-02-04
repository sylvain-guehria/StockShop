import { redirect } from 'next/navigation';
import { getUserInServerComponant } from 'supabase/getUserInServerComponant';

import PublicLayout from '@/layouts/PublicLayout';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { marketplaceRoutes } from '@/routes/marketplaceRoutes';

import Home from './(home)/Home';

export const revalidate = 600;

const HomePage = async () => {
  const userProfile = await getUserInServerComponant();

  if (userProfile && userProfile.hasInventoryManagementServiceActivated) {
    redirect(inventoryManagementRoutes.dashboard.path);
  }

  if (userProfile && !userProfile.hasInventoryManagementServiceActivated) {
    redirect(marketplaceRoutes.marketplace.path);
  }

  return (
    <PublicLayout>
      <Home />
    </PublicLayout>
  );
};

export default HomePage;
