import type { FC } from 'react';

import { classNames } from '@/utils/tailwindUtils';

type Props = {
  label?: string;
  error?: string;
  margin?: string;
  inputClassName?: string;
  options: { value: string; label: string }[];
  name: string;
  register?: any;
};

const InputSelect: FC<Props> = ({
  label,
  error,
  margin,
  inputClassName,
  options,
  name,
  register,
  ...rest
}) => {
  const localRegister = register || { name };

  return (
    <div className={classNames('text-left', margin || 'mt-1')}>
      <label
        htmlFor={name}
        className="block text-start text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={name}
        autoComplete={name}
        {...localRegister}
        {...rest}
        className={classNames(
          inputClassName || '',
          'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600" id="inventoryName-error">
          {error}
        </p>
      )}
    </div>
  );
};
export default InputSelect;
