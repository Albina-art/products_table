import * as Label from '@radix-ui/react-label';
import type { InputHTMLAttributes } from 'react';
import { useState } from 'react';

interface AuthInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  showClear?: boolean;
  onClear?: () => void;
  showPasswordToggle?: boolean;
  type?: 'text' | 'password';
}

export function AuthInput({
  label,
  error,
  leadingIcon,
  showClear,
  onClear,
  showPasswordToggle,
  type = 'text',
  id,
  value,
  className = '',
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;
  const hasTrailing = (showClear && value) || showPasswordToggle;

  return (
    <div className="space-y-2">
      {label && (
        <Label.Root
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </Label.Root>
      )}
      <div className="relative">
        {leadingIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leadingIcon}
          </div>
        )}
        <input
          id={inputId}
          type={inputType}
          value={value}
          className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
            leadingIcon ? 'pl-10' : ''
          } ${hasTrailing ? 'pr-10' : ''} ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {hasTrailing && (
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            {showClear && value && (
              <button
                type="button"
                onClick={onClear}
                className="rounded p-1 text-gray-400 hover:text-gray-600"
                aria-label="Очистить"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="rounded p-1 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            )}
          </div>
        )}
      </div>
      {error && (
        <span id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
