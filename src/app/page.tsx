import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import BasicLayout from '@/components/layouts/BasicLayout';
import type { User } from '@/modules/user/userType';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { marketplaceRoutes } from '@/routes/marketplaceRoutes';
import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

import Home from './(home)/Home';

const DynamicFirstConnectionModal = dynamic(
  () => import('../components/FirstConnectionModal')
);

export const revalidate = 600;

const HomePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const userProfile = await getUserInServerComponant();

  const noRedirect = searchParams['no-redirect'] === 'true';

  if (userProfile && !userProfile.hasSeenFirstConnectionModal) {
    return <DynamicFirstConnectionModal user={userProfile as User} />;
  }

  const isLoggedIn = !!userProfile;

  if (!noRedirect && isLoggedIn) {
    if (userProfile.hasInventoryManagementServiceActivated) {
      redirect(inventoryManagementRoutes.myInventory.path);
    } else {
      redirect(marketplaceRoutes.marketplace.path);
    }
  }

  return (
    <BasicLayout>
      <Home isLoggedIn={!!userProfile} />
    </BasicLayout>
  );
};

export default HomePage;
