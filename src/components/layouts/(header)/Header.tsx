import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { FC } from 'react';
import { Suspense, useState } from 'react';

import ProfileDropdown from '@/app/profile/(components)/ProfileDropdown';
import NextImage from '@/components/lib/nextImage/NextImage';
import ServicesButton from '@/components/lib/Popovers/ServicesButton';
import UserEntity from '@/modules/user/UserEntity';
import type { User } from '@/modules/user/userType';
import { mainRoutes } from '@/routes/mainRoutes';

import inventoryMarketLogo from '../../../../public/assets/images/inventoryMarket.png';

const SearchBarModal = dynamic(() => import('./SearchBarModal'), {
  suspense: true,
});

type Props = {
  setMobileMenuOpen: (value: boolean) => void;
  user: User | null;
};

const Header: FC<Props> = ({ setMobileMenuOpen, user }) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const userEntity = UserEntity.new(user);

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
                    <div className="hidden cursor-pointer lg:flex lg:items-center">
                      <span className="sr-only">Inventory Market</span>
                      <NextImage
                        className="h-10 w-auto cursor-pointer"
                        src={inventoryMarketLogo}
                        alt="inventory shop logo"
                      />
                    </div>
                  </Link>

                  {/* <MegaMenu /> */}

                  <div className="ml-8 hidden lg:flex">
                    <ServicesButton />
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
                  <Link href={mainRoutes.home.path} className="lg:hidden">
                    <span className="sr-only">Inventory Market</span>
                    <NextImage
                      className="h-10 w-auto cursor-pointer"
                      src={inventoryMarketLogo}
                      alt="inventory shop logo"
                    />
                  </Link>
                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex items-center space-x-8">
                        <div
                          className="hidden lg:flex"
                          onClick={() => setIsSearchBarOpen(true)}
                        >
                          <div className="-m-2 cursor-pointer p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </div>
                        </div>

                        {userEntity.isLoggedIn() && (
                          <div className="flex text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Account</span>
                            <ProfileDropdown
                              user={userEntity}
                              logo={
                                <UserIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              }
                            />
                          </div>
                        )}
                      </div>

                      <span
                        className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />

                      {/* <div className="flow-root">
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
                      </div> */}
                      {userEntity.isLoggedOut() && (
                        <Link href={mainRoutes.login.path}>
                          <div className="ml-6 mr-1 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary-100 px-4 py-2 text-base font-medium text-primary-600 hover:bg-primary-200">
                            {mainRoutes.login.label}
                          </div>
                        </Link>
                      )}
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
export default Header;
