import BasicLayout from '@/components/layouts/BasicLayout';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <BasicLayout bgColor="bg-gray-50">{children}</BasicLayout>;
};

export default Layout;
