import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';

import Spinner from '../spinner/Spinner';

type Props = {
  href?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  style?: 'primary' | 'secondary' | 'tertiary';
  onClick?: (params: any) => any;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  buttonClassName?: string;
};

const primaryStyle =
  'bg-primary-100 py-2 px-4 text-base font-medium text-primary-600 hover:bg-primary-200';

const secondaryStyle =
  'bg-primary-500 py-2 px-4 text-base font-medium text-white hover:bg-primary-600';

const tertiaryStyle =
  'text-primary-600 text-base hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600 dark:focus:ring-primary-600';

const styles = {
  primary: primaryStyle,
  secondary: secondaryStyle,
  tertiary: tertiaryStyle,
};

const LinkButton: FC<Props> = ({
  href,
  children,
  style = 'primary',
  type = 'submit',
  onClick,
  className,
  buttonClassName,
  isLoading,
  disabled,
}) => {
  return href ? (
    <Link href={href}>
      <div
        className={clsx(
          `mr-1 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent`,
          className || '',
          styles[style],
          'focus-within:ring-2 focus-within:ring-primary-500'
        )}
      >
        {children}
      </div>
    </Link>
  ) : (
    <div
      className={clsx(
        `mr-1 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent`,
        styles[style],
        className || '',
        'focus-within:ring-2 focus-within:ring-primary-500'
      )}
    >
      <button
        type={type}
        onClick={onClick}
        className={clsx('flex', buttonClassName || '')}
        disabled={disabled || isLoading}
      >
        {children}
        {isLoading && (
          <span className="ml-2">
            <Spinner />
          </span>
        )}
      </button>
    </div>
  );
};
export default LinkButton;
