import clsx from 'clsx';
import Link from '@/components/Link';

interface Props {
  totalPages: number;
  currentPage: number;
  type?: 'blog';
}

const pill =
  'pressable inline-flex items-center gap-1.5 rounded-full border border-gray-200/80 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 dark:border-gray-700 dark:text-gray-200';

export default function Pagination({
  totalPages,
  currentPage,
  type = 'blog',
}: Props) {
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
      <nav
        aria-label='Pagination'
        className='flex items-center justify-between'
      >
        {/* Disabled ends are inert spans — no dead buttons to tab through */}
        {prevPage ? (
          <Link
            href={
              currentPage - 1 === 1
                ? `/${type}/`
                : `/${type}/page/${currentPage - 1}`
            }
            aria-label='Previous page'
            className={clsx(
              pill,
              'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/[0.08] dark:hover:text-white',
            )}
          >
            <span aria-hidden='true'>&larr;</span> Previous
          </Link>
        ) : (
          <span className={clsx(pill, 'opacity-40')} aria-hidden='true'>
            <span>&larr;</span> Previous
          </span>
        )}

        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {currentPage} of {totalPages}
        </span>

        {nextPage ? (
          <Link
            href={`/${type}/page/${currentPage + 1}`}
            aria-label='Next page'
            className={clsx(
              pill,
              'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/[0.08] dark:hover:text-white',
            )}
          >
            Next <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : (
          <span className={clsx(pill, 'opacity-40')} aria-hidden='true'>
            Next <span>&rarr;</span>
          </span>
        )}
      </nav>
    </div>
  );
}
