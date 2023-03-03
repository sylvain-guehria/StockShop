'use client';

import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import InventoryManagementHeader from '@/app/dashboard/(layout)/InventoryManagementHeader';
import InventoryManagementSideBar from '@/app/dashboard/(layout)/InventoryManagementSideBar';

type Props = {
  children: ReactNode;
  bgColor?: string;
};

const InventoryLayout: FC<Props> = ({ children, bgColor }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideBarMini, setSideBarMini] = useState(false);

  return (
    <main className={clsx('grow ', bgColor || 'bg-gray-100')}>
      <InventoryManagementSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setSideBarMini={setSideBarMini}
        sideBarMini={sideBarMini}
      />
      <div
        className={
          sideBarMini ? 'flex flex-1 flex-col' : 'flex flex-1 flex-col lg:pl-64'
        }
      >
        <InventoryManagementHeader
          setSidebarOpen={setSidebarOpen}
          setSideBarMini={setSideBarMini}
          sideBarMini={sideBarMini}
        />
        {children}
      </div>
    </main>
  );
};

export default InventoryLayout;
