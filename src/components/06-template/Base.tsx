'use client';

import { useState } from 'react';

import screenShot from '../../../public/assets/images/capture-inventory-market.png';
import { Background } from '../04-lib/background/Background';
import NewsBanner from '../04-lib/banner/NewsBanner';
import Section from '../04-lib/layout/Section';
import NextImage from '../04-lib/nextImage/NextImage';
import NewsLetterIncentive from '../10-home/NewsLetterIncentive/NewsLetterIncentive';
import { Banner } from './Banner';
import { FAQ } from './FAQ';
import Hero from './Hero';
import Incentive from './Incentive';

const Base = () => {
  const [isBetaBannerOpen, setIsBetaBannerOpen] = useState(true);

  return (
    <div className="bg-white text-gray-600 antialiased">
      {isBetaBannerOpen && (
        <NewsBanner setIsBetaBannerOpen={setIsBetaBannerOpen} />
      )}
      <Hero />
      <div className="text-center">
        <Incentive />
      </div>
      <div className="text-center">
        <Background color="bg-gray-200">
          <Section>
            <NextImage
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '0.375rem',
              }}
              src={screenShot}
              alt="Inventory market screenshot"
            />
          </Section>
        </Background>
      </div>
      <NewsLetterIncentive />
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
