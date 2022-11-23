import type { FC } from 'react';

import { classNames } from '@/utils/tailwindUtils';

type Props = {
  error?: string;
  register?: any;
  margin?: string;
  inputClassName?: string;
  options: { value: string; label: string }[];
};

const InputRadio: FC<Props> = ({
  error,
  margin,
  inputClassName,
  options,
  ...rest
}) => {
  const { name }: { name: string } = rest.register || { name: '' };

  return (
    <div className={classNames('text-left', margin || 'mt-1')}>
      <div className="flex">
        {options.map((option) => (
          <div className="mr-4 flex items-center" key={option.value}>
            <input
              id={name}
              type="radio"
              {...rest}
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
