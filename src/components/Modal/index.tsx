import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl"
          onPointerDownOutside={onClose}
        >
          <div className="flex items-center justify-between mb-4">
            {title && (
              <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
            )}
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded p-1 hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                aria-label="Закрыть"
              >
                ×
              </button>
            </Dialog.Close>
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
