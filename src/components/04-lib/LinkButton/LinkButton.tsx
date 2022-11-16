import Link from 'next/link';
import type { FC } from 'react';

type Props = {
  href?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  style?: 'primary' | 'secondary';
  onClick?: (params: any) => any;
};

const primaryStyle =
  'bg-primary-100 py-2 px-4 text-base font-medium text-primary-600 hover:bg-primary-200';

const secondaryStyle =
  'bg-primary-500 py-2 px-4 text-base font-medium text-white hover:bg-primary-600';

const styles = {
  primary: primaryStyle,
  secondary: secondaryStyle,
};

const LinkButton: FC<Props> = ({
  href,
  children,
  style = 'primary',
  type = 'submit',
  onClick,
}) => {
  return href ? (
    <Link href={href}>
      <div
        className={`mr-1 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent ${styles[style]}`}
      >
        {children}
      </div>
    </Link>
  ) : (
    <div
      className={`mr-1 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent ${styles[style]}`}
    >
      <button type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
export default LinkButton;
