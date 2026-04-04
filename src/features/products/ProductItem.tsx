import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { IconDotsVertical, IconPlus } from '@/components/icons';
import type { Product } from '@/types/product';
import { formatPrice } from '@/utils';

import {
  Actions,
  Category,
  Checkbox,
  DropdownContent,
  IconBtn,
  MenuBtn,
  MenuItem,
  MenuItemDanger,
  Rating,
  Row,
  Td,
  TdSm,
  TitleCell,
} from './ProductItem.styles';

interface ProductItemProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onDuplicate: (product: Product) => void;
  onEdit: (product: Product) => void;
  onRemove: (product: Product) => void;
}

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
            <IconPlus size={16} />
          </IconBtn>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <MenuBtn type="button" title="Ещё">
                <IconDotsVertical size={16} />
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
