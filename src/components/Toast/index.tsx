import type { ReactNode } from 'react';

import { IconClose } from '@/components/icons';
import * as S from './Toast.styles';

export interface ToastItem {
  id: string;
  message: ReactNode;
  type?: 'success' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <S.Wrap aria-live="polite">
      {toasts.map((toast) => (
        <S.ToastBox key={toast.id} role="alert" $type={toast.type ?? 'info'}>
          <S.Message>{toast.message}</S.Message>
          <S.CloseBtn type="button" onClick={() => onDismiss(toast.id)} aria-label="Закрыть">
            <IconClose />
          </S.CloseBtn>
        </S.ToastBox>
      ))}
    </S.Wrap>
  );
}
