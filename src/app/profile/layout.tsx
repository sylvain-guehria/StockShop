import MarketplaceLayout from '@/layouts/MarketplaceLayout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketplaceLayout>{children}</MarketplaceLayout>;
}
