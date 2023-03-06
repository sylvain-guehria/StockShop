import clsx from 'clsx';
import type { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
  className?: string;
};

const Background = ({ color, className, children }: IBackgroundProps) => (
  <div className={clsx(color, className || '')}>{children}</div>
);

export { Background };
