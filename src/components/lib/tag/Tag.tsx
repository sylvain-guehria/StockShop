import clsx from 'clsx';
import type { FC } from 'react';

type Props = {
  label: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
};
const Tag: FC<Props> = ({ label, bgColor, textColor, className }) => (
  <div>
    <span
      className={clsx(
        bgColor || 'bg-gray-100',
        textColor || 'text-gray-800',
        'rounded-full px-2.5 py-0.5 text-center text-xs font-semibold leading-5',
        className || '',
      )}
    >
      {label}
    </span>
  </div>
);

export default Tag;
