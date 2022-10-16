import Link from 'next/link';
import { mainRoutes } from 'routes/mainRoutes';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-gray-200">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        {mainRoutes.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>
              <a>{route.label}</a>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/">
            <a>
              <Button>Start Free Trial</Button>
            </a>
          </Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-3">
      <HeroOneButton
        title={
          <>
            {'Votre application de gestion de stock\n'}
            <span className="text-primary-500">Et de vente en ligne</span>
          </>
        }
        description="Gérer votre inventaire et vendre vos produits en ligne n'a jamais été aussi facile."
        button={
          <Link href="/">
            <a>
              <Button xl>Créé votre compte gratuitement</Button>
            </a>
          </Link>
        }
        image={{
          src: '/assets/images/hero-image.png',
          alt: 'Hero screenshot',
        }}
      />
    </Section>
  </Background>
);

export { Hero };
