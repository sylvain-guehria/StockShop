import Link from 'next/link';

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
        <li>
          <Link href="/">
            <a>Docs</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Blog</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Sign in</a>
          </Link>
        </li>
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
            {'The modern landing page for\n'}
            <span className="text-primary-500">React developer</span>
          </>
        }
        description="The easiest way to build React landing page in seconds."
        button={
          <Link href="/">
            <a>
              <Button xl>Start your 14-day Free Trial</Button>
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
