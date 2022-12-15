import type { ReactNode } from 'react';

import { classNames } from '@/utils/tailwindUtils';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
  className?: string;
};

const Background = (props: IBackgroundProps) => (
  <div className={classNames(props.color, props.className || '')}>
    {props.children}
  </div>
);

export { Background };
