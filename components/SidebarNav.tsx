'use client';

import clsx from 'clsx';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useRef, RefObject } from 'react';
import headerNavLinks from '@/data/headerNavLinks';
import { spring, stagger, staggerItem } from '@/lib/motion';
import Link from './Link';
import SocialIcons from './SocialIcons';
import ThemeSwitch from './ThemeSwitch';

interface SidebarNavProps {
  open: boolean;
  onClose: () => void;
}

/** Shared width: `w-72` here must match the `md:ml-72` offset in LayoutWrapper. */
const WIDTH_CLASS = 'w-72';

function isActiveRoute(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Where am I? — the active destination gets a capsule that springs between items. */
function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { asPath } = useRouter();
  // asPath carries query/hash; compare against the path only
  const pathname = asPath.split('?')[0].split('#')[0];

  return (
    <motion.ul
      variants={stagger(0.05, 0.05)}
      initial='hidden'
      animate='show'
      className='flex-1 space-y-1 overflow-y-auto px-3 py-6'
    >
      {headerNavLinks.map(link => {
        const active = isActiveRoute(pathname, link.href);

        return (
          <motion.li
            key={link.title}
            variants={staggerItem}
            className='relative'
          >
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={clsx(
                'relative flex items-center rounded-apple-base px-4 py-3 text-sm font-medium tracking-[0.08em] uppercase transition-colors duration-150',
                active
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 hover:bg-gray-900/[0.04] hover:text-gray-900 dark:text-white/60 dark:hover:bg-white/[0.06] dark:hover:text-white',
              )}
            >
              {active && (
                <motion.span
                  layoutId='sidebar-active-pill'
                  transition={spring.ui}
                  className='absolute inset-0 rounded-apple-base bg-gray-900/[0.06] dark:bg-white/[0.1]'
                />
              )}
              <span className='relative z-10 flex items-center gap-3'>
                <motion.span
                  aria-hidden='true'
                  animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
                  transition={spring.snappy}
                  className='h-1.5 w-1.5 rounded-full bg-primary-500'
                />
                {link.title}
              </span>
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

function Brand({
  showClose,
  closeRef,
  onClose,
}: {
  showClose?: boolean;
  closeRef?: RefObject<HTMLButtonElement | null>;
  onClose?: () => void;
}) {
  return (
    <div className='hairline flex items-center gap-3 border-b px-5 py-6'>
      <Image
        src='/static/avatar.jpeg'
        alt='Jimit Patel'
        width={44}
        height={44}
        className='h-11 w-11 rounded-full object-cover ring-2 ring-black/5 dark:ring-white/10'
      />
      <Link
        href='/'
        onClick={onClose}
        className='text-sm font-semibold tracking-[0.15em] text-gray-900 uppercase dark:text-white'
      >
        Jimit Patel
      </Link>
      {showClose && (
        <motion.button
          ref={closeRef}
          type='button'
          aria-label='Close menu'
          onClick={onClose}
          whileTap={{ scale: 0.97 }}
          transition={spring.press}
          className='ml-auto rounded-apple-sm p-2 text-gray-500 hover:bg-gray-900/[0.04] dark:text-white/60 dark:hover:bg-white/[0.06]'
        >
          <svg viewBox='0 0 20 20' fill='currentColor' className='h-4 w-4'>
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
}

function SidebarFootnote() {
  return (
    <div className='hairline flex items-center justify-between border-t px-5 py-4'>
      <span className='text-xs text-gray-400 dark:text-white/30'>
        &copy; {new Date().getFullYear()}
      </span>
      <ThemeSwitch />
    </div>
  );
}

const SidebarNav = ({ open, onClose }: SidebarNavProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // While the drawer is open: lock scroll, close on Escape, move focus in.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  // Crossing into the desktop layout makes the drawer redundant — close it
  // so we never leave the page scroll-locked at a size with no close button.
  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia('(min-width: 768px)');
    const handleChange = () => {
      if (desktop.matches) onClose();
    };

    handleChange();
    desktop.addEventListener('change', handleChange);
    return () => desktop.removeEventListener('change', handleChange);
  }, [open, onClose]);

  return (
    <>
      {/* Persistent sidebar from md up — part of the layout, not an overlay */}
      <LayoutGroup id='sidebar-desktop'>
        <nav
          aria-label='Main'
          className={clsx(
            'material-thick fixed inset-y-0 left-0 z-40 hidden flex-col md:flex',
            WIDTH_CLASS,
          )}
        >
          <Brand />
          <NavLinks />
          <div className='hairline border-t py-4'>
            <SocialIcons className='justify-center' />
          </div>
          <SidebarFootnote />
        </nav>
      </LayoutGroup>

      {/* Mobile drawer — materialises over a dimmed, blurred backdrop */}
      <LayoutGroup id='sidebar-mobile'>
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key='sidebar-backdrop'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={spring.ui}
                onClick={onClose}
                className='fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden'
              />
              <motion.nav
                key='sidebar-drawer'
                role='dialog'
                aria-modal='true'
                aria-label='Main'
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={spring.drawer}
                className={clsx(
                  'material-thick fixed inset-y-0 left-0 z-50 flex flex-col md:hidden',
                  WIDTH_CLASS,
                )}
              >
                <Brand showClose closeRef={closeButtonRef} onClose={onClose} />
                <NavLinks onNavigate={onClose} />
                <div className='hairline border-t py-4'>
                  <SocialIcons className='justify-center' />
                </div>
                <SidebarFootnote />
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </>
  );
};

export default SidebarNav;
