'use client';

import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import InventoryManagementHeader from '@/app/dashboard/(layout)/InventoryManagementHeader';
import InventoryManagementSideBar from '@/app/dashboard/(layout)/InventoryManagementSideBar';
import type { User } from '@/modules/user/userType';

import Providers from './Providers';

type Props = {
  children: ReactNode;
  userProfile: User;
};

const InventoryLayout: FC<Props> = ({ children, userProfile }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideBarMini, setSideBarMini] = useState(false);

  return (
    <Providers userProfile={userProfile}>
      <div className="grow bg-gray-100">
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
    </Providers>
  );
};

export default InventoryLayout;
