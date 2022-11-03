'use client';

import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import StockManagementHeader from '@/components/01-stockManagement/header/StockManagementHeader';
import StockManagementSideBar from '@/components/01-stockManagement/sidebar/StockManagementSideBar';
import Spinner from '@/components/04-lib/spinner/Spinner';
import Providers from '@/hooks/Providers';
import { useAuth } from '@/hooks/useAuth';

const DynamicFirstConnectionModal = dynamic(
  () =>
    import('@/components/05-modals/firstConnectionModal/FirstConnectionModal'),
  {
    suspense: true,
  }
);

type Props = {
  children: ReactNode;
};

const StockManagementLayout: FC<Props> = ({ children }) => {
  const { user, isUserLoading } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const displayFirstConnectionModal =
    user.isLoggedIn() && user.needToSeeFirstConnectionModal();

  if (isUserLoading) return <Spinner />;

  if (!user.isLoggedIn() || !user.isSeller()) {
    redirect('404');
    return null;
  }

  return (
    <div className="h-screen bg-gray-100">
      {displayFirstConnectionModal && <DynamicFirstConnectionModal />}
      <div className="min-h-full">
        <StockManagementSideBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex flex-1 flex-col lg:pl-64">
          <StockManagementHeader setSidebarOpen={setSidebarOpen} />
          {children}
        </div>
      </div>
    </div>
  );
};

const StockManagementLayoutWithProviders: FC<Props> = ({ children }) => {
  return (
    <Providers>
      <StockManagementLayout>{children}</StockManagementLayout>
    </Providers>
  );
};

export default StockManagementLayoutWithProviders;
