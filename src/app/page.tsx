import { userRepository } from 'di';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import PublicLayout from '@/layouts/PublicLayout';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { marketpalceRoutes } from '@/routes/marketpalceRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

import Base from '../components/06-template/Base';

const DynamicFirstConnectionModal = dynamic(
  () => import('../components/05-modals/FirstConnectionModal'),
  {
    suspense: true,
  }
);

const HomePage = async () => {
  const uid = await validateUser();

  if (uid) {
    const user = await userRepository.getById(uid);
    if (user.needToSeeFirstConnectionModal()) {
      return <DynamicFirstConnectionModal />;
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
