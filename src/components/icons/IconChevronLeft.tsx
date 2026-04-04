import { forwardRef } from 'react';

import type { IconProps } from './types';

export const IconChevronLeft = forwardRef<SVGSVGElement, IconProps>(function IconChevronLeft(
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
});
