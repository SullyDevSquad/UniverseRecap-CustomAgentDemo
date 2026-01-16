import type { Request, Response } from 'express';
import { Router } from 'express';

import { info, log } from '../lib/logger.js';
import { getCategoryById, getItemsByCategoryId, listCategories } from '../lib/store.js';

export function createCategoriesRouter() {
  const router = Router();

  router.get('/categories', (_req: Request, res: Response) => {
    info('Listing all categories');

    res.json({
      categories: listCategories(),
    });
  });

  router.get('/categories/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    log('info', 'Fetching category by ID', { id });

    try {
      const category = getCategoryById(id);

      if (!category) {
        return res.status(404).json({
          error: {
            code: 'NOT_FOUND',
            message: `Category with id ${id} not found`,
          },
        });
      }

      res.json({ category });
    } catch (error) {
      log('error', 'Error fetching category', { id, error });
      res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch category',
        },
      });
    }
  });

  router.get('/categories/:id/items', async (req: Request, res: Response) => {
    const { id } = req.params;

    log('info', 'Fetching items by category ID', { categoryId: id });

    try {
      const category = getCategoryById(id);

      if (!category) {
        return res.status(404).json({
          error: {
            code: 'NOT_FOUND',
            message: `Category with id ${id} not found`,
          },
        });
      }

      const items = getItemsByCategoryId(id);
      res.json({ items });
    } catch (error) {
      log('error', 'Error fetching items by category', { categoryId: id, error });
      res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch items by category',
        },
      });
    }
  });

  return router;
}
