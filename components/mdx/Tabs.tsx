import {
  Children,
  isValidElement,
  KeyboardEvent,
  ReactNode,
  useId,
  useRef,
  useState,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { spring } from '@/lib/motion';

interface TabsProps {
  /** Tab titles. Falls back to each <TabsContent label='…'>. */
  labels?: string[];
  defaultValue?: number;
  children: ReactNode;
}

interface TabsContentProps {
  label?: string;
  children: ReactNode;
}

/**
 * Accessible tab set for MDX content: roving tabindex, arrow-key
 * navigation, and an underline that settles with a spring.
 */
export function Tabs({ labels, defaultValue = 0, children }: TabsProps) {
  const items = Children.toArray(children).filter(
    child => typeof child !== 'string' || child.trim() !== '',
  );
  const derivedLabels = items.map((child, index) =>
    isValidElement<{ label?: string }>(child) &&
    typeof child.props.label === 'string'
      ? child.props.label
      : `Tab ${index + 1}`,
  );
  const tabLabels = labels ?? derivedLabels;
  const [active, setActive] = useState(() =>
    Math.min(Math.max(defaultValue, 0), Math.max(items.length - 1, 0)),
  );
  const baseId = useId();
  const shouldReduceMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activate = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = tabLabels.length - 1;
    let next: number | null = null;
    if (event.key === 'ArrowRight') {
      next = active === lastIndex ? 0 : active + 1;
    } else if (event.key === 'ArrowLeft') {
      next = active === 0 ? lastIndex : active - 1;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = lastIndex;
    }
    if (next === null || next < 0) return;
    event.preventDefault();
    activate(next);
  };

  return (
    <div className='my-6 overflow-hidden rounded-apple-lg border border-gray-200/70 bg-gray-50/50 dark:border-gray-800 dark:bg-white/[0.03]'>
      <div
        role='tablist'
        aria-label='Content tabs'
        onKeyDown={onKeyDown}
        className='flex gap-1 border-b border-gray-200/70 px-2 pt-2 dark:border-gray-800'
      >
        {tabLabels.map((label, index) => {
          const isActive = index === active;
          return (
            <motion.button
              key={`${label}-${index}`}
              ref={element => {
                tabRefs.current[index] = element;
              }}
              type='button'
              role='tab'
              id={`${baseId}-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(index)}
              whileTap={{ scale: 0.97 }}
              transition={spring.press}
              className={`relative rounded-t-apple-sm px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {label}
              {isActive && (
                <motion.span
                  layoutId={`${baseId}-tab-indicator`}
                  className='absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gray-900 dark:bg-gray-100'
                  transition={
                    shouldReduceMotion ? { duration: 0 } : spring.snappy
                  }
                />
              )}
            </motion.button>
          );
        })}
      </div>
      {items.map((child, index) => (
        <div
          key={`${baseId}-panel-${index}`}
          role='tabpanel'
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== active}
          className='p-4 sm:p-5 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0'
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/** Marker for one tab panel; <Tabs> reads its `label` to title the tab. */
export function TabsContent({ children }: TabsContentProps) {
  return <>{children}</>;
}
