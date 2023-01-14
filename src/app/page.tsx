import PublicLayout from '@/layouts/PublicLayout';

import Base from '../components/06-template/Base';

const HomePage = async () => {
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

  // console.log('in home SSR---------------------------', { data, error });

  return (
    <PublicLayout>
      <Base />
    </PublicLayout>
  );
};

export default HomePage;
