import { CogIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { FC } from 'react';

export const subNavigation = [
  { tab: 'profil', label: 'Profil', icon: UserCircleIcon },
  { tab: 'settings', label: 'Paramètres', icon: CogIcon },
];

export const tabNames = subNavigation.map((item) => item.tab);

type Props = {
  seletedTab: string;
  setSelectedTab: (tab: string) => void;
};

const ProfileContainerSideBar: FC<Props> = ({ seletedTab, setSelectedTab }) => {
  return (
    <aside className="py-6 lg:col-span-3">
      <nav className="space-y-1">
        {subNavigation.map((item) => (
          <div
            onClick={() => setSelectedTab(item.tab)}
            key={item.tab}
            className={clsx(
              item.tab === seletedTab
                ? 'border-primary-500 bg-primary-100 text-primary-700 hover:bg-primary-100 hover:text-primary-700'
                : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
              'group flex cursor-pointer items-center border-l-4 px-3 py-2 text-sm font-medium',
            )}
            aria-current={item.tab === seletedTab ? 'page' : undefined}
          >
            <item.icon
              className={clsx(
                item.tab === seletedTab
                  ? 'text-primary-500 group-hover:text-primary-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                '-ml-1 mr-3 h-6 w-6 shrink-0',
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default ProfileContainerSideBar;
