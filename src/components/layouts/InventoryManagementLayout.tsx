'use client';

import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import InventoryManagementHeader from '@/components/01-dashboard/header/InventoryManagementHeader';
import InventoryManagementSideBar from '@/components/01-dashboard/sidebar/InventoryManagementSideBar';
import type { User } from '@/modules/user/userType';

import Providers from './Providers';

type Props = {
  children: ReactNode;
  userProfile: User;
};

const InventoryManagementLayout: FC<Props> = ({ children, userProfile }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideBarMini, setSideBarMini] = useState(false);

  return (
    <Providers userProfile={userProfile}>
      <div className="h-screen bg-gray-100">
        <div className="min-h-full">
          <InventoryManagementSideBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setSideBarMini={setSideBarMini}
            sideBarMini={sideBarMini}
          />
          <div
            className={
              sideBarMini
                ? 'flex flex-1 flex-col'
                : 'flex flex-1 flex-col lg:pl-64'
            }
          >
            <InventoryManagementHeader
              setSidebarOpen={setSidebarOpen}
              setSideBarMini={setSideBarMini}
              sideBarMini={sideBarMini}
            />
            {children}
          </div>
        </div>
      </div>
    </Providers>
  );
};

export default InventoryManagementLayout;
