import type { Request, Response } from 'express';
import { Router } from 'express';

import { info, log } from '../lib/logger.js';
import { getItemById, listItems } from '../lib/store.js';

export function createItemsRouter() {
  const router = Router();

  router.get('/items', (_req: Request, res: Response) => {
    info('Listing all items');

    res.json({
      items: listItems(),
    });
  });

  router.get('/items/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    log('info', 'Fetching item by ID', { id });

    try {
      const item = getItemById(id);

      if (!item) {
        return res.status(404).json({
          error: {
            code: 'NOT_FOUND',
            message: `Item with id ${id} not found`,
          },
        });
      }

      res.json({ item });
    } catch (error) {
      log('error', 'Error fetching item', { id, error });
      res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch item',
        },
      });
    }
  });

  return router;
}
