import * as Label from '@radix-ui/react-label';
import type { InputHTMLAttributes } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface AuthInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  showClear?: boolean;
  onClear?: () => void;
  showPasswordToggle?: boolean;
  type?: 'text' | 'password';
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StyledLabel = styled(Label.Root)`
  display: block;
  ${({ theme }) => theme.typography.lead};
`;

const InputWrap = styled.div`
  position: relative;
`;

const IconLeft = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.grey[400]};
  display: flex;
`;

const StyledInput = styled.input<{
  $hasError?: boolean;
  $padLeft?: boolean;
  $padRight?: boolean;
}>`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1.5px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.red[500] : theme.colors.grey[100])};
  background: #fff;
  padding: 0.625rem 0.75rem;
  padding-left: ${({ $padLeft }) => ($padLeft ? '2.5rem' : '0.75rem')};
  padding-right: ${({ $padRight }) => ($padRight ? '2.5rem' : '0.75rem')};
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  &::placeholder {
    color: ${({ theme }) => theme.colors.grey[400]};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.blue[500]};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Trailing = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.grey[400]};
  cursor: pointer;
  display: flex;
  &:hover {
    color: ${({ theme }) => theme.colors.grey[600]};
  }
`;

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.red[600]};
`;

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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </IconButton>
            )}
            {showPasswordToggle && (
              <IconButton
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                {showPassword ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_i_1046_84)">
                      <path d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213" stroke="#EDEDED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                      <filter id="filter0_i_1046_84" x="1.15625" y="2" width="21.6884" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1046_84" />
                      </filter>
                    </defs>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_i_1046_84)">
                      <path d="M2.42111 11.2853C3.09445 10.2194 4.56225 8.1817 6.72432 6.71504C8.28678 5.67627 10.0791 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C20.4553 14.4952 17.1054 19 12.0004 19C10.0791 19 8.28678 18.3237 6.72432 17.2853C4.56225 15.8186 3.09445 13.7809 2.42111 12.7156C2.28428 12.499 2.21587 12.3907 2.17774 12.2244C2.1491 12.0995 2.14909 11.9025 2.17771 11.7775C2.21583 11.6112 2.28393 11.5034 2.42013 11.2877L2.42111 11.2853Z" stroke="#EDEDED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <circle cx="12" cy="12" r="2.5" stroke="#EDEDED" stroke-width="2" />
                    </g>

                    <defs>
                      <filter id="filter0_i_1046_84" x="1.15625" y="2" width="21.6884" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1046_84" />
                      </filter>
                    </defs>
                  </svg>
                )}
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
