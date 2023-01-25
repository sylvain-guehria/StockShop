import { redirect } from 'next/navigation';
import createServerCompSupabaseClient from 'supabase/server/supabase-server';
import { TableNames } from 'supabase/tables/tableNames';

import PublicLayout from '@/layouts/PublicLayout';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { marketplaceRoutes } from '@/routes/marketplaceRoutes';

import Base from '../components/06-template/Base';

export const revalidate = 600;

const HomePage = async () => {
  const supabase = createServerCompSupabaseClient();
  const { data } = await supabase.auth.getUser();
  let userProfile = null;

  if (data.user?.id) {
    const { data: profileData } = await supabase
      .from(TableNames.PROFILES)
      .select('*')
      .eq('id', data.user.id)
      .single();
    userProfile = profileData || null;
  }

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
