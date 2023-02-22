import BasicLayout from '@/components/layouts/BasicLayout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BasicLayout>{children}</BasicLayout>;
}
