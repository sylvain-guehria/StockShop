'use client';

import { Bars3CenterLeftIcon, BellIcon } from '@heroicons/react/20/solid';
import { UserIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';
import { useWindowSize } from 'usehooks-ts';

import ProfileDropdown from '@/app/profile/(components)/ProfileDropdown';
import type { User } from '@/modules/user/userType';
import { getBreakpointValue } from '@/utils/tailwindUtils';

type Props = {
  setSidebarOpen: (value: boolean) => void;
  setSideBarMini: (value: boolean) => void;
  sideBarMini: boolean;
  user: User | null;
};

const InventoryManagementHeader: FC<Props> = ({
  setSidebarOpen,
  setSideBarMini,
  sideBarMini,
  user,
}) => {
  const { width } = useWindowSize();
  const lgBreakpointValue = getBreakpointValue('lg');
  const isLgOrBigger = width >= lgBreakpointValue;
  const displaySideBarMini = isLgOrBigger && sideBarMini;

  return (
    <div className="flex h-16 shrink-0 border-b border-gray-200 bg-white lg:border-none">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      {displaySideBarMini && (
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          onClick={() => setSideBarMini(false)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      )}
      <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
        <div className="flex flex-1">{/* <SearchBar /> */}</div>

        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex text-gray-400 hover:text-gray-500">
            <span className="sr-only">Account</span>
            <ProfileDropdown
              user={user}
              logo={<UserIcon className="h-6 w-6" aria-hidden="true" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagementHeader;
