import type { FC } from 'react';

import { classNames } from '@/utils/tailwindUtils';

type Props = {
  error?: string;
  register?: any;
  margin?: string;
  inputClassName?: string;
  options: { value: string | boolean | number; label: string }[];
  name: string;
};

const InputRadio: FC<Props> = ({
  error,
  margin,
  inputClassName,
  options,
  name,
  register,
}) => {
  const localRegister = register || { name };

  return (
    <div className={classNames('text-left', margin || 'mt-1')}>
      <div className="flex">
        {options.map((option, index) => (
          <div
            className="mr-4 flex items-center"
            key={`${option.value}-${index}`}
          >
            <input
              id={name}
              type="radio"
              name={name}
              value={option.value}
              {...localRegister}
              className={classNames(
                inputClassName || '',
                'h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
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
