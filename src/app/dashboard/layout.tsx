import InventoryManagementLayout from '@/layouts/InventoryManagementLayout';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <InventoryManagementLayout>{children}</InventoryManagementLayout>;
};
export default Layout;
