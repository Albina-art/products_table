import { forwardRef } from 'react';

import type { IconProps } from './types';

export const IconPlus = forwardRef<SVGSVGElement, IconProps>(function IconPlus(
  { size = 24, ...props },
  ref
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      viewBox={`0 0 ${size} ${size}`}
      {...props}
    >
      <path d="M12 5V19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12H19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});
