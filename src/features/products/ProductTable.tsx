import { useMemo, useState } from 'react';
import styled from 'styled-components';

import { Modal } from '@/components/Modal';
import { useToast } from '@/features/ui/useToast';
import type { Product } from '@/types/product';

import { ProductForm } from './ProductForm';
import { ProductItem } from './ProductItem';
import { ProductTableSkeleton } from './ProductTableSkeleton';
import { useProductsQuery } from './useProductsQuery';
import { useProductStore } from './useProductStore';

const SortBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey[700]};
  cursor: pointer;
  transition: color 0.15s;
  &:hover {
    color: ${({ theme }) => theme.colors.blue[600]};
  }
`;

const SortArrow = styled.span`
  color: ${({ theme }) => theme.colors.blue[600]};
`;

function SortHeader({
  colKey,
  label,
  sortKey,
  sortOrder,
  onSort,
}: {
  colKey: keyof Product | string;
  label: string;
  sortKey: keyof Product | string | null;
  sortOrder: 'asc' | 'desc';
  onSort: (key: keyof Product) => void;
}) {
  return (
    <SortBtn type="button" onClick={() => onSort(colKey as keyof Product)}>
      {label}
      {sortKey === colKey && (
        <SortArrow>{sortOrder === 'asc' ? ' ↑' : ' ↓'}</SortArrow>
      )}
    </SortBtn>
  );
}

const TableWrap = styled.div`
  position: relative;
  background: #fff;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  overflow: hidden;
`;

const FetchingBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${({ theme }) => theme.colors.grey[100]};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg} 0 0;
  z-index: 10;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.fonts.robotoMono};
`;

const Th = styled.th<{ $narrow?: boolean }>`
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: inherit;
  width: ${({ $narrow }) => ($narrow ? '3rem' : 'auto')};
`;

const TheadRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
  background: rgba(249, 250, 251, 0.5);
`;

const Checkbox = styled.input`
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border-color: ${({ theme }) => theme.colors.grey[300]};
`;

const ErrorText = styled.p`
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.red[600]};
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};
  background: rgba(249, 250, 251, 0.3);
`;

const PageInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const PageNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PageBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  color: inherit;
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.grey[200]};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageNum = styled.button<{ $active?: boolean }>`
  min-width: 2rem;
  height: 2rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  font-weight: 500;
  cursor: pointer;
  background: ${({ theme, $active }) => ($active ? theme.colors.blue[600] : 'transparent')};
  color: ${({ theme, $active }) => ($active ? '#fff' : theme.colors.grey[600])};
  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.blue[600] : theme.colors.grey[200])};
  }
`;

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
    const apiProducts = (data?.products ?? []).map(
      (p) => updatedProducts[p.id] ?? p
    );
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
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  if (isLoading) {
    return <ProductTableSkeleton />;
  }

  if (error) {
    return <ErrorText>Ошибка загрузки: {String(error)}</ErrorText>;
  }

  return (
    <TableWrap>
      {isFetching && (
        <FetchingBar>
          <div className="progress-bar-fill" style={{ height: '100%', minHeight: 4 }} />
        </FetchingBar>
      )}
      <StyledTable>
        <thead>
          <TheadRow>
            <Th $narrow>
              <Checkbox type="checkbox" readOnly />
            </Th>
            <Th>
              <SortHeader
                colKey="title"
                label="Наименование"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </Th>
            <Th>
              <SortHeader
                colKey="brand"
                label="Вендор"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </Th>
            <Th>
              <SortHeader
                colKey="sku"
                label="Артикул"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </Th>
            <Th>
              <SortHeader
                colKey="rating"
                label="Оценка"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </Th>
            <Th>
              <SortHeader
                colKey="price"
                label="Цена, P"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </Th>
            <Th style={{ width: '6rem' }} />
          </TheadRow>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              isSelected={selectedIds.includes(product.id)}
              onToggleSelect={toggleSelect}
              onDuplicate={handleDuplicate}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          ))}
        </tbody>
      </StyledTable>

      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Редактировать товар"
      >
        {editingProduct && (
          <ProductForm initialProduct={editingProduct} onSuccess={handleEditSuccess} />
        )}
      </Modal>

      <Pagination>
        <PageInfo>
          Показано {start}-{end} из {total}
        </PageInfo>
        <PageNav>
          <PageBtn type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </PageBtn>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
            <PageNum key={p} type="button" $active={p === page} onClick={() => setPage(p)}>
              {p}
            </PageNum>
          ))}
          <PageBtn
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </PageBtn>
        </PageNav>
      </Pagination>
    </TableWrap>
  );
}
