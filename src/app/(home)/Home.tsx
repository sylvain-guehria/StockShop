'use client';

import { deleteCookie, getCookie } from 'cookies-next';
import type { FC } from 'react';
import { useState } from 'react';

import { superBaseAuthTokenCookieName } from '@/supabase/constant';

import screenShot from '../../../public/assets/images/capture-inventory-market.png';
import { Background } from '../../components/lib/background/Background';
import NewsBanner from '../../components/lib/banner/NewsBanner';
import Section from '../../components/lib/layout/Section';
import NextImage from '../../components/lib/nextImage/NextImage';
import NewsLetterIncentive from './(NewsLetterIncentive)/NewsLetterIncentive';
import { Banner } from './Banner';
import { FAQ } from './FAQ';
import Hero from './Hero';
import Incentive from './Incentive';

interface Props {
  isLoggedIn: boolean;
}

const Home: FC<Props> = ({ isLoggedIn }) => {
  const [isBetaBannerOpen, setIsBetaBannerOpen] = useState(true);

  const superBaseAuthTokenCookie = getCookie(superBaseAuthTokenCookieName);
  if (!isLoggedIn && superBaseAuthTokenCookie) {
    deleteCookie(superBaseAuthTokenCookieName);
  }

  return (
    <div className="bg-white text-gray-600 antialiased">
      {isBetaBannerOpen && (
        <NewsBanner setIsBetaBannerOpen={setIsBetaBannerOpen} />
      )}
      <Hero />
      <Incentive />
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

export default Home;
