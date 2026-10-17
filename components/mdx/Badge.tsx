import { ReactNode } from 'react';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface Props {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900',
  secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
  destructive:
    'bg-red-500/10 text-red-700 ring-1 ring-red-500/25 ring-inset dark:text-red-400',
  outline:
    'text-gray-800 ring-1 ring-gray-300 ring-inset dark:text-gray-200 dark:ring-gray-700',
};

/** Small inline status label for prose and page chrome. */
export default function Badge({ variant = 'default', children }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 align-middle text-xs font-medium whitespace-nowrap ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
