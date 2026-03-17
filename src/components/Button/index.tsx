import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  asChild?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-gray-200',
  outline: 'bg-transparent text-gray-700 hover:bg-gray-100 border-gray-300',
};

export function Button({
  variant = 'primary',
  asChild = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      type="button"
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border transition-colors disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
