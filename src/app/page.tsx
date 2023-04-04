import BasicLayout from '@/components/layouts/BasicLayout';

import Home from './(home)/Home';

export const revalidate = 0;

const HomePage = async () => {
  // const HomePage = async ({
  //   searchParams,
  // }: {
  //   searchParams: { [key: string]: string | string[] | undefined };
  // }) => {
  // const userProfile = await getUserInServerComponant();

  // const noRedirect = searchParams['no-redirect'] === 'true';

  // const isLoggedIn = !!userProfile;

  // if (!noRedirect && isLoggedIn) {
  //   if (userProfile.hasInventoryManagementServiceActivated) {
  //     redirect(inventoryManagementRoutes.myInventory.path);
  //   } else {
  //     redirect(marketplaceRoutes.marketplace.path);
  //   }
  // }

  return (
    <BasicLayout>
      <Home />
    </BasicLayout>
  );
};

export default HomePage;
