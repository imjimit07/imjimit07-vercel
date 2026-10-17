import { ReactNode } from 'react';
import Badge from './Badge';
import Callout from './Callout';
import { Step, Steps } from './Steps';

export interface PreviewEntry {
  render: ReactNode;
  code: string;
}

/**
 * Registry for <ComponentPreview name='…' />. Add an entry here to make a
 * component previewable from MDX content.
 */
export const previews: Record<string, PreviewEntry> = {
  badge: {
    render: (
      <div className='flex flex-wrap items-center gap-2'>
        <Badge>Default</Badge>
        <Badge variant='secondary'>Secondary</Badge>
        <Badge variant='destructive'>Destructive</Badge>
        <Badge variant='outline'>Outline</Badge>
      </div>
    ),
    code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,
  },
  callout: {
    render: (
      <Callout type='warning' title='Keep dependencies honest'>
        Every dependency you add is code you now maintain. Prefer the platform
        first.
      </Callout>
    ),
    code: `<Callout type="warning" title="Keep dependencies honest">
  Every dependency you add is code you now maintain.
</Callout>`,
  },
  steps: {
    render: (
      <Steps>
        <Step>Write the MDX file.</Step>
        <Step>Register the components in the mapping.</Step>
        <Step>Ship it.</Step>
      </Steps>
    ),
    code: `<Steps>
  <Step>Write the MDX file.</Step>
  <Step>Register the components in the mapping.</Step>
  <Step>Ship it.</Step>
</Steps>`,
  },
};
