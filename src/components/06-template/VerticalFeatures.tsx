import Link from 'next/link';

import { Background } from '../04-lib/background/Background';
import { Button } from '../04-lib/button/Button';
import { VerticalFeatureRow } from '../04-lib/feature/VerticalFeatureRow';
import { Section } from '../04-lib/layout/Section';

const VerticalFeatures = () => (
  <Background color="bg-gray-200">
    <Section>
      <VerticalFeatureRow
        title="Your title here"
        image={{
          src: '/assets/images/feature.svg',
          alt: 'First feature alt text',
        }}
        action={
          <Link href="/">
            <div className="cursor-pointer">
              <Button>Learn more</Button>
            </div>
          </Link>
        }
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          bibendum.
        </p>
        <p>
          Nunc non posuere consectetur, justo erat semper enim, non hendrerit
          dui odio id enim.
        </p>
      </VerticalFeatureRow>
      <VerticalFeatureRow
        title="Your title here"
        image={{
          src: '/assets/images/feature2.svg',
          alt: 'Second feature alt text',
        }}
        reverse
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          bibendum.
        </p>
        <p>
          Nunc non posuere consectetur, justo erat semper enim, non hendrerit
          dui odio id enim.
        </p>
      </VerticalFeatureRow>
      <VerticalFeatureRow
        title="Your title here"
        image={{
          src: '/assets/images/feature3.svg',
          alt: 'Third feature alt text',
        }}
        action={
          <Link href="/">
            <div className="cursor-pointer">
              <Button>Read more</Button>
            </div>
          </Link>
        }
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          bibendum.
        </p>
        <p>
          Nunc non posuere consectetur, justo erat semper enim, non hendrerit
          dui odio id enim.
        </p>
      </VerticalFeatureRow>
    </Section>
  </Background>
);

export { VerticalFeatures };
