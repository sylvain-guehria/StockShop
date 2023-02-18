import clsx from 'clsx';
import type { FC } from 'react';

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
    <div className={clsx('text-left')}>
      <div className="flex justify-between">
        <label
          htmlFor={name}
          className="inline-block overflow-hidden text-ellipsis whitespace-nowrap text-start text-sm font-medium text-gray-700 hover:inline-flex hover:min-w-max hover:bg-inherit"
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
        className={clsx(
          inputClassName || '',
          'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          'overflow-hidden text-ellipsis whitespace-nowrap'
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
