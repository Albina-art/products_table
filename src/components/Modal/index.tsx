import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';

import { IconClose } from '../icons';

import * as S from './Modal.styles';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose = () => { }, title, children }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <S.StyledOverlay />
        <S.StyledContent aria-describedby={undefined} onPointerDownOutside={onClose}>
          <S.Header>
            {title ? <S.Title>{title}</S.Title> : <span />}
            <Dialog.Close asChild>
              <S.CloseBtn type="button" aria-label="Закрыть">
                <IconClose />
              </S.CloseBtn>
            </Dialog.Close>
          </S.Header>
          <div>{children}</div>
        </S.StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export type { ModalProps };
