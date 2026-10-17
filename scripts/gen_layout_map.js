import { Request, Res, NextFunction } from 'express';
import { getFileBySlug } from '@/lib/mdx';
import { renderMdx } from '@/utils/mdx-helpers';

const __dirname = typeof __dirname !== 'undefined' ? __dirname : process.cwd();
const pages = require('fs')
  .readdirSync(__dirname + '/pages/')
  .filter(item => item[0] !== '_' && item !== '404.tsx');

// Export a middleware that returns static JSON data for all pages
export default (req: Request, res: Res, next: NextFunction) => {
  res.json(pages);
  next();
};
