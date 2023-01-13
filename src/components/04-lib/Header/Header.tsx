'use client';

import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import inventoryMarketLogo from 'public/assets/images/inventoryMarket.png';
import { Fragment } from 'react';
import { auth, signOut } from 'superbase/clientApp';

import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { headerRoutes, mainRoutes } from '@/routes/mainRoutes';
import { logoutUseCase } from '@/usecases/usecases';

import NextImage from '../nextImage/NextImage';
import ServicesButton from '../Popovers/ServicesButton';
import { services } from './services';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast(4000);

  const handleSingOut = async () => {
    try {
      await logoutUseCase({ auth, signOut });
      router.push(mainRoutes.home.path);
    } catch (error: any) {
      toast(ToasterTypeEnum.ERROR, error.message);
    }
  };

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b border-gray-200 py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href={mainRoutes.home.path}>
              <div>
                <span className="sr-only">Inventory Market</span>
                <NextImage
                  className="h-10 w-auto cursor-pointer"
                  src={inventoryMarketLogo}
                  alt="inventory shop logo"
                />
              </div>
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <ServicesButton />
              {/* <Link href={mainRoutes.pricing.path}>
                <div className="cursor-pointer text-base font-medium text-gray-600 hover:text-gray-900">
                  {mainRoutes.pricing.label}
                </div>
              </Link>
              <Link href={marketplaceRoutes.marketplace.path}>
                <div className="cursor-pointer text-base font-medium text-gray-600 hover:text-gray-900">
                  {marketplaceRoutes.marketplace.label}
                </div>
              </Link> */}
              {/* <MoreButton /> */}
            </Popover.Group>
          </div>
          <div className="hidden items-center justify-end space-x-8 md:flex md:flex-1 lg:w-0">
            {user.isLoggedIn() ? (
              <>
                {/* <div className="ml-8 inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-600"> */}
                <div
                  onClick={handleSingOut}
                  className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-200 py-2 px-4 text-base font-medium text-primary-600 hover:bg-primary-200"
                >
                  Se déconnecter
                </div>
              </>
            ) : (
              <>
                <Link href={mainRoutes.login.path}>
                  <div className="cursor-pointer text-base font-medium text-gray-600 hover:text-gray-900">
                    {mainRoutes.login.label}
                  </div>
                </Link>
                <Link href={mainRoutes.register.path}>
                  {/* <div className="ml-8 inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-600"> */}
                  <div className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-200 py-2 px-4 text-base font-medium text-primary-600 hover:bg-primary-200">
                    {mainRoutes.register.label}
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-30 origin-top-right p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
            <div className="px-5 pt-5 pb-6 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <NextImage
                    className="h-10 w-auto cursor-pointer"
                    src={inventoryMarketLogo}
                    alt="inventory shop logo"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <nav>
                  <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                    {services.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-500 text-white sm:h-12 sm:w-12">
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4 text-base font-medium text-gray-900">
                          {item.name}
                        </div>
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                {headerRoutes.map((route) => (
                  <Link key={route.path} href={route.path}>
                    <div className="cursor-pointer rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                      {route.label}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                {user.isLoggedIn() ? (
                  <>
                    <div
                      onClick={handleSingOut}
                      className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-200 py-2 px-4 text-base font-medium text-primary-600 hover:bg-primary-200"
                    >
                      Se déconnecter
                    </div>
                  </>
                ) : (
                  <>
                    <Link href={mainRoutes.register.path}>
                      {/* <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700"> */}
                      <div className="inline-flex w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-200 py-2 px-4 text-base font-medium text-primary-600 hover:bg-primary-200">
                        {mainRoutes.register.label}
                      </div>
                    </Link>
                    <div className="mt-6 text-center text-base font-medium text-gray-500">
                      Déjà inscrit ?{' '}
                      <Link href={mainRoutes.login.path}>
                        <div className="cursor-pointer text-primary-600 hover:text-primary-500">
                          {mainRoutes.login.label}
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Header;
