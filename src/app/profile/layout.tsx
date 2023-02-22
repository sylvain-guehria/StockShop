import BasicLayout from '@/components/layouts/BasicLayout';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <BasicLayout>{children}</BasicLayout>;
};

export default Layout;
