const SKELETON_ROWS = 10;

function SkeletonCell({ className = '' }: { className?: string }) {
  return <div className={`h-4 skeleton ${className}`} />;
}

export function ProductTableSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/50">
            <th className="w-12 px-4 py-3">
              <div className="h-4 w-4 skeleton rounded" />
            </th>
            <th className="px-4 py-3 text-left">
              <div className="h-4 w-24 skeleton" />
            </th>
            <th className="px-4 py-3 text-left">
              <div className="h-4 w-16 skeleton" />
            </th>
            <th className="px-4 py-3 text-left">
              <div className="h-4 w-16 skeleton" />
            </th>
            <th className="px-4 py-3 text-left">
              <div className="h-4 w-14 skeleton" />
            </th>
            <th className="px-4 py-3 text-left">
              <div className="h-4 w-16 skeleton" />
            </th>
            <th className="w-24 px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="px-4 py-3">
                <div className="h-4 w-4 skeleton rounded" />
              </td>
              <td className="px-4 py-3">
                <div className="space-y-2">
                  <SkeletonCell className="w-3/4 max-w-[200px]" />
                  <SkeletonCell className="w-1/2 max-w-[120px] h-3" />
                </div>
              </td>
              <td className="px-4 py-3">
                <SkeletonCell className="w-20" />
              </td>
              <td className="px-4 py-3">
                <SkeletonCell className="w-24" />
              </td>
              <td className="px-4 py-3">
                <SkeletonCell className="w-12" />
              </td>
              <td className="px-4 py-3">
                <SkeletonCell className="w-16" />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <div className="h-8 w-8 skeleton rounded-full" />
                  <div className="h-8 w-8 skeleton rounded-full" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
