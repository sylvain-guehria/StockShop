import { redirect } from 'next/navigation';

import StockDashboard from '@/components/01-stockManagement/dashboard/StockDashboard';
import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/pagesUtils';

const StockDashboardPage = async () => {
  const uid = await validateUser();
  if (!uid) {
    redirect(mainRoutes.home.path);
    return null;
  }
  return <StockDashboard />;
};

export default StockDashboardPage;
