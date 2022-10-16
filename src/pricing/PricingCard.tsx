import { ReactNode } from 'react';

import className from 'classnames';

type IPricingCardProps = {
  name: string;
  price: string;
  periodicity: string;
  description: string;
  button: ReactNode;
  children: ReactNode;
};

const PricingCard = (props: IPricingCardProps) => {
  const pricingCardClass = className(
    'p-8',
    'border',
    'border-gray-200',
    'rounded-md',
    'bg-white'
  );

  return (
    <div className={pricingCardClass}>
      <div className="inline-flex bg-primary-200 rounded-full px-3 py-1 text-sm font-semibold text-primary-600 tracking-wider">
        {props.name}
      </div>

      <div className="mt-2">
        <span className="text-gray-900 text-5xl font-bold">{props.price}</span>
        <span className="ml-1">{`/ ${props.periodicity}`}</span>
      </div>

      <div className="mt-4 text-gray-700 text-lg font-medium">
        {props.description}
      </div>

      <ul className="mt-4 mb-8">{props.children}</ul>

      {props.button}
    </div>
  );
};

export { PricingCard };
