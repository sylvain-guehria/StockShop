import createServerSupabaseClient from 'supabase/server/supabase-server';

import PublicLayout from '@/layouts/PublicLayout';

import Base from '../components/06-template/Base';

export const revalidate = 0;

const HomePage = async () => {
  const supabase = createServerSupabaseClient();
  const user = await supabase.auth.getSession();

  // const uid = await validateUser();

  // if (uid) {
  //   const user = await userRepository.getById(uid);
  //   if (user.needToSeeFirstConnectionModal()) {
  //     return <FirstConnectionModalWithProviders user={{ ...user }} />;
  //   }
  //   if (user.isSeller()) {
  //     redirect(inventoryManagementRoutes.myInventory.path);
  //   }
  //   redirect(marketplaceRoutes.marketplace.path);
  // }

  // await adminAuthClient.getUserById()

  console.log('in home SSR--------------------------- user', user);

  return (
    <PublicLayout>
      <Base />
    </PublicLayout>
  );
};

export default HomePage;
