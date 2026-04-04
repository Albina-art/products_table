import type { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.blue[600]};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.blue[600]};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.blue[700]};
      border-color: ${({ theme }) => theme.colors.blue[700]};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.grey[100]};
    color: ${({ theme }) => theme.colors.grey[900]};
    border-color: ${({ theme }) => theme.colors.grey[200]};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.grey[200]};
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.grey[700]};
    border-color: ${({ theme }) => theme.colors.grey[300]};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.grey[100]};
    }
  `,
};

const StyledButton = styled.button<{ $variant: 'primary' | 'secondary' | 'outline' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.5rem 1rem;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  font-weight: 500;
  border: 1px solid;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  ${({ $variant }) => variantStyles[$variant]}
`;

export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <StyledButton type="button" $variant={variant} className={className} {...props}>
      {children}
    </StyledButton>
  );
}
