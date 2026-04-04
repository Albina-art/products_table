import { forwardRef } from 'react';

import type { IconProps } from './types';

export const IconDotsVertical = forwardRef<SVGSVGElement, IconProps>(function IconDotsVertical(
  { size = 16, ...props },
  ref
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="12" cy="6" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="18" r="1.5" />
    </svg>
  );
});
