import { AppConfig } from '../../utils/AppConfig';
import { Meta } from '../04-lib/layout/Meta';
import { Banner } from './Banner';
import { Customer } from './Customer';
import { FAQ } from './FAQ';
import { Features } from './Features';
import Footer from './Footer';
import HeroIncentive from './HeroIncentive';
import { Pricing } from './Pricing';
import { Testimonial } from './Testimonial';
import { VerticalFeatures } from './VerticalFeatures';

const Base = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <HeroIncentive />
    {/* <Hero /> */}
    <Customer />
    <Features />
    <VerticalFeatures />
    <Testimonial />
    <Pricing />
    <FAQ />
    <Banner />
    <Footer />
  </div>
);

export default Base;
