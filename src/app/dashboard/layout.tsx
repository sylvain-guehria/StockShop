import InventoryLayout from '@/components/layouts/InventoryLayout';

export const revalidate = 0;

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <InventoryLayout>{children}</InventoryLayout>;
};
export default Layout;
