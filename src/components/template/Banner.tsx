import Link from 'next/link';

import { Button } from '../lib/button/Button';
import { CTABanner } from '../lib/cta/CTABanner';
import { Section } from '../lib/layout/Section';

const Banner = () => (
  <Section yPadding="pb-16">
    <CTABanner
      title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      subtitle="Start your Free Trial."
      button={
        <Link href="/">
          <a>
            <Button>Get Started</Button>
          </a>
        </Link>
      }
    />
  </Section>
);

export { Banner };
