import { redirect } from 'next/navigation';

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
  // const defaultInventoryUid = inventories.find(
  //   (inventory: Inventory) => inventory.isDefaultInventory
  // )?.uid;
  // const items = await getItemsByInventoryUid(defaultInventoryUid);
  // return <MyInventory inventories={inventories} items={items} />;
  return null;
};

export default MyInventoryPage;
