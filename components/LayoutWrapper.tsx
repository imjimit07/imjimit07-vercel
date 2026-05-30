import { ReactNode, useState } from 'react';
import Footer from './Footer';
import SectionContainer from './SectionContainer';
import SidebarNav from './SidebarNav';
import ThemeSwitch from './ThemeSwitch';

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex'>
      <SidebarNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile header */}
      <div className='flex min-h-screen flex-1 flex-col md:ml-64'>
        <div className='flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800 md:hidden'>
          <button
            type='button'
            className='h-8 w-8 rounded py-1'
            aria-label='Toggle Menu'
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='text-gray-900 dark:text-gray-100'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <ThemeSwitch />
        </div>
        <SectionContainer>
          <div className='flex h-screen flex-col justify-between'>
            <main className='flex flex-1 flex-col'>{children}</main>
            <Footer />
          </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default LayoutWrapper;
