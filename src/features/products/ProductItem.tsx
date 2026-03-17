import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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

export function ProductItem({
  product,
  isSelected,
  onToggleSelect,
  onDuplicate,
  onEdit,
  onRemove,
}: ProductItemProps) {
  return (
    <tr
      className={`border-b border-gray-100 hover:bg-gray-50/50 ${isSelected ? 'bg-blue-50/30 border-l-4 border-l-blue-600' : ''
        }`}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          className="rounded border-gray-300"
          checked={isSelected}
          onChange={() => onToggleSelect(product.id)}
        />
      </td>
      <td className="px-4 py-3">
        <div>
          <div className="font-medium text-gray-900">{product.title}</div>
          {product.category && (
            <div className="text-xs text-gray-500">{product.category}</div>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {product.brand ?? product.vendor ?? '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {product.sku ?? '-'}
      </td>
      <td className="px-4 py-3 text-sm">
        <span
          className={
            product.rating < 3 ? 'text-red-600 font-medium' : 'text-gray-600'
          }
        >
          {product.rating.toFixed(1)}/5
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {formatPrice(product.price)}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-2 rounded-full text-blue-600 hover:bg-blue-50"
            title="Дублировать"
            onClick={() => onDuplicate(product)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="p-2 rounded-full text-gray-400 hover:bg-gray-100"
                title="Ещё"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="6" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="18" r="1.5" />
                </svg>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[160px] rounded-lg bg-white py-1 shadow-lg border border-gray-200"
                align="end"
                sideOffset={4}
              >
                <DropdownMenu.Item
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer outline-none"
                  onSelect={() => onEdit(product)}
                >
                  Редактировать
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer outline-none"
                  onSelect={() => onDuplicate(product)}
                >
                  Дублировать
                </DropdownMenu.Item>
                {product.isLocal && (
                  <DropdownMenu.Item
                    className='px-3 py-2 text-red-600 hover:bg-red-50 cursor-pointer'
                    onSelect={() => onRemove(product)}
                  >
                    Удалить
                  </DropdownMenu.Item>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </td>
    </tr>
  );
}
