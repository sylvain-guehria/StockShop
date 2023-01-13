import { mainRoutes } from '@/routes/mainRoutes';

import { Background } from '../04-lib/background/Background';
import Section from '../04-lib/layout/Section';
import LinkButton from '../04-lib/LinkButton/LinkButton';

const Hero = () => (
  <Background color="bg-gray-200">
    <Section>
      <header className="text-center">
        <div className="whitespace-pre-line text-2xl font-bold  text-gray-900 md:text-4xl">
          {'Gérez efficacement votre inventaire &\n'}
          <span className="text-primary-500">
            Vendez en ligne en click & collect
          </span>
        </div>
        <div className="mt-8 text-sm md:text-lg">
          Gérer votre inventaire et vendre vos produits en ligne n&apos;a jamais
          été aussi facile.
        </div>
        <div className="mt-8 text-center">
          <LinkButton href={mainRoutes.register.path} style="secondary">
            Créé votre compte gratuitement
          </LinkButton>
        </div>
      </header>
    </Section>
  </Background>
);

export default Hero;
