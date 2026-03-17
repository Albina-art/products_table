import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Product } from '@/types/product';

type SortKey = keyof Product | '';

interface ProductState {
  sortKey: SortKey;
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
  addedProducts: Product[];
  updatedProducts: Record<number, Product>;
  selectedIds: number[];
  page: number;
  limit: number;
  setSort: (key: SortKey) => void;
  setSearchQuery: (query: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  toggleSelect: (id: number) => void;
  setPage: (page: number) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      sortKey: '',
      sortOrder: 'asc',
      searchQuery: '',
      addedProducts: [],
      updatedProducts: {},
      selectedIds: [],
      page: 1,
      limit: 20,

      setSort: (key) =>
        set((state) => ({
          sortKey: key,
          sortOrder:
            state.sortKey === key && state.sortOrder === 'asc' ? 'desc' : 'asc',
        })),

      setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),

      addProduct: (product) =>
        set((state) => ({
          addedProducts: [...state.addedProducts, product],
        })),

      updateProduct: (product) =>
        set((state) => {
          const inAdded = state.addedProducts.some((p) => p.id === product.id);
          if (inAdded) {
            return {
              addedProducts: state.addedProducts.map((p) =>
                p.id === product.id ? product : p
              ),
            };
          }
          return {
            updatedProducts: { ...state.updatedProducts, [product.id]: product },
          };
        }),

      removeProduct: (id: number) =>
        set((state) => ({
          addedProducts: state.addedProducts.filter((p) => p.id !== id),
          updatedProducts: (() => {
            const rest = { ...state.updatedProducts };
            delete rest[id];
            return rest;
          })(),
        })),

      toggleSelect: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.includes(id)
            ? state.selectedIds.filter((x) => x !== id)
            : [...state.selectedIds, id],
        })),

      setPage: (page: number) => set({ page }),
    }),
    {
      name: 'products-sort',
      partialize: (state) => ({ sortKey: state.sortKey, sortOrder: state.sortOrder }),
    }
  )
);
