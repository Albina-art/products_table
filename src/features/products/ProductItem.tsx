import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled, { css } from 'styled-components';

import type { Product } from '@/types/product';
import { formatPrice } from '@/utils';

interface ProductItemProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onDuplicate: (product: Product) => void;
  onEdit: (product: Product) => void;
  onRemove: (product: Product) => void;
}

const Row = styled.tr<{ $selected?: boolean }>`
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

const Td = styled.td`
  padding: 0.75rem 1rem;
`;

const TdSm = styled(Td)`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const TitleCell = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey[900]};
`;

const Category = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${({ theme }) => theme.colors.grey[500]};
`;

const Checkbox = styled.input`
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border-color: ${({ theme }) => theme.colors.grey[300]};
`;

const Rating = styled.span<{ $low?: boolean }>`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  font-weight: ${({ $low }) => ($low ? 500 : 400)};
  color: ${({ theme, $low }) => ($low ? theme.colors.red[600] : theme.colors.grey[600])};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const IconBtn = styled.button`
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

const MenuBtn = styled.button`
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

const DropdownContent = styled(DropdownMenu.Content)`
  min-width: 10rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: #fff;
  padding: 0.25rem 0;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

const MenuItem = styled(DropdownMenu.Item)`
  padding: 0.5rem 0.75rem;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[700]};
  cursor: pointer;
  outline: none;
  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
  }
`;

const MenuItemDanger = styled(DropdownMenu.Item)`
  padding: 0.5rem 0.75rem;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.red[600]};
  cursor: pointer;
  outline: none;
  &:hover {
    background: ${({ theme }) => theme.colors.red[50]};
  }
`;

export function ProductItem({
  product,
  isSelected,
  onToggleSelect,
  onDuplicate,
  onEdit,
  onRemove,
}: ProductItemProps) {
  return (
    <Row $selected={isSelected}>
      <Td>
        <Checkbox
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(product.id)}
        />
      </Td>
      <Td>
        <div>
          <TitleCell>{product.title}</TitleCell>
          {product.category && <Category>{product.category}</Category>}
        </div>
      </Td>
      <TdSm>{product.brand ?? product.vendor ?? '-'}</TdSm>
      <TdSm>{product.sku ?? '-'}</TdSm>
      <TdSm>
        <Rating $low={product.rating < 3}>{product.rating.toFixed(1)}/5</Rating>
      </TdSm>
      <TdSm>{formatPrice(product.price)}</TdSm>
      <Td>
        <Actions>
          <IconBtn type="button" title="Дублировать" onClick={() => onDuplicate(product)}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </IconBtn>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <MenuBtn type="button" title="Ещё">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="6" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="18" r="1.5" />
                </svg>
              </MenuBtn>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownContent align="end" sideOffset={4}>
                <MenuItem onSelect={() => onEdit(product)}>Редактировать</MenuItem>
                <MenuItem onSelect={() => onDuplicate(product)}>Дублировать</MenuItem>
                {product.isLocal && (
                  <MenuItemDanger onSelect={() => onRemove(product)}>Удалить</MenuItemDanger>
                )}
              </DropdownContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </Actions>
      </Td>
    </Row>
  );
}
