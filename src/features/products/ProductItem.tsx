import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { IconDots, IconPlus } from '@/components/icons';
import type { Product } from '@/types/product';
import { formatPrice } from '@/utils';

import * as S from './ProductItem.styles';

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
    <S.Row $selected={isSelected}>
      <S.Td>
        <S.Checkbox checked={isSelected} onChange={() => onToggleSelect(product.id)} />
      </S.Td>
      <S.Td>
        <div>
          <S.TitleCell>{product.title}</S.TitleCell>
          {product.category && <S.Category>{product.category}</S.Category>}
        </div>
      </S.Td>
      <S.TdSm>{product.brand ?? product.vendor ?? '-'}</S.TdSm>
      <S.TdSm>{product.sku ?? '-'}</S.TdSm>
      <S.TdSm>
        <S.Rating $low={product.rating < 3}>{product.rating.toFixed(1)}/5</S.Rating>
      </S.TdSm>
      <S.TdSm>{formatPrice(product.price)}</S.TdSm>
      <S.Td>
        <S.Actions>
          <S.IconBtn type="button" title="Дублировать" onClick={() => onDuplicate(product)}>
            <IconPlus />
          </S.IconBtn>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <S.MenuBtn type="button" title="Ещё">
                <IconDots />
              </S.MenuBtn>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <S.DropdownContent align="end" sideOffset={4}>
                <S.MenuItem onSelect={() => onEdit(product)}>Редактировать</S.MenuItem>
                <S.MenuItem onSelect={() => onDuplicate(product)}>Дублировать</S.MenuItem>
                {product.isLocal && (
                  <S.MenuItemDanger onSelect={() => onRemove(product)}>Удалить</S.MenuItemDanger>
                )}
              </S.DropdownContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </S.Actions>
      </S.Td>
    </S.Row>
  );
}
