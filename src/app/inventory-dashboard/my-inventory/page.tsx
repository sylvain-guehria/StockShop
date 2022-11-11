import { redirect } from 'next/navigation';

import MyInventory from '@/components/01-inventoryManagement/my-inventory/MyInventory';
import { mainRoutes } from '@/routes/mainRoutes';
import { getUserInventoriesUseCase } from '@/usecases/usecases';
import { validateUser } from '@/utils/validateUserServerSide';

const MyInventoryPage = async () => {
  const userUid = await validateUser();
  if (!userUid) {
    redirect(mainRoutes.login.path);
    return null;
  }
  const inventories = await getUserInventoriesUseCase({ userUid });

  // const items = await getItemsByInventoryUid(defaultInventoryUid);
  return <MyInventory inventories={inventories} items={[]} />;
};

export default MyInventoryPage;
