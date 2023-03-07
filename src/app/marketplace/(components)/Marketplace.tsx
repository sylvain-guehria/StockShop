import maintenanceGif from 'public/maintenance.gif';

import { Background } from '@/components/lib/background/Background';
import Section from '@/components/lib/layout/Section';
import NextImage from '@/components/lib/nextImage/NextImage';

const Marketplace = () => {
  return (
    <main>
      <Background color="bg-white">
        <Section
          title="Marketplace en cours de développement"
          description="Le marketplace vous permettra de voir les produits disponible de vos commerces favoris, de les réserver ou de les acheter en click & collect."
        >
          <div className="justify-center">
            <NextImage src={maintenanceGif} alt="maintenance-gif" />
          </div>
        </Section>
        {/* <Hero />
      <TrendingProducts />
      <Collections />
      <SalesTestimonials />
      <Perk /> */}
      </Background>
    </main>
  );
};
export default Marketplace;
