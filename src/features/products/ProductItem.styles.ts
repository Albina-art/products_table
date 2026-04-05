import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled, { css } from 'styled-components';

export const Row = styled.tr<{ $selected?: boolean }>`
  ${({ $selected, theme }) => css`
    position: relative;
    border-bottom: 2px solid ${theme.colors.grey[150]};
    &:hover {
      background: rgba(249, 250, 251, 0.5);
    }
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 1px;
      width: 3px;
      height: 100%;
      background-color: ${$selected ? theme.colors.blue[550] : 'transparent'};
    }

    &:first-child {
      &::after {
        top: 0;
        height: calc(100% + 1px);
      }
    }
  `}
`;

export const Td = styled.td`
  padding: 14.5px 2px 14.5px 18px;
`;

export const TdSm = styled(Td)`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.regular};
    font-size: ${theme.typography.body.fontSize};
    color: black;
    font-family: ${theme.fonts.robotoMono};
    text-align: center;
  `}
`;

export const Vendor = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Price = styled.span`
  font-family: ${({ theme }) => theme.fonts.robotoMono};
`;

export const PriceFractional = styled.span`
  color: ${({ theme }) => theme.colors.grey[600]};
`;

/** Область названия связана с чекбоксом через `htmlFor` — клик и клавиатура работают без `div onClick`. */
export const TitleLabel = styled.label`
  display: block;
  cursor: pointer;
`;

export const TitleCell = styled.div`
  line-height: 11px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.grey[950]};

  @media (max-width: 1023px) {
    line-height: 20px;
  }
`;

export const Category = styled.div`
  line-height: 11px;
  margin-top: 10px;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[400]};

  @media (max-width: 1023px) {
    line-height: 16px;
  }
`;

export { Checkbox } from './ProductCheckbox.styles';

export const Rating = styled.span<{ $low?: boolean }>`
  font-weight: ${({ $low, theme }) => ($low ? theme.fontWeight.medium : theme.fontWeight.regular)};
  color: ${({ theme, $low }) => ($low ? theme.colors.red[600] : 'black')};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

export const IconBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5px 14px;
  border: none;
  ${({ theme }) => css`
    border-radius: ${theme.borderRadius.lg};
    background-color: ${theme.colors.primary.DEFAULT};
    color: #fff;
    &:hover {
      background-color: ${theme.colors.primary.light};
    }
  `}
`;

export const MenuBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
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
  min-width: 135px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: #fff;
  padding: 12px 0;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  overflow: hidden;
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
