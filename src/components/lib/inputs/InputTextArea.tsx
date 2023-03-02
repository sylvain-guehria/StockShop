import clsx from 'clsx';
import type { FC } from 'react';

type Props = {
  label?: string;
  error?: string;
  register?: any;
  placeholder?: string;
  inputClassName?: string;
  name: string;
  disabled?: boolean;
  value?: string;
};

const InputTextArea: FC<Props> = ({
  label,
  placeholder,
  error,
  inputClassName,
  register,
  disabled,
  name,
  ...rest
}) => {
  const localRegister = register || { name };
  return (
    <div className={clsx('text-left')}>
      <label
        htmlFor={name}
        className="inline-block truncate text-start text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        autoComplete={name}
        disabled={disabled}
        {...localRegister}
        {...rest}
        className={clsx(
          inputClassName || '',
          'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm'
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
