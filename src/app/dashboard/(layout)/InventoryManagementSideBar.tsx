'use client';

import { Bars3CenterLeftIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import NextImage from '@/components/lib/nextImage/NextImage';
import { mainRoutes } from '@/routes/mainRoutes';

import inventoryMarketLogo from '../../../../public/assets/images/inventoryMarket.png';
import MobileSideBar from './MobileSideBar';
import { navigation, secondaryNavigation } from './navigations';

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (bool: boolean) => void;
  setSideBarMini: (bool: boolean) => void;
  sideBarMini: boolean;
};

const InventoryManagementSideBar: FC<Props> = ({
  sidebarOpen,
  setSidebarOpen,
  setSideBarMini,
  sideBarMini,
}) => {
  const pathname = usePathname();
  return (
    <>
      <MobileSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {!sideBarMini && (
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex grow flex-col overflow-y-auto bg-white pt-5 pb-4">
            <div className="flex w-full justify-between px-3 text-right">
              <Link href={mainRoutes.home.path}>
                <NextImage
                  className="h-10 w-auto cursor-pointer"
                  src={inventoryMarketLogo}
                  alt="inventory shop logo"
                />
              </Link>
              <Bars3CenterLeftIcon
                onClick={() => setSideBarMini(true)}
                className="h-8 w-auto cursor-pointer text-primary-500"
                aria-hidden="true"
              />
            </div>
            {/* PUTIT BACK IN NAV className when more items:  divide-y divide-primary-300 */}
            <nav
              className="mt-5 flex flex-1 flex-col  overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.path}>
                    <div
                      className={clsx(
                        item.path === pathname
                          ? 'bg-primary-400 text-white'
                          : 'text-primary-500  hover:bg-primary-200',
                        'group flex items-center rounded-md p-2 text-sm font-medium leading-6'
                      )}
                      aria-current={item.path === pathname ? 'page' : undefined}
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 shrink-0 text-primary-300"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
              {/* <div className="mt-6 pt-6"> */}
              <div className="pt-6">
                <div className="space-y-1 px-2">
                  {secondaryNavigation.map((item) => (
                    <Link key={item.name} href={item.path}>
                      <div
                        className={clsx(
                          item.path === pathname
                            ? 'bg-primary-400 text-white'
                            : 'text-primary-500  hover:bg-primary-200',
                          'group flex items-center rounded-md p-2 text-sm font-medium leading-6'
                        )}
                      >
                        <item.icon
                          className="mr-4 h-6 w-6 text-primary-300"
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryManagementSideBar;
