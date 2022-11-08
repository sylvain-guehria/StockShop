import { redirect } from 'next/navigation';

// import StockDashboardHome from '@/components/01-stockManagement/home/StockDashboardHome';
import { mainRoutes } from '@/routes/mainRoutes';
import { stockManagementRoutes } from '@/routes/stockManagementRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

const StockDashboardPage = async () => {
  const uid = await validateUser();
  if (!uid) {
    redirect(mainRoutes.login.path);
    return null;
  }
  redirect(stockManagementRoutes.myStock.path);
  return null;
  // Will redirect to home when a home will be available
  // return <StockDashboardHome />;
};

export default StockDashboardPage;
