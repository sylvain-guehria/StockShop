import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { Fragment } from 'react';

import NextImage from '@/components/lib/nextImage/NextImage';

import inventoryMarketLogo from '../../../../public/assets/images/inventoryMarket.png';
import { navigation, secondaryNavigation } from './navigations';

export type Navigation = {
  name: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
};

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (bool: boolean) => void;
};

const MobileSideBar: FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700/75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex shrink-0 items-center px-4">
                  <NextImage
                    className="h-10 w-auto cursor-pointer"
                    src={inventoryMarketLogo}
                    alt="inventory shop logo"
                  />
                </div>
                <nav
                  className="mt-5 h-full shrink-0 divide-y divide-primary-300 overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="space-y-1 px-2">
                    {navigation.map((item: Navigation) => (
                      <a
                        key={item.name}
                        href={item.path}
                        className={clsx(
                          item.path === pathname
                            ? 'bg-primary-400 text-white'
                            : 'text-primary-500  hover:bg-primary-200',
                          'group flex items-center rounded-md p-2 text-base font-medium'
                        )}
                        aria-current={
                          item.path === pathname ? 'page' : undefined
                        }
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
                      {secondaryNavigation.map((item: Navigation) => (
                        <a
                          key={item.name}
                          href={item.path}
                          className="group flex items-center rounded-md p-2 text-base font-medium text-primary-500 hover:bg-primary-200"
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
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MobileSideBar;
