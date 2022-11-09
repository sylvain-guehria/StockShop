import {
  ArchiveBoxIcon,
  CursorArrowRaysIcon,
} from '@heroicons/react/24/outline';

import { marketpalceRoutes } from '@/routes/marketpalceRoutes';
import { stockManagementRoutes } from '@/routes/stockManagementRoutes';

export type Service = {
  name: string;
  description: string;
  href: string;
  icon: any;
  callToAction: string;
};

export const services: Service[] = [
  {
    name: 'Gestion inventaire',
    description:
      'Gérez votre inventaire ave un outil simple et intuitif. Cette page est accessible uniquement aux utilisateurs connectés.',
    href: stockManagementRoutes.stockDashboard.path,
    icon: ArchiveBoxIcon,
    callToAction: 'Gérer mon inventaire',
  },
  {
    name: 'Marketplace',
    description:
      'Trouvez des commerces dans votre villes et parcourez leurs inventaires.',
    href: marketpalceRoutes.marketplace.path,
    icon: CursorArrowRaysIcon,
    callToAction: 'Trouver un commerce',
  },
];
