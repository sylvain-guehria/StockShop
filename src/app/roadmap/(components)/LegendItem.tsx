import clsx from 'clsx';

import type { Navigation } from '@/app/dashboard/(layout)/MobileSideBar';

export const LegendItem = ({
  text,
  Icon,
  iconColor,
}: {
  text: string;
  Icon: Navigation['Icon'];
  iconColor: string;
}) => {
  return (
    <div className="mx-6 p-3">
      <div
        className={clsx(
          'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white',
          iconColor || '',
        )}
      >
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </div>
      <div className="text-sm text-gray-500">{text}</div>
    </div>
  );
};
