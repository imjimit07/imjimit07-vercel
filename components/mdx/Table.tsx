import { ReactNode, TableHTMLAttributes } from 'react';

interface Props extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

/** Markdown tables scroll horizontally instead of widening the page. */
export default function MdxTable({ children, ...rest }: Props) {
  return (
    <div className='overflow-x-auto'>
      <table {...rest}>{children}</table>
    </div>
  );
}
