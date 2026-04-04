import { forwardRef, useId } from 'react';

import type { IconProps } from './types';

/** «Показать пароль» — открытый глаз (пароль скрыт). */
export const IconEyeVisible = forwardRef<SVGSVGElement, IconProps>(function IconEyeVisible(
  { size = 24, ...props },
  ref
) {
  const filterId = useId().replace(/:/g, '');

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
      <g filter={`url(#${filterId})`}>
        <path
          d="M2.42111 11.2853C3.09445 10.2194 4.56225 8.1817 6.72432 6.71504C8.28678 5.67627 10.0791 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C20.4553 14.4952 17.1054 19 12.0004 19C10.0791 19 8.28678 18.3237 6.72432 17.2853C4.56225 15.8186 3.09445 13.7809 2.42111 12.7156C2.28428 12.499 2.21587 12.3907 2.17774 12.2244C2.1491 12.0995 2.14909 11.9025 2.17771 11.7775C2.21583 11.6112 2.28393 11.5034 2.42013 11.2877L2.42111 11.2853Z"
          stroke="#EDEDED"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.5" stroke="#EDEDED" strokeWidth="2" />
      </g>
      <defs>
        <filter id={filterId} x="1.15625" y="2" width="21.6884" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1046_84" />
        </filter>
      </defs>
    </svg>
  );
});
