import { useMemo, useState } from 'react';

import { Modal } from '@/components/Modal';
import { useToast } from '@/features/ui/useToast';
import type { Product } from '@/types/product';

import { ProductForm } from './ProductForm';
import { ProductItem } from './ProductItem';
import { ProductTableSkeleton } from './ProductTableSkeleton';
import { useProductsQuery } from './useProductsQuery';
import { useProductStore } from './useProductStore';

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
    <button
      type="button"
      className="flex items-center gap-1 font-medium text-gray-700 hover:text-blue-600 transition-colors"
      onClick={() => onSort(colKey as keyof Product)}
    >
      {label}
      {sortKey === colKey && (
        <span className="text-blue-600">{sortOrder === 'asc' ? ' ↑' : ' ↓'}</span>
      )}
    </button>
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
    return (
      <p className="py-8 text-red-600">Ошибка загрузки: {String(error)}</p>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden relative">
      {isFetching && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden rounded-t-lg z-10">
          <div className="h-full w-0 min-h-[4px] rounded-full progress-bar-fill" />
        </div>
      )}
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/50">
            <th className="w-12 px-4 py-3">
              <input type="checkbox" className="rounded border-gray-300" readOnly />
            </th>
            <th className="px-4 py-3 text-left">
              <SortHeader
                colKey="title"
                label="Наименование"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </th>
            <th className="px-4 py-3 text-left">
              <SortHeader
                colKey="brand"
                label="Вендор"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </th>
            <th className="px-4 py-3 text-left">
              <SortHeader
                colKey="sku"
                label="Артикул"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </th>
            <th className="px-4 py-3 text-left">
              <SortHeader
                colKey="rating"
                label="Оценка"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </th>
            <th className="px-4 py-3 text-left">
              <SortHeader
                colKey="price"
                label="Цена, P"
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={setSort}
              />
            </th>
            <th className="w-24 px-4 py-3" />
          </tr>
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
      </table>

      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Редактировать товар"
      >
        {editingProduct && (
          <ProductForm
            initialProduct={editingProduct}
            onSuccess={handleEditSuccess}
          />
        )}
      </Modal>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50/30">
        <span className="text-sm text-gray-600">
          Показано {start}-{end} из {total}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              className={`min-w-[32px] h-8 rounded text-sm font-medium ${p === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
