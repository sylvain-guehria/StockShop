import {
  ArchiveBoxIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { mainRoutes } from '@/routes/mainRoutes';

import type { Navigation } from './MobileSideBar';

export const navigation: Navigation[] = [
  // { name: 'Home', path: '#', Icon: HomeIcon, current: true },
  {
    name: inventoryManagementRoutes.myInventory.label,
    path: inventoryManagementRoutes.myInventory.path,
    Icon: ArchiveBoxIcon,
  },
  // {
  //   name: inventoryManagementRoutes.sells.label,
  //   path: inventoryManagementRoutes.sells.path,
  //   Icon: ArrowRightOnRectangleIcon,
  // },
  // {
  //   name: inventoryManagementRoutes.toPurchase.label,
  //   path: inventoryManagementRoutes.toPurchase.path,
  //   Icon: CreditCardIcon,
  // },
  // {
  //   name: inventoryManagementRoutes.clients.label,
  //   path: inventoryManagementRoutes.clients.path,
  //   Icon: UserGroupIcon,
  // },
  // {
  //   name: inventoryManagementRoutes.myMarketPlace.label,
  //   path: inventoryManagementRoutes.myMarketPlace.path,
  //   Icon: ShoppingBagIcon,
  // },
];
export const secondaryNavigation: Navigation[] = [
  // {
  //   name: inventoryManagementRoutes.setting.label,
  //   path: inventoryManagementRoutes.setting.path,
  //   Icon: CogIcon,
  // },
  // {
  //   name: inventoryManagementRoutes.myCompany.label,
  //   path: inventoryManagementRoutes.myCompany.path,
  //   Icon: Squares2X2Icon,
  // },
  // {
  //   name: inventoryManagementRoutes.help.label,
  //   path: inventoryManagementRoutes.help.path,
  //   Icon: QuestionMarkCircleIcon,
  // },
  {
    name: 'Feedback / contact',
    path: mainRoutes.contact.path,
    Icon: QuestionMarkCircleIcon,
  },
];
