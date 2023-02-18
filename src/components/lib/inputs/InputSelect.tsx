import type { FC } from 'react';

import { classNames } from '@/utils/tailwindUtils';

type Props = {
  label?: string;
  error?: string;
  inputClassName?: string;
  options: { value: string; label: string }[];
  name: string;
  register?: any;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const InputSelect: FC<Props> = ({
  label,
  error,
  inputClassName,
  options,
  name,
  register,
  disabled,
  ...rest
}) => {
  const localRegister = register || { name };

  return (
    <div className={classNames('text-left')}>
      <div className="flex justify-between">
        <label
          htmlFor={name}
          className="inline-block overflow-hidden text-ellipsis whitespace-nowrap text-start text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      </div>

      <select
        id={name}
        autoComplete={name}
        disabled={disabled}
        {...localRegister}
        {...rest}
        className={classNames(
          inputClassName || '',
          'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          'overflow-hidden text-ellipsis whitespace-nowrap'
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
