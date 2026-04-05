import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import { IconClose } from '../icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const StyledOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const StyledContent = styled(Dialog.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  width: 100%;
  max-width: 28rem;
  transform: translate(-50%, -50%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: #fff;
  padding: 48px;
  box-shadow: ${({ theme }) => theme.shadow.xl};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled(Dialog.Title)`
  margin: 0;
  font-size: 1.125rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const CloseBtn = styled.button`
  border: none;
  background: none;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.grey[500]};
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
    color: ${({ theme }) => theme.colors.grey[700]};
  }
`;

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent aria-describedby={undefined} onPointerDownOutside={onClose}>
          <Header>
            {title ? <Title>{title}</Title> : <span />}
            <Dialog.Close asChild>
              <CloseBtn type="button" aria-label="Закрыть">
                <IconClose />
              </CloseBtn>
            </Dialog.Close>
          </Header>
          <div>{children}</div>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
