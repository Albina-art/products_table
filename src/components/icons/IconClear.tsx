import { forwardRef } from 'react';

import type { IconProps } from './types';

export const IconClear = forwardRef<SVGSVGElement, IconProps>(function IconClear(
  { size = 17, ...props },
  ref
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={Math.round((size * 18) / 17)}
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1.01031 1L15.0103 17" stroke="#C9C9C9" strokeWidth="2" stroke-linecap="round" />
      <path d="M15 1L1 17" stroke="#C9C9C9" strokeWidth="2" stroke-linecap="round" />
    </svg>
  );
});
