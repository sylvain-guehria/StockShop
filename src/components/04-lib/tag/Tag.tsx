import type { FC } from 'react';

import { classNames } from '@/utils/tailwindUtils';

type Props = {
  label: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
};
const Tag: FC<Props> = ({ label, bgColor, textColor, className }) => (
  <div>
    <span
      className={classNames(
        bgColor || 'bg-gray-100',
        textColor || 'text-gray-800',
        'items-center px-2.5 py-0.5 rounded-full text-xs font-semibold leading-5',
        className || ''
      )}
    >
      {label}
    </span>
  </div>
);

export default Tag;
