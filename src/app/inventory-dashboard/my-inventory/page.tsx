import { productRepository } from 'di';
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
  const inventories = await getUserInventoriesUseCase(userUid);

  if (inventories.length === 0) throw new Error('No inventories found');

  const defaultInventoryUid = inventories.find(
    (inventory) => inventory.isDefaultInventory
  )?.uid;

  const inventoryUid = defaultInventoryUid || (inventories[0]?.uid as string);

  const products = await productRepository.getProductsByUserUidAndInventoryUid(
    userUid,
    inventoryUid
  );

  return <MyInventory inventories={inventories} products={products} />;
};

export default MyInventoryPage;
