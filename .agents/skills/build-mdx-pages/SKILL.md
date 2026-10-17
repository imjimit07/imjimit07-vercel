---
name: build-mdx-pages
description: Build accessible, responsive, type-safe MDX pages for Next.js using shadcn/ui, Tailwind CSS, and a central mdx-components mapping. Use when creating or updating MDX content pages, registering components in the MDX component map, or adding MDX UI primitives such as Callout, Steps, Tabs, Badge, CodeBlock, and ComponentPreview.
---

# Build MDX pages with shadcn/ui

## Goal

Create accessible, responsive, type-safe MDX pages for Next.js using shadcn/ui components, Tailwind CSS, and clean content architecture.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- MDX via `@next/mdx`, `next-mdx-remote`, or Fumadocs MDX
- Optional: `shadcn-labs/mdxcn` for MDX-specific callouts, steps, terminals, charts, and timelines

## Rules

1. Use MDX for narrative content; keep complex logic in React components.
2. Use shadcn/ui components for interactive UI: `Button`, `Card`, `Tabs`, `Accordion`, `Alert`, `Table`, `Badge`, `CodeBlock`, etc.
3. Never put large import blocks or business logic directly inside MDX files when a reusable component is better.
4. Create a central `mdx-components.tsx` mapping so standard Markdown elements and custom components render consistently.
5. Use frontmatter for metadata: `title`, `description`, `date`, `tags`, `slug`, and optional `draft`.
6. Ensure every interactive component is keyboard accessible and works on mobile.
7. Prefer semantic HTML: headings in order, lists for lists, tables for tabular data, and links with descriptive text.
8. Use Tailwind for layout and spacing; do not override shadcn/ui tokens with arbitrary colors unless necessary.
9. Keep code examples copy-pasteable and include the required imports.
10. Validate that MDX compiles before finishing; fix JSX syntax, unclosed tags, and invalid component props.

## Project structure

```
content/
  docs/
    getting-started.mdx
    components/
      button.mdx
components/
  mdx/
    Callout.tsx
    CodeBlock.tsx
    ComponentPreview.tsx
    Steps.tsx
lib/
  mdx.ts
mdx-components.tsx
```

## MDX component mapping

Map these elements in `mdx-components.tsx`:

- `h1`, `h2`, `h3` → styled headings with anchor links
- `p` → readable paragraph with consistent line height
- `a` → accessible link with external-link behavior
- `ul`, `ol`, `li` → Tailwind-styled lists
- `table`, `thead`, `tbody`, `tr`, `th`, `td` → shadcn/ui `Table`
- `code` → inline code styling
- `pre` → syntax-highlighted `CodeBlock`
- `blockquote` → shadcn/ui `Alert` or custom `Callout`

## Custom MDX components

Expose these components to MDX:

- `<Callout type="info|warning|success|danger" title="">`
- `<Steps>` and `<Step>`
- `<Tabs>` and `<TabsContent>`
- `<ComponentPreview name="button">`
- `<CodeBlock language="tsx" filename="example.tsx">`
- `<Badge variant="default|secondary|destructive|outline">`

## MDX page template

````mdx
---
title: 'Getting started'
description: 'Install and use shadcn/ui in an MDX-powered Next.js site.'
date: '2026-10-18'
tags: ['nextjs', 'shadcn', 'mdx']
---

# Getting started

Install the required packages and add your first shadcn/ui component.

<Callout type='info' title='Before you begin'>
  Ensure Tailwind CSS and shadcn/ui are configured in your Next.js project.
</Callout>

## Add a component

Run the shadcn CLI:

<CodeBlock language='bash' filename='terminal'>
  npx shadcn@latest add button
</CodeBlock>

## Use it in MDX

Import the component and render it directly:

```tsx
import { Button } from '@/components/ui/button';

<Button>Get started</Button>;
```

<Steps>
  <Step>Create an MDX file under `content/docs`.</Step>
  <Step>Add the component to `mdx-components.tsx`.</Step>
  <Step>Render the page through the App Router.</Step>
</Steps>
````

## Component preview pattern

Create `ComponentPreview.tsx` that:

1. Accepts a component name.
2. Renders a live preview inside a `Card`.
3. Shows the source in a tabbed view: **Preview** and **Code**.
4. Uses `Tabs` from shadcn/ui.
5. Handles missing components gracefully with an error message.

## Quality checklist

- [ ] MDX compiles without errors
- [ ] Frontmatter is valid YAML
- [ ] All custom components are registered in `mdx-components.tsx`
- [ ] Code samples include imports
- [ ] Layout is responsive
- [ ] Dark mode works
- [ ] Accessibility: labels, focus states, semantic HTML
- [ ] No unused imports or dead components
- [ ] Lighthouse-style performance: avoid heavy client components in content pages

## Output expectations

When asked to create a page:

1. Create the MDX file.
2. Create any missing reusable MDX components.
3. Update `mdx-components.tsx`.
4. Add routing if required.
5. Provide the exact terminal commands.
6. Summarize files changed and how to preview the result.
