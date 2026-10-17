import Link from '@/components/Link';
import kebabCase from '@/lib/utils/kebabCase';

interface Props {
  text: string;
}

/** Small translucent capsule — hover adds a whisper of fill, press dips. */
const Tag = ({ text }: Props) => {
  return (
    <Link
      className='pressable mt-1 mr-3 inline-flex items-center rounded-full bg-gray-100/80 px-2.5 py-1 text-xs font-medium tracking-wide text-primary-600 uppercase transition-colors duration-150 hover:bg-primary-50 hover:text-primary-700 dark:bg-white/[0.06] dark:text-primary-400 dark:hover:bg-white/[0.1] dark:hover:text-primary-300'
      href={`/tags/${kebabCase(text)}`}
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
