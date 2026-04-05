import styled, { css } from 'styled-components';

export const Wrap = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 100;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  max-width: 420px;
`;

export const ToastBox = styled.div<{ $type: 'success' | 'error' | 'info' }>`
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

export const Message = styled.span`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[700]};
`;

export const CloseBtn = styled.button`
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
