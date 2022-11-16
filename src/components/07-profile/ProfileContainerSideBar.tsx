import { UserCircleIcon } from '@heroicons/react/24/outline';

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

const ProfileContainerSideBar = () => {
  return (
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
  );
};

export default ProfileContainerSideBar;
