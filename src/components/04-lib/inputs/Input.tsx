import type { FC } from 'react';

import { classNames } from '@/utils/tailwindUtils';

type Props = {
  type: 'text' | 'number' | 'email' | 'password';
  label?: string;
  error?: string;
  margin?: string;
  placeholder?: string;
  inputClassName?: string;
  register?: any;
  name: string;
  step?: string;
  value?: string | number;
  disabled?: boolean;
  help?: string;
};

const Input: FC<Props> = ({
  type,
  label,
  placeholder,
  error,
  margin,
  inputClassName,
  register,
  name,
  help,
  step,
  disabled,
  ...rest
}) => {
  const localRegister = register || { name };
  return (
    <div className={classNames('text-left', margin || 'mt-1')}>
      <div className="flex justify-between">
        <label
          htmlFor={name}
          className="block text-start text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <span id="phone-description" className="text-sm text-gray-500">
          {help}
        </span>
      </div>
      <input
        type={type}
        id={name}
        step={step}
        placeholder={placeholder}
        autoComplete={name}
        disabled={disabled}
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
export default Input;
