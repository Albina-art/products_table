import { forwardRef } from 'react';

import type { IconProps } from './types';

export const IconPlus = forwardRef<SVGSVGElement, IconProps>(function IconPlus(
  { size = 16, ...props },
  ref
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
});
