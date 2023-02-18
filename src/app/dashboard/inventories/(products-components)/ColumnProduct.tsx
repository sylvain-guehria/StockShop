import clsx from 'clsx';
import type { ReactNode } from 'react';

const ColumnProduct = ({
  label,
  className,
  children,
  help,
}: {
  label: string;
  className?: string;
  children?: ReactNode;
  help?: string;
}) => (
  <th
    className={clsx(
      className || '',
      'text-left text-sm font-semibold text-gray-900'
    )}
    scope="col"
  >
    <div className={help ? 'tooltip tooltip-right' : ''}>{label}</div>
    {children}
  </th>
);

export default ColumnProduct;
