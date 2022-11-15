'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';

import DisclosureSection from './DisclosureSection';
import ProfileForm from './ProfileForm';

const subNavigation = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
  // { name: 'Account', href: '#', icon: CogIcon, current: false },
  // { name: 'Password', href: '#', icon: KeyIcon, current: false },
  // { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  // { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
  // { name: 'Integrations', href: '#', icon: SquaresPlusIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Profile = () => {
  return (
    <div>
      <DisclosureSection />
      <main className="relative -mt-32">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav className="space-y-1">
                  {subNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-primary-50 border-primary-500 text-primary-700 hover:bg-primary-50 hover:text-primary-700'
                          : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                        'group border-l-4 px-3 py-2 flex items-center text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-primary-500 group-hover:text-primary-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </aside>

              <ProfileForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
