import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import PublicLayout from '@/components/layouts/PublicLayout';
import type { User } from '@/modules/user/userType';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { marketplaceRoutes } from '@/routes/marketplaceRoutes';
import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

import Home from './(home)/Home';

const DynamicFirstConnectionModal = dynamic(
  () => import('../components/FirstConnectionModal')
);

export const revalidate = 600;

const HomePage = async () => {
  const userProfile = await getUserInServerComponant();

  if (userProfile && !userProfile.hasSeenFirstConnectionModal) {
    return <DynamicFirstConnectionModal user={userProfile as User} />;
  }

  if (userProfile && userProfile.hasInventoryManagementServiceActivated) {
    redirect(inventoryManagementRoutes.myInventory.path);
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
