import StockManagementLayout from '@/layouts/StockManagementLayout';

export default function stockManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StockManagementLayout>{children}</StockManagementLayout>;
}
