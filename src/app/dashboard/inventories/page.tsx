import { redirect } from 'next/navigation';

import Inventories from '@/components/01-dashboard/inventories/MyInventory';
import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

const InventoriesPages = async () => {
  const userUid = await validateUser();
  if (!userUid) {
    redirect(mainRoutes.login.path);
  }
  return <Inventories />;
};

export default InventoriesPages;
