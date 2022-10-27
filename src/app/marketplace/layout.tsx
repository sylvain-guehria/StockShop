import MarketplaceLayout from '@/layouts/MarketplaceLayout';

export default function marketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketplaceLayout>{children}</MarketplaceLayout>;
}
