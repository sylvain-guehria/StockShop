import {
  ArrowPathIcon,
  CreditCardIcon,
  CubeIcon,
} from '@heroicons/react/20/solid';

import { Background } from '@/components/lib/background/Background';
import Section from '@/components/lib/layout/Section';

const incentives = [
  {
    name: 'Gérez votre inventory',
    icon: CubeIcon,
    description:
      'Vous gérez simplement et efficacement votre inventaire directement sur votre téléphone, tablette ou ordinateur.',
  },
  {
    name: 'Page web auto générée',
    icon: ArrowPathIcon,
    description:
      "Une page web se créée automatiquement sur notre marketplace. Vous pouvez la customiser. Elle n'est  visible par le public que si vous le souhaitez.",
  },
  {
    name: 'Achat',
    icon: CreditCardIcon,
    description:
      "Les visiteurs peuvent consulter vos produits publics. Ils peuvent acheter directement vos produits qu'ils viendront récupérer en magasin.",
  },
];

const Incentive = () => (
  <Background color="bg-white" className="w-screen">
    <Section>
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="mt-5 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:shrink-0">
                  <incentive.icon
                    className="h-10 w-10 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-medium text-gray-900">
                    {incentive.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  </Background>
);

export default Incentive;
