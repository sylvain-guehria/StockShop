import { Background } from '@/components/lib/background/Background';
import Section from '@/components/lib/layout/Section';
import LinkButton from '@/components/lib/LinkButton/LinkButton';
import { mainRoutes } from '@/routes/mainRoutes';

const Hero = () => (
  <Background color="bg-gray-200">
    <Section yPadding="py-36">
      <header className="text-center">
        <div className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {'Gérez efficacement votre inventaire &\n'}
          <span className="text-primary-500">
            vendez en ligne en click & collect
          </span>
        </div>
        <div className="mt-8 text-lg  leading-8 ">
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
