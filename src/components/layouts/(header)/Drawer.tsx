import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { Fragment } from 'react';

import { navigation } from '@/app/marketplace/(components)/fakeDatas';
import MobileServicesButton from '@/components/lib/Popovers/MobileServicesButton';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import UserEntity from '@/modules/user/UserEntity';
import type { User } from '@/modules/user/userType';
import { mainRoutes } from '@/routes/mainRoutes';

type Props = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  user: User | null;
};

const Drawer: FC<Props> = ({ mobileMenuOpen, setMobileMenuOpen, user }) => {
  const router = useRouter();
  const toast = useToast(10000);
  const userEntity = UserEntity.new(user);

  const handleSingOut = async () => {
    try {
      const response = await fetch('/auth/sign-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());

      if (response?.error) throw new Error(response.error.message);

      router.push(mainRoutes.home.path);
    } catch (error: any) {
      toast(ToasterTypeEnum.ERROR, error.message);
    }
  };

  return (
    <Transition.Root show={mobileMenuOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileMenuOpen}
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
          <div className="fixed inset-0 bg-black/25" />
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
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <MobileServicesButton />

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              {userEntity.isLoggedOut() && (
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link href={mainRoutes.login.path}>
                      <div className="mr-1 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary-100 px-4 py-2 text-base font-medium text-primary-600 hover:bg-primary-200">
                        {mainRoutes.login.label}
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {userEntity.isLoggedIn() && (
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <button
                    onClick={handleSingOut}
                    className="ml-6 mr-1 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary-100 px-4 py-2 text-base font-medium text-primary-600 hover:bg-primary-200"
                  >
                    Se Déconnecter
                  </button>
                </div>
              )}

              <div className="space-y-6 border-t border-gray-200 px-4 py-6"></div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;
