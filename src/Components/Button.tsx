import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-sm',
  secondary:
    'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300',
  danger:
    'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 shadow-sm',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-md',
  md: 'text-sm px-4 py-2 rounded-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
