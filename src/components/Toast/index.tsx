import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { IconClose } from '@/components/icons';

export interface ToastItem {
  id: string;
  message: ReactNode;
  type?: 'success' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

const Wrap = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 100;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  max-width: 420px;
`;

const ToastBox = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: #fff;
  padding: 0.75rem 1rem;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  border-left: 4px solid ${({ theme, $type }) => {
    switch ($type) {
      case 'success':
        return theme.colors.green[500];
      case 'error':
        return theme.colors.red[500];
      case 'info':
        return theme.colors.blue[500];
    }
  }};
`;

const Message = styled.span`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const CloseBtn = styled.button`
  border: none;
  background: none;
  line-height: 1;
  padding: 4px;
  color: #fff;
  cursor: pointer;
  ${({ theme }) => css`
    border-radius: ${theme.borderRadius.lg};
    background-color: ${theme.colors.primary.DEFAULT};
    &:hover {
      background-color: ${theme.colors.primary.light};
    }
  `}
`;

export function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <Wrap aria-live="polite">
      {toasts.map((toast) => (
        <ToastBox key={toast.id} role="alert" $type={toast.type ?? 'info'}>
          <Message>{toast.message}</Message>
          <CloseBtn type="button" onClick={() => onDismiss(toast.id)} aria-label="Закрыть">
            <IconClose />
          </CloseBtn>
        </ToastBox>
      ))}
    </Wrap>
  );
}
