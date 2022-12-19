import { userRepository } from 'di';
import { redirect } from 'next/navigation';

import PublicLayout from '@/layouts/PublicLayout';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { marketplaceRoutes } from '@/routes/marketplaceRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

import Base from '../components/06-template/Base';

const HomePage = async () => {
  const uid = await validateUser();

  if (uid) {
    const user = await userRepository.getById(uid);
    if (user.isSeller()) {
      redirect(inventoryManagementRoutes.myInventory.path);
    }
    redirect(marketplaceRoutes.marketplace.path);
  }

  return (
    <PublicLayout>
      <Base />
    </PublicLayout>
  );
};

export default HomePage;
