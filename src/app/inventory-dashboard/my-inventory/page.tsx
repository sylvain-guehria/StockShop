import { redirect } from 'next/navigation';

import MyInventory from '@/components/01-inventoryManagement/my-inventory/MyInventory';
import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

const MyInventoryPage = async () => {
  const userUid = await validateUser();
  if (!userUid) {
    redirect(mainRoutes.login.path);
    return null;
  }
  return <MyInventory />;
};

export default MyInventoryPage;
