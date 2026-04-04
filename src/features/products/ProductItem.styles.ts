import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled, { css } from 'styled-components';

export const Row = styled.tr<{ $selected?: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
  &:hover {
    background: rgba(249, 250, 251, 0.5);
  }
  ${({ $selected, theme }) =>
    $selected &&
    css`
      background: rgba(239, 246, 255, 0.3);
      border-left: 4px solid ${theme.colors.blue[600]};
    `}
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
`;

export const TdSm = styled(Td)`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const TitleCell = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.grey[900]};
`;

export const Category = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${({ theme }) => theme.colors.grey[500]};
`;

export { Checkbox } from './ProductCheckbox.styles';

export const Rating = styled.span<{ $low?: boolean }>`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  font-weight: ${({ $low, theme }) => ($low ? theme.fontWeight.medium : theme.fontWeight.regular)};
  color: ${({ theme, $low }) => ($low ? theme.colors.red[600] : theme.colors.grey[600])};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const IconBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.blue[600]};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.blue[50]};
  }
`;

export const MenuBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.grey[400]};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
  }
`;

export const DropdownContent = styled(DropdownMenu.Content)`
  min-width: 10rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: #fff;
  padding: 0.25rem 0;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

export const MenuItem = styled(DropdownMenu.Item)`
  padding: 0.5rem 0.75rem;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[700]};
  cursor: pointer;
  outline: none;
  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
  }
`;

export const MenuItemDanger = styled(DropdownMenu.Item)`
  padding: 0.5rem 0.75rem;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.red[600]};
  cursor: pointer;
  outline: none;
  &:hover {
    background: ${({ theme }) => theme.colors.red[50]};
  }
`;
