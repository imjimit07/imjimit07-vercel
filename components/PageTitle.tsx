import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Display title: negative tracking as it grows, tight leading, balanced
 * line breaks (from the global h1 rules).
 */
export default function PageTitle({ children }: Props) {
  return (
    <h1 className='text-4xl leading-[1.08] font-bold tracking-apple-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100'>
      {children}
    </h1>
  );
}
