import { memo } from 'react';
import SocialIcons from './SocialIcons';

/**
 * Desktop gets its socials and meta in the persistent sidebar, so the
 * footer only closes out the page on small screens.
 */
function Footer(): React.ReactElement {
  return (
    <footer className='hairline mt-12 flex flex-col items-center border-t py-8 md:hidden'>
      <SocialIcons className='mt-0 justify-center' />
      <p className='mt-4 text-xs text-gray-400 dark:text-gray-500'>
        &copy; {new Date().getFullYear()} Jimit Patel
      </p>
    </footer>
  );
}

export default memo(Footer);
