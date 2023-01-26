import { redirect } from 'next/navigation';
import { getUserInServerComponant } from 'supabase/getUserInServerComponant';

import PublicLayout from '@/layouts/PublicLayout';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { marketplaceRoutes } from '@/routes/marketplaceRoutes';

import Base from '../components/06-template/Base';

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
      <Base />
    </PublicLayout>
  );
};

export default HomePage;
