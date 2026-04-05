import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

export const StyledOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const StyledContent = styled(Dialog.Content)`
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

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled(Dialog.Title)`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.title.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const CloseBtn = styled.button`
  border: none;
  background: none;
  padding: 10px;
  aspect-ratio: 1/1;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.grey[500]};
  cursor: pointer;
  line-height: 1;
  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
    color: ${({ theme }) => theme.colors.grey[700]};
  }
`;