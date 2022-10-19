import Collections from './Collections';
import Hero from './Hero';
import Perk from './Perk';
import SalesTestimonials from './SalesTestimonials';
import TrendingProducts from './TrendingProducts';

const Marketplace = () => {
  return (
    <main>
      <Hero />
      <TrendingProducts />
      <Collections />
      <SalesTestimonials />
      <Perk />
    </main>
  );
};
export default Marketplace;
