import { memo } from 'react';

function Footer(): React.ReactElement {
  return (
    <div className='mt-4 flex flex-col items-center py-8 font-light dark:text-white lg:py-8'>
      {/* Copyright removed */}
    </div>
  );
}

export default memo(Footer);
