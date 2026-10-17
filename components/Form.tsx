import clsx from 'clsx';

interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

interface HeaderProps extends BaseProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export function Header(props: HeaderProps): React.ReactElement {
  const { title, subtitle, children } = props;

  return (
    <div className='space-y-2 pt-6 pb-8 md:space-y-4'>
      <h1 className='text-4xl leading-[1.05] font-bold tracking-apple-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100'>
        {title}
      </h1>
      {subtitle && (
        <p className='text-lg leading-7 tracking-apple-base text-gray-500 dark:text-gray-400'>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

export function H1(props: BaseProps): React.ReactElement {
  const { className, children } = props;

  return (
    <h1
      className={clsx(
        'mb-4 text-3xl font-bold tracking-apple-tight lg:text-5xl dark:text-white',
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2(props: BaseProps): React.ReactElement {
  const { className, children } = props;

  return (
    <h2
      className={clsx(
        'mb-4 text-2xl font-semibold tracking-apple-tight dark:text-white',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3(props: BaseProps): React.ReactElement {
  const { className, children } = props;

  return (
    <h3
      className={clsx('mb-1 text-lg font-semibold dark:text-white', className)}
    >
      {children}
    </h3>
  );
}
