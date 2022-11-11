import { redirect } from 'next/navigation';

import MyInventory from '@/components/01-inventoryManagement/my-inventory/MyInventory';
import type { Inventory } from '@/modules/inventory/inventoryType';
import { mainRoutes } from '@/routes/mainRoutes';
import { getUserInventoriesUseCase } from '@/usecases/usecases';
import { validateUser } from '@/utils/validateUserServerSide';

const MyInventoryPage = async () => {
  const uid = await validateUser();
  if (!uid) {
    redirect(mainRoutes.login.path);
    return null;
  }
  const inventories = await getUserInventoriesUseCase(uid);
  const defaultInventoryUid = inventories.find(
    (inventory: Inventory) => inventory.isDefaultInventory
  )?.uid;
  const items = await getItemsByInventoryUid(defaultInventoryUid);
  return <MyInventory inventories={inventories} items={items} />;
};

export default MyInventoryPage;
