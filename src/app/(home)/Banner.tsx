import { mainRoutes } from '@/routes/mainRoutes';

import Section from '../../components/lib/layout/Section';
import LinkButton from '../../components/lib/LinkButton/LinkButton';

const Banner = () => (
  <Section yPadding="pb-16">
    <div className="flex flex-col rounded-md bg-gray-200 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:p-12 sm:text-left">
      <div className="text-2xl font-semibold">
        <div className="mb-2 text-gray-900">
          Gérer votre inventaire et vendre vos produits en ligne n&apos;a jamais
          été aussi facile.
        </div>
        <div className="text-primary-500">Commencez dès maintenant</div>
      </div>

      <div className="mt-3 sm:mt-0 sm:ml-2">
        <LinkButton href={mainRoutes.register.path} style="secondary">
          Créé votre compte gratuitement
        </LinkButton>
      </div>
    </div>
  </Section>
);

export { Banner };
