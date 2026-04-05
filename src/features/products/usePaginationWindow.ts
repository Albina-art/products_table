import { useEffect, useMemo } from 'react';

type UsePaginationWindowParams = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  windowSize?: number;
};

export function usePaginationWindow({
  page,
  totalPages,
  setPage,
  windowSize = 5,
}: UsePaginationWindowParams) {
  const visiblePageNumbers = useMemo(() => {
    if (totalPages <= 0) {
      return [];
    }

    if (totalPages <= windowSize) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = Math.max(1, page - Math.floor(windowSize / 2));
    const endPage = Math.min(totalPages, startPage + windowSize - 1);

    if (endPage - startPage + 1 < windowSize) {
      startPage = Math.max(1, endPage - windowSize + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [page, totalPages, windowSize]);

  useEffect(() => {
    if (page > totalPages && totalPages >= 1) {
      setPage(totalPages);
    }
  }, [page, totalPages, setPage]);

  return { visiblePageNumbers };
}
