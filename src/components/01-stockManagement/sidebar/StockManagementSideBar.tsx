import {
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { FC } from 'react';

import { mainRoutes } from '@/routes/mainRoutes';

import MobileSideBar from './MobileSideBar';

export const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'History', href: '#', icon: ClockIcon, current: false },
  { name: 'Balances', href: '#', icon: ScaleIcon, current: false },
  { name: 'Cards', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Recipients', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Reports', href: '#', icon: DocumentChartBarIcon, current: false },
];
export const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (bool: boolean) => void;
};

const StockManagementSideBar: FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <MobileSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
        secondaryNavigation={secondaryNavigation}
      />
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col overflow-y-auto bg-white pt-5 pb-4">
          <div className="flex shrink-0 cursor-pointer items-center px-4">
            <Link href={mainRoutes.home.path}>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
                alt="Easywire logo"
              />
            </Link>
          </div>
          <nav
            className="mt-5 flex flex-1 flex-col divide-y divide-primary-300 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-primary-400 text-white'
                      : 'text-primary-500  hover:bg-primary-200',
                    'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className="mr-4 h-6 w-6 shrink-0 text-primary-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6">
              <div className="space-y-1 px-2">
                {secondaryNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center rounded-md p-2 text-sm font-medium leading-6 text-primary-500 hover:bg-primary-200 "
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 text-primary-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default StockManagementSideBar;
