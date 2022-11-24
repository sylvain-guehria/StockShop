import type { ReactNode } from 'react';

import { classNames } from '@/utils/tailwindUtils';

const ColumnProduct = ({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children?: ReactNode;
}) => (
  <th
    className={classNames(
      className || '',
      'text-left text-sm font-semibold text-gray-900'
    )}
    scope="col"
  >
    {label}
    {children}
  </th>
);

export default ColumnProduct;
