import Link from 'next/link';

import { Background } from '@/components/lib/background/Background';
import { VerticalFeatureRow } from '@/components/lib/feature/VerticalFeatureRow';
import Section from '@/components/lib/layout/Section';

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
              <button>Learn more</button>
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
              <button>Read more</button>
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
