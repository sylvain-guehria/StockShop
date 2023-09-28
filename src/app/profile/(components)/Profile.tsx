'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import Spinner from '@/components/lib/spinner/Spinner';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import UserEntity from '@/modules/user/UserEntity';
import type { User } from '@/modules/user/userType';

import DisclosureSection from './DisclosureSection';
import ProfileContainerSideBar, {
  subNavigation,
  tabNames,
} from './ProfileContainerSideBar';

const DynamicProfileForm = dynamic(
  () => import('./(profileForm)/ProfileForm'),
  {
    loading: () => <Spinner />,
  },
);

const DynamicSettingsForm = dynamic(
  () => import('./(settingsForm)/SettingsForm'),
  {
    loading: () => <Spinner />,
  },
);

const Profile: FC<{ user: User }> = ({ user: _user }) => {
  const user = UserEntity.new(_user);

  const toast = useToast(10000);
  const searchParams = useSearchParams();
  const [seletedTab, setSelectedTab] = useState(
    tabNames.includes(searchParams?.get('tab') as string)
      ? searchParams?.get('tab')
      : 'profil',
  );

  useEffect(() => {
    if (searchParams?.get('tab') && searchParams?.get('+') === 'true') {
      toast(
        ToasterTypeEnum.INFO,
        'Vous devez activer la gestion des stocks dans les paramètres de votre compte pour acceder à ce module',
      );
    }
  }, []);

  return (
    <div>
      <DisclosureSection />
      <main className="relative -mt-32">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
              <ProfileContainerSideBar
                seletedTab={seletedTab as string}
                setSelectedTab={setSelectedTab}
              />
              {user.isLoggedIn() && seletedTab === subNavigation[0]?.tab && (
                <DynamicProfileForm user={user} />
              )}

              {user.isLoggedIn() && seletedTab === subNavigation[1]?.tab && (
                <DynamicSettingsForm user={user} />
              )}

              {!user.isLoggedIn() && (
                <div className="flex h-52 flex-col items-center justify-center">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
