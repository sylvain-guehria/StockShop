import { offers } from './fakeDatas';

const Hero = () => {
  return (
    <div className="flex flex-col border-b border-gray-200 lg:border-0">
      <nav aria-label="Offers" className="order-last lg:order-first">
        <div className="mx-auto max-w-7xl lg:px-8">
          <ul
            role="list"
            className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-y-0 lg:divide-x"
          >
            {offers.map((offer) => (
              <li key={offer.name} className="flex flex-col">
                <a
                  href={offer.href}
                  className="relative flex flex-1 flex-col justify-center bg-white py-6 px-4 text-center focus:z-10"
                >
                  <p className="text-sm text-gray-500">{offer.name}</p>
                  <p className="font-semibold text-gray-900">
                    {offer.description}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Hero;
