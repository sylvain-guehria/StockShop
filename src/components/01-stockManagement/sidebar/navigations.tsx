import {
  ArchiveBoxIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Mon stock', href: '#', icon: ArchiveBoxIcon, current: false },
  { name: 'Ventes', href: '#', icon: ClockIcon, current: false },
  { name: 'À acheter', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Clients', href: '#', icon: UserGroupIcon, current: false },
];
export const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
];

export const thirdNavigation = [
  { name: 'Ma Marketplace', href: '/marketplace', icon: ShoppingBagIcon },
];
