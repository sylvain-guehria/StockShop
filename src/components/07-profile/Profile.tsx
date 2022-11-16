'use client';

import DisclosureSection from './DisclosureSection';
import ProfileContainerSideBar from './ProfileContainerSideBar';
import ProfileForm from './profileForm/ProfileForm';

const Profile = () => {
  return (
    <div>
      <DisclosureSection />
      <main className="relative -mt-32">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <ProfileContainerSideBar />
              <ProfileForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
