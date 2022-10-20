import { Background } from '../04-lib/background/Background';
import { Section } from '../04-lib/layout/Section';

const incentives = [
  {
    name: 'Gérer votre stock',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description:
      'Vous gérez simplement vos stocks de produits directement sur votre téléphone ou sur votre ordinateur.',
  },
  {
    name: 'Page web auto générée',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description:
      'Une page web se créée automatiquement sur notre marketplace et est accessible au public uniquement si vous le shouaitez.',
  },
  {
    name: 'Exchanges',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      "Le public visite votre page et achète vos produits qu'ils viendront récupérer en magasin.",
  },
];

const HeroIncentive = () => (
  <Background color="bg-gray-200">
    <Section>
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              <>
                {'Votre application de gestion de stock\n'}
                <span className="text-primary-500">Et de vente en ligne</span>
              </>
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Gérer votre inventaire et vendre vos produits en ligne n&apos;a
              jamais été aussi facile.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:shrink-0">
                  <img className="h-16 w-16" src={incentive.imageSrc} alt="" />
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

export default HeroIncentive;
