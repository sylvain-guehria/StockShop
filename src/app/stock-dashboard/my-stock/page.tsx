import { redirect } from 'next/navigation';

import MyStock from '@/components/01-stockManagement/my-stock/MyStock';
import { mainRoutes } from '@/routes/mainRoutes';
import { getUserInventoriesUseCase } from '@/usecases/usecases';
import { validateUser } from '@/utils/validateUserServerSide';

const MyStockPage = async () => {
  const uid = await validateUser();
  if (!uid) {
    redirect(mainRoutes.login.path);
    return null;
  }
  const stocks = await getUserInventoriesUseCase(uid);
  const defaultInventoryUid = stocks.find((stock) => stock.isDefaultStock)?.uid;
  const items = await getItemsByInventoryUid(defaultInventoryUid);
  return <MyStock stocks={stocks} items={items} />;
};

export default MyStockPage;
