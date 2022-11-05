'use client';

import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import StockManagementHeader from '@/components/01-stockManagement/header/StockManagementHeader';
import StockManagementSideBar from '@/components/01-stockManagement/sidebar/StockManagementSideBar';

type Props = {
  children: ReactNode;
};

const StockManagementLayout: FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100">
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

export default StockManagementLayout;
