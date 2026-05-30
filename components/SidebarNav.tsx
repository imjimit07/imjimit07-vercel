import SocialIcons from '@/components/SocialIcons';
import headerNavLinks from '@/data/headerNavLinks';
import Image from 'next/image';
import Link from './Link';
import ThemeSwitch from './ThemeSwitch';

interface SidebarNavProps {
  open: boolean;
  onClose: () => void;
}

const SidebarNav = ({ open, onClose }: SidebarNavProps) => {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className='fixed inset-0 z-30 bg-black/50 md:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white text-gray-900 transition-transform duration-300 dark:border-white/10 dark:bg-black dark:text-white md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className='flex items-center gap-3 border-b border-gray-200 px-6 py-6 dark:border-white/10'>
          <Image
            src='/static/avatar.jpg'
            alt='Jimit Patel'
            width={40}
            height={40}
            className='rounded-full object-cover'
            style={{ width: 'auto', height: 'auto' }}
          />
          <Link
            href='/'
            className='text-sm font-bold tracking-[0.2em] uppercase'
          >
            Jimit Patel
          </Link>
        </div>

        {/* Nav links */}
        <div className='flex-1 space-y-1 px-4 py-6'>
          {headerNavLinks.map(link => (
            <div key={link.title} className='nav-link-wrapper group'>
              <Link
                href={link.href}
                className='nav-link relative block overflow-hidden px-3 py-3 text-sm font-medium tracking-[0.15em] uppercase text-gray-500 transition-colors duration-300 hover:text-gray-900 dark:text-white/60 dark:hover:text-white'
                onClick={onClose}
              >
                <span className='relative z-10'>{link.title}</span>
                <span className='nav-decoration absolute inset-0 origin-left scale-x-0 bg-gray-200 transition-transform duration-300 group-hover:scale-x-100 dark:bg-white/10' />
              </Link>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div className='flex justify-center border-t border-gray-200 py-3 dark:border-white/10'>
          <div className='dark:[&_.icon]:!text-white/60 dark:hover:[&_.icon]:!text-white'>
            <SocialIcons />
          </div>
        </div>

        {/* Bottom bar */}
        <div className='flex items-center justify-between border-t border-gray-200 px-6 py-5 dark:border-white/10'>
          <span className='text-[11px] text-gray-400 dark:text-white/30'>
            &copy; {new Date().getFullYear()}
          </span>
          <ThemeSwitch />
        </div>
      </nav>
    </>
  );
};

export default SidebarNav;
