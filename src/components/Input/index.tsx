import * as Label from '@radix-ui/react-label';
import type { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledLabel = styled(Label.Root)`
  display: block;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  ${({ theme, $hasError }) => css`
    width: 100%;
    border-radius: ${theme.borderRadius.md};
    border: 1px solid ${$hasError ? theme.colors.red[500] : theme.colors.grey[300]};
    padding: 0.5rem 0.75rem;
    font-size: ${theme.typography.bodySm.fontSize};
    &::placeholder {
      color: ${theme.colors.grey[400]};
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${theme.colors.grey[100]};
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `}
`;

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.red[600]};
`;

export function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  return (
    <Wrapper className={className}>
      {label && <StyledLabel htmlFor={inputId}>{label}</StyledLabel>}
      <StyledInput
        id={inputId}
        $hasError={!!error}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <ErrorText id={`${inputId}-error`} role="alert">
          {error}
        </ErrorText>
      )}
    </Wrapper>
  );
}
