import {
  Bars3CenterLeftIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import type { FC } from 'react';

import ProfileDropdown from '@/components/07-profile/ProfileDropdown';

type Props = {
  setSidebarOpen: (value: boolean) => void;
};

const InventoryManagementHeader: FC<Props> = ({ setSidebarOpen }) => {
  return (
    <div className="flex h-16 shrink-0 border-b border-gray-200 bg-white lg:border-none">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
        <div className="flex flex-1">
          <form className="flex w-full md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
                aria-hidden="true"
              >
                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                name="search-field"
                className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Chercher un produit"
                type="search"
              />
            </div>
          </form>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default InventoryManagementHeader;
