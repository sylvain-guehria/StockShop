import type { FC } from 'react';

import { classNames } from '@/utils/tailwindUtils';

type Props = {
  label?: string;
  error?: string;
  register?: any;
  margin?: string;
  placeholder?: string;
  inputClassName?: string;
  name: string;
};

const InputTextArea: FC<Props> = ({
  label,
  placeholder,
  error,
  margin,
  inputClassName,
  register,
  name,
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
      <textarea
        id={name}
        placeholder={placeholder}
        autoComplete={name}
        {...localRegister}
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
export default InputTextArea;
