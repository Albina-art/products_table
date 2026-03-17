import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { productsApi } from '@/api/products';

import { useProductStore } from './useProductStore';

export function useProductsQuery() {
  const { searchQuery, page, limit } = useProductStore();
  const skip = (page - 1) * limit;

  return useQuery({
    queryKey: ['products', { search: searchQuery, skip, limit }],
    queryFn: () =>
      searchQuery
        ? productsApi.search(searchQuery, { limit, skip })
        : productsApi.getList({ limit, skip }),
    placeholderData: keepPreviousData,
  });
}
