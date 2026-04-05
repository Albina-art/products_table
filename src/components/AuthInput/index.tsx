import type { InputHTMLAttributes } from 'react';
import { useState } from 'react';

import { IconClose, IconEyeHidden, IconEyeVisible } from '@/components/icons';

import * as S from './AuthInput.styles';

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
    <S.Wrapper className={className}>
      {label && <S.StyledLabel htmlFor={inputId}>{label}</S.StyledLabel>}
      <S.InputWrap>
        {leadingIcon && <S.IconLeft>{leadingIcon}</S.IconLeft>}
        <S.StyledInput
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
          <S.Trailing>
            {showClear && value && (
              <S.IconButton type="button" onClick={onClear} aria-label="Очистить">
                <IconClose />
              </S.IconButton>
            )}
            {showPasswordToggle && (
              <S.IconButton
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                {showPassword ? <IconEyeHidden /> : <IconEyeVisible />}
              </S.IconButton>
            )}
          </S.Trailing>
        )}
      </S.InputWrap>
      {error && (
        <S.ErrorText id={`${inputId}-error`} role="alert">
          {error}
        </S.ErrorText>
      )}
    </S.Wrapper>
  );
}
