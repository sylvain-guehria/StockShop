import Section from '@/components/lib/layout/Section';

const Marketplace = () => {
  return (
    <main>
      <Section
        title="Marketplace en cours de développement"
        description="Le marketplace vous permettra de voir les produits disponible de vos commerces favoris, de les réserver ou de les acheter en click & collect."
      >
        <div className="mx-auto h-full w-full text-center">
          <iframe
            height={600}
            width={'100%'}
            src="https://embed.lottiefiles.com/animation/82561"
          ></iframe>
        </div>
      </Section>
      {/* <Hero />
      <TrendingProducts />
      <Collections />
      <SalesTestimonials />
      <Perk /> */}
    </main>
  );
};
export default Marketplace;
