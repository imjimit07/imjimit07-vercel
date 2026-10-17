import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

interface StepsProps {
  children: ReactNode;
}

interface StepProps {
  children: ReactNode;
  /** Position in the list — injected by <Steps>. */
  index?: number;
}

/** Ordered walkthrough; the number badges are derived from list position. */
export function Steps({ children }: StepsProps) {
  return (
    <div className='my-6'>
      <ol className='m-0 list-none p-0'>
        {Children.map(children, (child, index) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<StepProps>, { index })
            : child,
        )}
      </ol>
    </div>
  );
}

/** A single step inside <Steps>. */
export function Step({ children, index = 0 }: StepProps) {
  return (
    <li className='relative m-0 list-none pb-6 pl-11 last:pb-0 after:absolute after:top-8 after:bottom-0 after:left-[13px] after:w-px after:bg-gray-200 last:after:hidden dark:after:bg-gray-800'>
      <span
        aria-hidden='true'
        className='absolute top-0 left-0 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[13px] font-semibold text-gray-700 ring-1 ring-gray-200 ring-inset dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700'
      >
        {index + 1}
      </span>
      <div className='min-h-7 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0'>
        {children}
      </div>
    </li>
  );
}
