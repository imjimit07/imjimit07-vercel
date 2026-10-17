import Pre from '@/components/Pre';
import { previews } from './previews';
import { Tabs, TabsContent } from './Tabs';

interface Props {
  name: string;
}

/** Live preview + source for a component registered in ./previews.tsx. */
export default function ComponentPreview({ name }: Props) {
  const entry = previews[name];

  if (!entry) {
    return (
      <div className='my-6 rounded-apple-md border border-dashed border-red-400/50 bg-red-500/[0.04] px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:text-red-400'>
        <p className='m-0'>
          No preview registered for{' '}
          <code className='rounded bg-red-500/10 px-1 py-0.5 font-mono text-[0.85em] text-current'>
            {name}
          </code>
          . Add it to{' '}
          <code className='rounded bg-red-500/10 px-1 py-0.5 font-mono text-[0.85em] text-current'>
            components/mdx/previews.tsx
          </code>
          .
        </p>
      </div>
    );
  }

  return (
    <div className='my-6'>
      <div className='mb-2 flex items-center justify-between px-0.5'>
        <span className='font-mono text-xs text-gray-500 dark:text-gray-400'>
          {name}
        </span>
        <span className='text-[10px] font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500'>
          Component preview
        </span>
      </div>
      <Tabs labels={['Preview', 'Code']}>
        <TabsContent label='Preview'>
          <div className='flex flex-wrap items-center justify-center gap-4 [&>*]:!my-0'>
            {entry.render}
          </div>
        </TabsContent>
        <TabsContent label='Code'>
          <div className='[&_pre]:my-0'>
            <Pre>
              <code className='language-tsx'>{entry.code}</code>
            </Pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
