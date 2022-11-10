import {
  ArchiveBoxIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
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
    icon: ArrowRightOnRectangleIcon,
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
    name: stockManagementRoutes.myCompany.label,
    path: stockManagementRoutes.myCompany.path,
    icon: Squares2X2Icon,
  },
  {
    name: stockManagementRoutes.help.label,
    path: stockManagementRoutes.help.path,
    icon: QuestionMarkCircleIcon,
  },
];
