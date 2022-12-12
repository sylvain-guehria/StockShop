'use client';

import { useState } from 'react';

import { AppConfig } from '../../utils/AppConfig';
import NewsBanner from '../04-lib/banner/NewsBanner';
import { Meta } from '../04-lib/layout/Meta';
import { Banner } from './Banner';
import { FAQ } from './FAQ';
import Hero from './Hero';

const Base = () => {
  const [isBetaBannerOpen, setIsBetaBannerOpen] = useState(true);
  return (
    <div className="text-gray-600 antialiased">
      {isBetaBannerOpen && (
        <NewsBanner setIsBetaBannerOpen={setIsBetaBannerOpen} />
      )}
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Hero />
      {/* <GetEarlyAccessIncentive /> */}
      {/* <Customer /> */}
      {/* <Features /> */}
      {/* <VerticalFeatures /> */}
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
      <FAQ />
      <Banner />
    </div>
  );
};

export default Base;
