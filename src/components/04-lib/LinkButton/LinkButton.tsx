import Link from 'next/link';
import type { FC } from 'react';

type Props = {
  href: string;
  children: string;
  style?: 'primary' | 'secondary';
};

const primaryStyle =
  'bg-primary-100 py-2 px-4 text-base font-medium text-primary-600 hover:bg-primary-200';

const secondaryStyle =
  'bg-primary-500 py-2 px-4 text-base font-medium text-white hover:bg-primary-600';

const styles = {
  primary: primaryStyle,
  secondary: secondaryStyle,
};

const LinkButton: FC<Props> = ({ href, children, style = 'primary' }) => {
  return (
    <Link href={href}>
      <div
        className={`mr-1 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent ${styles[style]}`}
      >
        {children}
      </div>
    </Link>
  );
};
export default LinkButton;
