import type { Metadata } from 'next';

import BasicLayout from '@/components/layouts/BasicLayout';

// Static metadata
export const metadata: Metadata = {
  title: 'Mon compte',
  description: 'Gestion du compte utilisateur',
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <BasicLayout bgColor="bg-gray-50">{children}</BasicLayout>;
};

export default Layout;
