import { classNames } from '@/utils/tailwindUtils';

const ColumnProduct = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => (
  <th
    className={classNames(
      className || '',
      'text-left text-sm font-semibold text-gray-900'
    )}
    scope="col"
  >
    {label}
  </th>
);

export default ColumnProduct;
