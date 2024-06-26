import {
  ArrowPathIcon,
  CreditCardIcon,
  CubeIcon,
} from '@heroicons/react/20/solid';

import { Background } from '@/components/lib/background/Background';
import Section from '@/components/lib/layout/Section';

const incentives = [
  {
    title: 'Gérez votre inventory',
    icon: CubeIcon,
    description:
      'Vous gérez simplement et efficacement votre inventaire directement sur votre téléphone, tablette ou ordinateur.',
  },
  {
    title: 'Page web auto générée',
    subtitle: 'Bientôt disponible...',
    icon: ArrowPathIcon,
    description:
      "Une page web se créée automatiquement sur notre marketplace. Vous pouvez la customiser. Elle n'est  visible par le public que si vous le souhaitez.",
  },
  {
    title: 'Achat',
    subtitle: 'Bientôt disponible...',
    icon: CreditCardIcon,
    description:
      "Les visiteurs peuvent consulter vos produits publics. Ils peuvent acheter directement vos produits qu'ils viendront récupérer en magasin.",
  },
];

const Incentive = () => (
  <Background color="bg-white">
    <Section maxWidth="max-w-7xl">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
          {incentives.map((incentive) => (
            <div key={incentive.title} className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                  <incentive.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                {incentive.title}
              </dt>
              <span className="text-sm font-medium leading-5 text-gray-500">
                {incentive.subtitle}
              </span>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                {incentive.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  </Background>
);

export default Incentive;
