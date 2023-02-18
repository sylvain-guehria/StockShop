import clsx from 'clsx';
import type { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
  className?: string;
};

const Background = (props: IBackgroundProps) => (
  <div className={clsx(props.color, props.className || '')}>
    {props.children}
  </div>
);

export { Background };
