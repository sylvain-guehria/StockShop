import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { FC } from 'react';
import { Suspense, useState } from 'react';

import { mainRoutes } from '@/routes/mainRoutes';

import { services } from '../04-lib/Header/services';
import ServicesButton from '../04-lib/Popovers/ServicesButton';

const SearchBarModal = dynamic(
  () => import('../05-modals/searchBar/SearchBarModal'),
  {
    suspense: true,
  }
);

type Props = {
  setMobileMenuOpen: (value: boolean) => void;
};

const MarketplaceHeader: FC<Props> = ({ setMobileMenuOpen }) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  return (
    <>
      {isSearchBarOpen && (
        <Suspense fallback={`Loading...`}>
          <SearchBarModal
            isSearchBarOpen={isSearchBarOpen}
            setIsSearchBarOpen={setIsSearchBarOpen}
          />
        </Suspense>
      )}
      <header className="relative z-10">
        <nav aria-label="Top">
          <div className="bg-white">
            <div className="border-b border-gray-200 ">
              <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
                <div className="flex  items-center justify-between">
                  {/* Logo (lg+) */}
                  <Link href={mainRoutes.home.path}>
                    <div className="hidden lg:flex lg:items-center">
                      <a href="#">
                        <span className="sr-only">Your Company</span>
                        <img
                          className="h-11 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                          alt=""
                        />
                      </a>
                    </div>
                  </Link>

                  {/* <MegaMenu /> */}

                  <div className="ml-8 hidden lg:flex">
                    <ServicesButton services={services} />
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <div
                      className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setIsSearchBarOpen(true)}
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Your Company</span>
                    <img
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                      className="h-8 w-auto"
                    />
                  </a>
                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div
                          className="hidden lg:flex"
                          onClick={() => setIsSearchBarOpen(true)}
                        >
                          <a
                            href="#"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </a>
                        </div>

                        <div className="flex">
                          <a
                            href="#"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Account</span>
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      <span
                        className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />

                      <div className="flow-root">
                        <a
                          href="#"
                          className="group -m-2 flex items-center p-2"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            0
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </a>
                      </div>
                      <Link href={mainRoutes.login.path}>
                        <a
                          href="#"
                          className="ml-6 mr-1 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary-100 py-2 px-4 text-base font-medium text-primary-600 hover:bg-primary-200"
                        >
                          {mainRoutes.login.label}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default MarketplaceHeader;
