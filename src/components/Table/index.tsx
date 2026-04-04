import type { ReactNode } from 'react';
import styled from 'styled-components';

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

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 0.75rem 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const TheadRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

const BodyRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
  &:hover {
    background: rgba(249, 250, 251, 0.5);
  }
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const SortBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  color: inherit;
  &:hover {
    color: ${({ theme }) => theme.colors.blue[600]};
  }
`;

const Arrow = styled.span`
  color: ${({ theme }) => theme.colors.blue[600]};
`;

export function Table<T extends object>({
  columns,
  data,
  onSort,
  sortKey,
  sortOrder = 'asc',
}: TableProps<T>) {
  return (
    <StyledTable>
      <thead>
        <TheadRow>
          {columns.map((col) => (
            <Th key={String(col.key)}>
              {col.sortable && onSort ? (
                <SortBtn type="button" onClick={() => onSort(col.key)}>
                  {col.header}
                  {sortKey === col.key && (
                    <Arrow>{sortOrder === 'asc' ? ' ↑' : ' ↓'}</Arrow>
                  )}
                </SortBtn>
              ) : (
                col.header
              )}
            </Th>
          ))}
        </TheadRow>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <BodyRow key={(item as { id?: string | number }).id ?? idx}>
            {columns.map((col) => (
              <Td key={String(col.key)}>
                {col.render
                  ? col.render(item)
                  : String(item[col.key as keyof T] ?? '')}
              </Td>
            ))}
          </BodyRow>
        ))}
      </tbody>
    </StyledTable>
  );
}
