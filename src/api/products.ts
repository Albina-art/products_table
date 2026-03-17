import type { Product, ProductsResponse } from '@/types/product';

import { apiClient } from './client';

type ProductsParams = {
  limit?: number;
  skip?: number;
};

export const productsApi = {
  getList: (params?: ProductsParams) => {
    const searchParams: Record<string, string> = {};
    if (params?.limit) searchParams.limit = String(params.limit);
    if (params?.skip) searchParams.skip = String(params.skip);
    return apiClient.get<ProductsResponse>('/products', {
      params: Object.keys(searchParams).length ? searchParams : undefined,
    });
  },

  getById: (id: string) =>
    apiClient.get<Product>(`/products/${id}`),

  search: (q: string, params?: ProductsParams) => {
    const searchParams: Record<string, string> = { q };
    if (params?.limit) searchParams.limit = String(params.limit);
    if (params?.skip) searchParams.skip = String(params.skip);
    return apiClient.get<ProductsResponse>('/products/search', { params: searchParams });
  },
};
