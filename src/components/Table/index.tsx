import type { ReactNode } from 'react';

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
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-gray-200">
          {columns.map((col) => (
            <th key={String(col.key)} className="px-4 py-3 font-medium text-gray-700">
              {col.sortable && onSort ? (
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  onClick={() => onSort(col.key)}
                >
                  {col.header}
                  {sortKey === col.key && (
                    <span className="text-blue-600">{sortOrder === 'asc' ? ' ↑' : ' ↓'}</span>
                  )}
                </button>
              ) : (
                col.header
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr
            key={(item as { id?: string | number }).id ?? idx}
            className="border-b border-gray-100 hover:bg-gray-50/50"
          >
            {columns.map((col) => (
              <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-600">
                {col.render
                  ? col.render(item)
                  : String(item[col.key as keyof T] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
