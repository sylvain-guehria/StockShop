import BasicLayout from '@/components/layouts/BasicLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BasicLayout>{children}</BasicLayout>;
}
