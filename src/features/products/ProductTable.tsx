import { useCallback, useMemo, useState } from 'react';

import { IconChevronLeft, IconChevronRight } from '@/components/icons';
import { Modal } from '@/components/Modal';
import { useToast } from '@/features/ui/useToast';
import type { Product } from '@/types/product';

import { ProductForm } from './ProductForm';
import { ProductItem } from './ProductItem';
import * as S from './ProductTable.styles';
import { ProductTableSkeleton } from './ProductTableSkeleton';
import { usePaginationWindow } from './usePaginationWindow';
import { useProductsQuery } from './useProductsQuery';
import { useProductStore } from './useProductStore';

function SortHeader({
  colKey,
  label,
  sortKey,
  sortOrder,
  onSort,
  isLeftTextAlign
}: {
  colKey: keyof Product | string;
  label: string;
  sortKey: keyof Product | string | null;
  sortOrder: 'asc' | 'desc';
  onSort: (key: keyof Product) => void;
  isLeftTextAlign?: boolean;
}) {
  return (
    <S.SortBtn type="button" onClick={() => onSort(colKey as keyof Product)} $isLeftTextAlign={isLeftTextAlign}>
      {label}
      {sortKey === colKey && <S.SortArrow>{sortOrder === 'asc' ? ' ↑' : ' ↓'}</S.SortArrow>}
    </S.SortBtn>
  );
}

export function ProductTable() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { data, isLoading, isFetching, error } = useProductsQuery();
  const { showToast } = useToast();
  const {
    sortKey,
    sortOrder,
    setSort,
    addedProducts,
    updatedProducts,
    selectedIds,
    toggleSelect,
    deselect,
    page,
    limit,
    setPage,
    addProduct,
    removeProduct,
  } = useProductStore();

  const handleDuplicate = (product: Product) => {
    const copy: Product = {
      ...product,
      id: Date.now(),
      isLocal: true,
    };
    addProduct(copy);
    showToast(`Товар «${product.title}» продублирован`, 'success');
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleRemove = (product: Product) => {
    removeProduct(product.id);
    showToast(`Товар «${product.title}» удалён`, 'success');
  };

  const handleEditSuccess = () => {
    setEditingProduct(null);
    showToast('Товар сохранён', 'success');
  };

  const rawProducts = useMemo(() => {
    const apiProducts = (data?.products ?? []).map((p) => updatedProducts[p.id] ?? p);
    if (page === 1 && addedProducts.length > 0) {
      return [...addedProducts, ...apiProducts].slice(0, limit);
    }
    return apiProducts;
  }, [data?.products, addedProducts, updatedProducts, page, limit]);

  const products = useMemo(() => {
    if (!sortKey) return rawProducts;
    return [...rawProducts].sort((a, b) => {
      const aVal = a[sortKey as keyof Product];
      const bVal = b[sortKey as keyof Product];
      if (aVal == null || bVal == null) return 0;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }, [rawProducts, sortKey, sortOrder]);

  const total = (data?.total ?? 0) + addedProducts.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const { visiblePageNumbers } = usePaginationWindow({ page, totalPages, setPage });

  const isAllSelected = selectedIds.length === products.length;

  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      deselect(products.map((product) => product.id));
    } else {
      toggleSelect(products.map((product) => product.id));
    }
  }, [isAllSelected, products, deselect, toggleSelect]);

  const handleToggleSelect = (id: number) => {
    const ids = [id];
    if (selectedIds.includes(id)) {
      deselect(ids);
    } else {
      toggleSelect(ids);
    }
  };

  if (isLoading) {
    return <ProductTableSkeleton />;
  }

  if (error) {
    return <S.ErrorText>Ошибка загрузки: {String(error)}</S.ErrorText>;
  }

  if (totalPages === 0) {
    return (
      <div>
        <S.EmptyText>Нет данных</S.EmptyText>
      </div>
    );
  }

  return (
    <S.TableWrap>
      {isFetching && (
        <S.FetchingBar>
          <div className="progress-bar-fill" style={{ height: '100%', minHeight: 4 }} />
        </S.FetchingBar>
      )}
      <S.StyledTable>
        <thead>
          <S.TheadRow>
            <S.Th $narrow>
              <S.Checkbox checked={isAllSelected} onChange={toggleSelectAll} />
            </S.Th>
            <S.Th>
              <SortHeader
                colKey="title"
                label="Наименование"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
                isLeftTextAlign
              />
            </S.Th>
            <S.Th>
              <SortHeader
                colKey="brand"
                label="Вендор"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </S.Th>
            <S.Th>
              <SortHeader
                colKey="sku"
                label="Артикул"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </S.Th>
            <S.Th>
              <SortHeader
                colKey="rating"
                label="Оценка"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </S.Th>
            <S.Th>
              <SortHeader
                colKey="price"
                label="Цена, ₽"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </S.Th>
            <S.Th style={{ width: '6rem' }} />
          </S.TheadRow>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              isSelected={selectedIds.includes(product.id)}
              onToggleSelect={() => handleToggleSelect(product.id)}
              onDuplicate={handleDuplicate}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          ))}
        </tbody>
      </S.StyledTable>

      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Редактировать товар"
      >
        {editingProduct && (
          <ProductForm initialProduct={editingProduct} onSuccess={handleEditSuccess} />
        )}
      </Modal>

      <S.Pagination>
        <S.PageInfo>
          Показано {start}-{end} из {total}
        </S.PageInfo>
        <S.PageNav>
          <S.PageBtn type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <IconChevronLeft />
          </S.PageBtn>
          {visiblePageNumbers.map((p) => (
            <S.PageNum key={p} type="button" $active={p === page} onClick={() => setPage(p)}>
              {p}
            </S.PageNum>
          ))}
          <S.PageBtn
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            <IconChevronRight />
          </S.PageBtn>
        </S.PageNav>
      </S.Pagination>
    </S.TableWrap>
  );
}
