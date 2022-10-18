import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import SellerSearchBarHeader from '@/components/seller/SearchBarHeader';
import SellerSideBar from '@/components/seller/SideBar';

type IBackgroundProps = {
  children: ReactNode;
};
const SellerLayout: FC<IBackgroundProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-full bg-gray-100">
      <div className="h-full">
        <div className="min-h-full">
          <SellerSideBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="flex flex-1 flex-col lg:pl-64">
            <div className="flex h-16 shrink-0 border-b border-gray-200 bg-white lg:border-none">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <SellerSearchBarHeader />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
