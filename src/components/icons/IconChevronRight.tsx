import { forwardRef } from 'react';

import type { IconProps } from './types';

export const IconChevronRight = forwardRef<SVGSVGElement, IconProps>(function IconChevronRight(
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
});
