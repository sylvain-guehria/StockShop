import clsx from 'clsx';
import type { FC } from 'react';

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
    <div className={clsx('text-left')}>
      <div className="flex justify-between">
        <label
          htmlFor={name}
          className={clsx(
            'inline-block truncate text-start text-sm font-medium text-gray-700',
            'hover:z-50 hover:inline-flex hover:min-w-max hover:bg-white/100 hover:pr-3'
          )}
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
        className={clsx(
          inputClassName || '',
          'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          'truncate'
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
