import type { InputHTMLAttributes } from 'react';
import { useState } from 'react';

import { IconClear, IconEyeHidden, IconEyeVisible } from '@/components/icons';

import {
  ErrorText,
  IconButton,
  IconLeft,
  InputWrap,
  StyledInput,
  StyledLabel,
  Trailing,
  Wrapper,
} from './AuthInput.styles';

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
  className,
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;
  const hasTrailing = (showClear && value) || showPasswordToggle;

  return (
    <Wrapper className={className}>
      {label && <StyledLabel htmlFor={inputId}>{label}</StyledLabel>}
      <InputWrap>
        {leadingIcon && <IconLeft>{leadingIcon}</IconLeft>}
        <StyledInput
          id={inputId}
          type={inputType}
          value={value}
          $hasError={!!error}
          $padLeft={!!leadingIcon}
          $padRight={!!hasTrailing}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {hasTrailing && (
          <Trailing>
            {showClear && value && (
              <IconButton type="button" onClick={onClear} aria-label="Очистить">
                <IconClear />
              </IconButton>
            )}
            {showPasswordToggle && (
              <IconButton
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                {showPassword ? <IconEyeHidden /> : <IconEyeVisible />}
              </IconButton>
            )}
          </Trailing>
        )}
      </InputWrap>
      {error && (
        <ErrorText id={`${inputId}-error`} role="alert">
          {error}
        </ErrorText>
      )}
    </Wrapper>
  );
}
