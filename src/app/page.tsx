import { userRepository } from 'di';
import { redirect } from 'next/navigation';

import PublicLayout from '@/layouts/PublicLayout';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { marketpalceRoutes } from '@/routes/marketpalceRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

import FirstConnectionModalWithProviders from '../components/05-modals/FirstConnectionModal';
import Base from '../components/06-template/Base';

const HomePage = async () => {
  const uid = await validateUser();

  if (uid) {
    const user = await userRepository.getById(uid);
    if (user.needToSeeFirstConnectionModal()) {
      return <FirstConnectionModalWithProviders />;
    }
    if (user.isSeller()) {
      redirect(inventoryManagementRoutes.myInventory.path);
    }
    redirect(marketpalceRoutes.marketplace.path);
  }

  return (
    <PublicLayout>
      <Base />
    </PublicLayout>
  );
};

export default HomePage;
