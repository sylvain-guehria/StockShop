'use client';

import { useState } from 'react';

import NewsLetterIncentiveForm from '@/app/(home)/(NewsLetterIncentive)/NewsLetterIncentiveForm';

import screenShot from '../../../public/assets/images/capture-inventory-market.png';
import { Background } from '../../components/lib/background/Background';
import NewsBanner from '../../components/lib/banner/NewsBanner';
import Section from '../../components/lib/layout/Section';
import NextImage from '../../components/lib/nextImage/NextImage';
import { Banner } from './Banner';
import { FAQ } from './FAQ';
import Hero from './Hero';
import Incentive from './Incentive';

const Home = () => {
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
      <NewsLetterIncentiveForm />
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

export default Home;
