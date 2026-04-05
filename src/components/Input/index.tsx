import type { InputHTMLAttributes } from 'react';

import * as S from './Input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  return (
    <S.Wrapper className={className}>
      {label && <S.StyledLabel htmlFor={inputId}>{label}</S.StyledLabel>}
      <S.StyledInput
        id={inputId}
        $hasError={!!error}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <S.ErrorText id={`${inputId}-error`} role="alert">
          {error}
        </S.ErrorText>
      )}
    </S.Wrapper>
  );
}
