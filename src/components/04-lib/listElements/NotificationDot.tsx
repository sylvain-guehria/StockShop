import type { FC } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {};

const NotificationDot: FC<Props> = () => {
  return (
    <div
      className={classNames(
        'bg-pink-600',
        'flex-shrink-0 w-2.5 h-2.5 rounded-full'
      )}
      aria-hidden="true"
    />
  );
};

export default NotificationDot;
