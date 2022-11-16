import Link from 'next/link';

import { Background } from '../04-lib/background/Background';
import { Section } from '../04-lib/layout/Section';
import { PricingCard } from '../04-lib/pricing/PricingCard';
import { PricingFeature } from '../04-lib/pricing/PricingFeature';

const Pricing = () => (
  <Background color="bg-gray-200">
    <Section title="Flexible Plans" subtitle="Pricing">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <PricingCard
          name="FREE"
          price="$0"
          periodicity="mo"
          description="Best for individuals"
          button={
            <Link href="/">
              <div className="cursor-pointer">
                <button>Get Started</button>
              </div>
            </Link>
          }
        >
          <PricingFeature text="1 Team Members" />
          <PricingFeature text="1 Website" />
          <PricingFeature text="1 GB Storage" />
          <PricingFeature text="1 TB Transfer" />
          <PricingFeature text="Email Support" />
        </PricingCard>
        <PricingCard
          name="PREMIUM"
          price="$19"
          periodicity="mo"
          description="Best for small teams"
          button={
            <Link href="/">
              <div className="cursor-pointer">
                <button>Get Started</button>
              </div>
            </Link>
          }
        >
          <PricingFeature text="5 Team Members" />
          <PricingFeature text="5 Website" />
          <PricingFeature text="5 GB Storage" />
          <PricingFeature text="5 TB Transfer" />
          <PricingFeature text="Email Support" />
        </PricingCard>
        <PricingCard
          name="ENTERPRISE"
          price="$99"
          periodicity="mo"
          description="Best for industry leader"
          button={
            <Link href="/">
              <div className="cursor-pointer">
                <button>Get Started</button>
              </div>
            </Link>
          }
        >
          <PricingFeature text="30 Team Members" />
          <PricingFeature text="30 Website" />
          <PricingFeature text="30 GB Storage" />
          <PricingFeature text="30 TB Transfer" />
          <PricingFeature text="Email Support" />
        </PricingCard>
      </div>
    </Section>
  </Background>
);

export { Pricing };
