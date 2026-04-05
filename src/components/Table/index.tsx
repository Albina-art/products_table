import type { ReactNode } from 'react';

import * as S from './Table.styles';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onSort?: (key: keyof T | string) => void;
  sortKey?: keyof T | string;
  sortOrder?: 'asc' | 'desc';
}

export function Table<T extends object>({
  columns,
  data,
  onSort,
  sortKey,
  sortOrder = 'asc',
}: TableProps<T>) {
  return (
    <S.StyledTable>
      <thead>
        <S.TheadRow>
          {columns.map((col) => (
            <S.Th key={String(col.key)}>
              {col.sortable && onSort ? (
                <S.SortBtn type="button" onClick={() => onSort(col.key)}>
                  {col.header}
                  {sortKey === col.key && (
                    <S.Arrow>{sortOrder === 'asc' ? ' ↑' : ' ↓'}</S.Arrow>
                  )}
                </S.SortBtn>
              ) : (
                col.header
              )}
            </S.Th>
          ))}
        </S.TheadRow>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <S.BodyRow key={(item as { id?: string | number }).id ?? idx}>
            {columns.map((col) => (
              <S.Td key={String(col.key)}>
                {col.render
                  ? col.render(item)
                  : String(item[col.key as keyof T] ?? '')}
              </S.Td>
            ))}
          </S.BodyRow>
        ))}
      </tbody>
    </S.StyledTable>
  );
}
