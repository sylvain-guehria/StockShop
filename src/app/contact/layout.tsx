import PublicLayout from '@/layouts/PublicLayout';

export default function stockManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
