'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import Spinner from '../04-lib/spinner/Spinner';
import DisclosureSection from './DisclosureSection';
import ProfileContainerSideBar, {
  subNavigation,
} from './ProfileContainerSideBar';
import ProfileForm from './profileForm/ProfileForm';
import SettingsForm from './settingsForm/SettingsForm';

const Profile = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [seletedTab, setSelectedTab] = useState(
    searchParams.get('tab') || 'profil'
  );

  return (
    <div>
      <DisclosureSection />
      <main className="relative -mt-32">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <ProfileContainerSideBar
                seletedTab={seletedTab}
                setSelectedTab={setSelectedTab}
              />
              {user.isLoggedIn() && seletedTab === subNavigation[0]?.tab && (
                <ProfileForm user={user} />
              )}

              {user.isLoggedIn() && seletedTab === subNavigation[1]?.tab && (
                <SettingsForm user={user} />
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

const ProfileFormWith = () => {
  return <Profile />;
};

export default ProfileFormWith;
