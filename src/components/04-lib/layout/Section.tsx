import type { ReactNode } from 'react';

type ISectionProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  yPadding?: string;
  children: ReactNode;
};

const Section = (props: ISectionProps) => (
  <div
    className={`mx-auto max-w-screen-lg px-3 ${
      props.yPadding ? props.yPadding : 'py-16'
    }`}
  >
    {(props.title || props.subtitle || props.description) && (
      <div className="mb-12 text-center">
        {props.subtitle && (
          <div className="text-sm font-bold text-primary-500">
            {props.subtitle}
          </div>
        )}
        {props.title && (
          <h2 className="text-4xl font-bold text-gray-900">{props.title}</h2>
        )}
        {props.description && (
          <p className="mx-auto mt-4 max-w-3xl text-center text-xl leading-normal text-gray-500">
            {props.description}
          </p>
        )}
      </div>
    )}

    {props.children}
  </div>
);

export { Section };
