import { motion } from 'motion/react';
import { ReactNode } from 'react';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { spring } from '@/lib/motion';

type CalloutType = 'info' | 'warning' | 'success' | 'danger';

interface Props {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const styles: Record<
  CalloutType,
  { container: string; icon: string; Icon: typeof FiInfo }
> = {
  info: {
    container: 'border-primary-500/20 bg-primary-500/[0.06]',
    icon: 'text-primary-600 dark:text-primary-400',
    Icon: FiInfo,
  },
  warning: {
    container: 'border-amber-500/25 bg-amber-500/[0.07]',
    icon: 'text-amber-600 dark:text-amber-400',
    Icon: FiAlertTriangle,
  },
  success: {
    container: 'border-green-500/25 bg-green-500/[0.06]',
    icon: 'text-green-600 dark:text-green-400',
    Icon: FiCheckCircle,
  },
  danger: {
    container: 'border-red-500/25 bg-red-500/[0.05]',
    icon: 'text-red-600 dark:text-red-400',
    Icon: FiXCircle,
  },
};

/** Inline note, tip, warning or danger block for MDX prose. */
export default function Callout({ type = 'info', title, children }: Props) {
  const { container, icon, Icon } = styles[type];

  return (
    <motion.div
      role='note'
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={spring.ui}
      className={`my-6 flex gap-3 rounded-apple-md border px-4 py-3.5 ${container}`}
    >
      <Icon
        aria-hidden='true'
        className={`mt-0.5 h-[18px] w-[18px] shrink-0 ${icon}`}
      />
      <div className='min-w-0 flex-1 [&>*]:my-0 [&>*+*]:mt-3'>
        {title && (
          <div className='font-semibold text-gray-900 dark:text-gray-100'>
            {title}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
}

export type { CalloutType };
