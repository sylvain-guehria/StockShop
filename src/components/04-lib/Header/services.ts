import { ChartBarIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline';

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
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Marketplace',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
];
