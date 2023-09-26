import clsx from 'clsx';
import type { FC } from 'react';

type Props = {
  error?: string;
  register?: any;
  inputClassName?: string;
  options: { value: string | boolean | number; label: string }[];
  name: string;
  label?: string;
  defaultValue?: string | boolean | number;
  disabled?: boolean;
  className?: string;
};

const InputRadio: FC<Props> = ({
  error,
  inputClassName,
  options,
  name,
  label,
  register,
  defaultValue,
  disabled,
  className,
}) => {
  const localRegister = register || { name };

  return (
    <div className={clsx(className || '', 'text-left')}>
      {label && (
        <div className="flex justify-between">
          <label
            htmlFor={name}
            className="inline-block truncate text-start text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        </div>
      )}
      <div className="mt-1 flex">
        {options.map((option, index) => (
          <div
            className="mr-4 flex items-center"
            key={`${option.value}-${index}`}
          >
            <input
              id={name}
              type="radio"
              name={name}
              defaultChecked={option.value === defaultValue}
              value={option.value}
              disabled={disabled}
              {...localRegister}
              className={clsx(
                inputClassName || '',
                'h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500',
              )}
            />
            <label
              htmlFor={name}
              className="ml-3 block text-start text-sm font-medium text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600" id="inventoryName-error">
          {error}
        </p>
      )}
    </div>
  );
};
export default InputRadio;
