import Link from 'next/link';
import type { FC, SVGProps } from 'react';

import { Background } from '../lib/background/Background';

const navigation = {
  social: [
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/in/sylvain-guehria-ab9737134/',
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 64 64" {...props}>
          <path
            fillRule="evenodd"
            d="M32,6C17.641,6,6,17.641,6,32c0,14.359,11.641,26,26,26s26-11.641,26-26C58,17.641,46.359,6,32,6z M25,44h-5V26h5V44z M22.485,24h-0.028C20.965,24,20,22.888,20,21.499C20,20.08,20.995,19,22.514,19c1.521,0,2.458,1.08,2.486,2.499 C25,22.887,24.035,24,22.485,24z M44,44h-5v-9c0-3-1.446-4-3-4c-1.445,0-3,1-3,4v9h-5V26h5v3c0.343-0.981,1.984-3,5-3c4,0,6,3,6,8 V44z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const Footer: FC = () => {
  return (
    <Background color="bg-gray-200">
      <footer>
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-8 w-8" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-base leading-5 text-gray-500">
              &copy; 2020 Inventory Market, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Background>
  );
};

export default Footer;
