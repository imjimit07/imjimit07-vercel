import { memo } from 'react';

function Footer(): React.ReactElement {
  const year: number = new Date().getFullYear();

  return (
    <div className='mt-4 flex flex-col items-center py-8 font-light dark:text-white lg:py-8'>
      <span className='text-xs font-light'>&copy; {year} Jimit Patel</span>
    </div>
  );
}

export default memo(Footer);
