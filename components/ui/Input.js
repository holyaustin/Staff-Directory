'use client';
import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helper,
  className = '',
  required = false,
  ...props
}, ref) => {
  const id = props.id || props.name || Math.random().toString(36);

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`
          w-full px-4 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-poly-blue focus:border-transparent
          transition-colors duration-200
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-gray-500 mt-1">{helper}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;