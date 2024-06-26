import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { Fragment } from 'react';

import { useToast } from '@/hooks/useToast';
import UserEntity from '@/modules/user/UserEntity';
import type { User } from '@/modules/user/userType';
import { mainRoutes } from '@/routes/mainRoutes';

import avatarImg from '../../../../public/assets/images/defaultAvatar.png';
import NextImage from '../../../components/lib/nextImage/NextImage';
import { ToasterTypeEnum } from '../../../components/toaster/toasterEnum';

type Props = {
  logo?: React.ComponentProps<'svg'>;
  user: User | null;
};

const ProfileDropdown: FC<Props> = ({ logo, user }) => {
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
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
          <>
            {logo || (
              <NextImage
                className="h-8 w-8 rounded-full"
                src={avatarImg}
                alt=""
              />
            )}
            <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
              <span className="sr-only">Open user menu for </span>
              {userEntity.getUsername() || userEntity.getTruncatedEmail()}
            </span>
            <ChevronDownIcon
              className="ml-1 hidden h-5 w-5 shrink-0 text-gray-400 lg:block"
              aria-hidden="true"
            />
          </>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link href={mainRoutes.profile.path}>
                <div
                  className={clsx(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  )}
                >
                  {mainRoutes.profile.label}
                </div>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                className={clsx(
                  active ? 'bg-gray-100' : '',
                  'block cursor-pointer px-4 py-2 text-sm text-gray-700',
                )}
                onClick={handleSingOut}
              >
                Logout
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
