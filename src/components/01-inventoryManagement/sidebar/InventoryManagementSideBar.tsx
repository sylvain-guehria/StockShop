import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import NextImage from '@/components/04-lib/nextImage/NextImage';
import { mainRoutes } from '@/routes/mainRoutes';

import inventoryMarketLogo from '../../../../public/assets/images/inventoryMarket.png';
import MobileSideBar from './MobileSideBar';
import { navigation, secondaryNavigation } from './navigations';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (bool: boolean) => void;
};

const InventoryManagementSideBar: FC<Props> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const pathname = usePathname();
  return (
    <>
      <MobileSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col overflow-y-auto bg-white pt-5 pb-4">
          <div className="flex shrink-0 cursor-pointer items-center px-4">
            <Link href={mainRoutes.home.path}>
              <NextImage
                className="h-11 w-auto cursor-pointer"
                src={inventoryMarketLogo}
                alt="inventory shop logo"
              />
            </Link>
          </div>
          <nav
            className="mt-5 flex flex-1 flex-col divide-y divide-primary-300 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.path}>
                  <div
                    className={classNames(
                      item.path === pathname
                        ? 'bg-primary-400 text-white'
                        : 'text-primary-500  hover:bg-primary-200',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
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
            <div className="mt-6 pt-6">
              <div className="space-y-1 px-2">
                {secondaryNavigation.map((item) => (
                  <Link key={item.name} href={item.path}>
                    <div
                      className={classNames(
                        item.path === pathname
                          ? 'bg-primary-400 text-white'
                          : 'text-primary-500  hover:bg-primary-200',
                        'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
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
    </>
  );
};

export default InventoryManagementSideBar;
