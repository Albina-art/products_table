import { forwardRef } from 'react';

import type { IconProps } from './types';

export const IconPerson = forwardRef<SVGSVGElement, IconProps>(function IconPerson(
  { size = 24, ...props },
  ref
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="7.25" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9 13.75H15C16.6569 13.75 18 15.0931 18 16.75V20.75H6V16.75C6 15.1449 7.26055 13.8342 8.8457 13.7539L9 13.75Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
});
