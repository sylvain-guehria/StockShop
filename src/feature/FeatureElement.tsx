import { ReactNode } from 'react';

type IFeatureElementProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

const FeatureElement = (props: IFeatureElementProps) => (
  <div className="feature-element flex flex-col">
    <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-gray-100 border border-gray-300 flex-shrink-0">
      {props.icon}
    </div>

    <div className="mt-2 text-center">
      <div className="text-2xl text-gray-900 font-semibold">{props.title}</div>
      <div className="mt-2 text-lg leading-8">{props.children}</div>
    </div>

    <style jsx>
      {`
        .feature-element :global(svg) {
          @apply text-primary-400 stroke-current w-6 h-6 stroke-2;
        }
      `}
    </style>
  </div>
);

export { FeatureElement };
