'use client';

import { AppConfig } from '../../utils/AppConfig';
import { Meta } from '../04-lib/layout/Meta';
import { Banner } from './Banner';
import { FAQ } from './FAQ';
import GetEarlyAccessIncentive from './GetEarlyAccessIncentive';
import Hero from './Hero';
import { Pricing } from './Pricing';
import { Testimonial } from './Testimonial';
import { VerticalFeatures } from './VerticalFeatures';

const Base = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <GetEarlyAccessIncentive />
    {/* <Customer /> */}
    {/* <Features /> */}
    <VerticalFeatures />
    <Testimonial />
    <Pricing />
    <FAQ />
    <Banner />
  </div>
);

export default Base;
