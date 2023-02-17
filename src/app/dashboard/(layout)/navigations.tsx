import {
  ArchiveBoxIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { mainRoutes } from '@/routes/mainRoutes';

import type { Navigation } from './MobileSideBar';

export const navigation: Navigation[] = [
  // { name: 'Home', path: '#', icon: HomeIcon, current: true },
  {
    name: inventoryManagementRoutes.myInventory.label,
    path: inventoryManagementRoutes.myInventory.path,
    icon: ArchiveBoxIcon,
  },
  // {
  //   name: inventoryManagementRoutes.sells.label,
  //   path: inventoryManagementRoutes.sells.path,
  //   icon: ArrowRightOnRectangleIcon,
  // },
  // {
  //   name: inventoryManagementRoutes.toPurchase.label,
  //   path: inventoryManagementRoutes.toPurchase.path,
  //   icon: CreditCardIcon,
  // },
  // {
  //   name: inventoryManagementRoutes.clients.label,
  //   path: inventoryManagementRoutes.clients.path,
  //   icon: UserGroupIcon,
  // },
  // {
  //   name: inventoryManagementRoutes.myMarketPlace.label,
  //   path: inventoryManagementRoutes.myMarketPlace.path,
  //   icon: ShoppingBagIcon,
  // },
];
export const secondaryNavigation = [
  // {
  //   name: inventoryManagementRoutes.setting.label,
  //   path: inventoryManagementRoutes.setting.path,
  //   icon: CogIcon,
  // },
  // {
  //   name: inventoryManagementRoutes.myCompany.label,
  //   path: inventoryManagementRoutes.myCompany.path,
  //   icon: Squares2X2Icon,
  // },
  // {
  //   name: inventoryManagementRoutes.help.label,
  //   path: inventoryManagementRoutes.help.path,
  //   icon: QuestionMarkCircleIcon,
  // },
  {
    name: 'Feedback / contact',
    path: mainRoutes.contact.path,
    icon: QuestionMarkCircleIcon,
  },
];
