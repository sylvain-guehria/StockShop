import { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
  image?: {
    src: string;
    alt: string;
  };
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    <h1 className="text-5xl text-gray-900 font-bold whitespace-pre-line leading-hero">
      {props.title}
    </h1>
    <div className="text-2xl mt-4 mb-6">{props.description}</div>

    {props.button}

    {props.image && (
      <img
        className="mt-12 mx-auto rounded-md"
        src={props.image.src}
        alt={props.image.alt}
      />
    )}
  </header>
);

export { HeroOneButton };
