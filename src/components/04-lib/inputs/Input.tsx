import type { FC } from 'react';

import { classNames } from '@/utils/tailwindUtils';

type Props = {
  type: string;
  label?: string;
  error?: string;
  register?: any;
  margin?: string;
  placeholder?: string;
  inputClassName?: string;
};

const Input: FC<Props> = ({
  type,
  label,
  placeholder,
  error,
  margin,
  inputClassName,
  ...rest
}) => {
  const { name }: { name: string } = rest.register || { name: '' };
  return (
    <div className={classNames('text-left', margin || 'mt-1')}>
      <label
        htmlFor={name}
        className="block text-start text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        autoComplete={name}
        {...rest}
        className={classNames(
          inputClassName || '',
          'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        )}
      />
      {error && (
        <p className="text-sm text-red-600" id="inventoryName-error">
          {error}
        </p>
      )}
    </div>
  );
};
export default Input;
