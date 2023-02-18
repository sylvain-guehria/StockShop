import clsx from 'clsx';
import type { FC } from 'react';

type Props = {};

const NotificationDot: FC<Props> = () => {
  return (
    <div
      className={clsx('bg-pink-600', 'h-2.5 w-2.5 shrink-0 rounded-full')}
      aria-hidden="true"
    />
  );
};

export default NotificationDot;
