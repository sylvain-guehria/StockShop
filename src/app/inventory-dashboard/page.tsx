import { redirect } from 'next/navigation';

import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
// import InventoryDashboardHome from '@/components/01-inventoryManagement/home/InventoryDashboardHome';
import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

const InventoryDashboardPage = async () => {
  const uid = await validateUser();
  if (!uid) {
    redirect(mainRoutes.login.path);
    return null;
  }
  redirect(inventoryManagementRoutes.myInventory.path);
  return null;
  // Will redirect to home when a home will be available
  // return <InventoryDashboardHome />;
};

export default InventoryDashboardPage;
