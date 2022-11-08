import {
  ArchiveBoxIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import { stockManagementRoutes } from '@/routes/stockManagementRoutes';

export const navigation = [
  // { name: 'Home', path: '#', icon: HomeIcon, current: true },
  {
    name: stockManagementRoutes.myStock.label,
    path: stockManagementRoutes.myStock.path,
    icon: ArchiveBoxIcon,
  },
  {
    name: stockManagementRoutes.sells.label,
    path: stockManagementRoutes.sells.path,
    icon: ClockIcon,
  },
  {
    name: stockManagementRoutes.toPurchase.label,
    path: stockManagementRoutes.toPurchase.path,
    icon: CreditCardIcon,
  },
  {
    name: stockManagementRoutes.clients.label,
    path: stockManagementRoutes.clients.path,
    icon: UserGroupIcon,
  },
  {
    name: stockManagementRoutes.myMarketPlace.label,
    path: stockManagementRoutes.myMarketPlace.path,
    icon: ShoppingBagIcon,
  },
];
export const secondaryNavigation = [
  {
    name: stockManagementRoutes.setting.label,
    path: stockManagementRoutes.setting.path,
    icon: CogIcon,
  },
  {
    name: stockManagementRoutes.help.label,
    path: stockManagementRoutes.help.path,
    icon: QuestionMarkCircleIcon,
  },
];
