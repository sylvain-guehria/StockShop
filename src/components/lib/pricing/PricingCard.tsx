import clsx from 'clsx';
import type { ReactNode } from 'react';

type IPricingCardProps = {
  name: string;
  price: string;
  periodicity: string;
  description: string;
  button: ReactNode;
  children: ReactNode;
};

const PricingCard = (props: IPricingCardProps) => {
  const pricingCardClass = clsx(
    'p-8',
    'border',
    'border-gray-200',
    'rounded-md',
    'bg-white',
  );

  return (
    <div className={pricingCardClass}>
      <div className="inline-flex rounded-full bg-primary-200 px-3 py-1 text-sm font-semibold tracking-wider text-primary-600">
        {props.name}
      </div>

      <div className="mt-2">
        <span className="text-5xl font-bold text-gray-900">{props.price}</span>
        <span className="ml-1">{`/ ${props.periodicity}`}</span>
      </div>

      <div className="mt-4 text-lg font-medium text-gray-700">
        {props.description}
      </div>

      <ul className="mb-8 mt-4">{props.children}</ul>

      {props.button}
    </div>
  );
};

export { PricingCard };
