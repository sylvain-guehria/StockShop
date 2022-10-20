import { ChartBarIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline';

import { marketpalceRoutes } from '@/routes/marketpalceRoutes';
import { stockManagementRoutes } from '@/routes/stockManagementRoutes';

export type Service = {
  name: string;
  description: string;
  href: string;
  icon: any;
};

export const services: Service[] = [
  {
    name: 'Gestion inventaire',
    description:
      'Get a better understanding of where your traffic is coming from.',
    href: stockManagementRoutes.stockDashboard.path,
    icon: ChartBarIcon,
  },
  {
    name: 'Marketplace',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: marketpalceRoutes.marketplace.path,
    icon: CursorArrowRaysIcon,
  },
];
