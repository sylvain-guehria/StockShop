import StockDashboard from '@/components/01-stockManagement/Dashboard/StockDashboard';
import StockManagementLayout from '@/layouts/StockManagementLayout';

const StockDashboardPage = () => {
  return (
    <StockManagementLayout>
      <StockDashboard />
    </StockManagementLayout>
  );
};

export default StockDashboardPage;
