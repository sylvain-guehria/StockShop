'use client';

import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import InventoryManagementHeader from '@/components/01-inventoryManagement/header/InventoryManagementHeader';
import InventoryManagementSideBar from '@/components/01-inventoryManagement/sidebar/InventoryManagementSideBar';

type Props = {
  children: ReactNode;
};

const InventoryManagementLayout: FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100">
      <div className="min-h-full">
        <InventoryManagementSideBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex flex-1 flex-col lg:pl-64">
          <InventoryManagementHeader setSidebarOpen={setSidebarOpen} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagementLayout;
