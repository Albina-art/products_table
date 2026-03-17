import { createContext, type ReactNode } from 'react';

import type { ToastItem } from '@/components/Toast';

export interface ToastContextValue {
  showToast: (message: ReactNode, type?: ToastItem['type']) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
