import PublicLayout from '@/components/layouts/PublicLayout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
