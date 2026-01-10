import type { Request, Response } from 'express';
import { Router } from 'express';

import { listItems } from '../lib/store.js';

export function createItemsRouter() {
  const router = Router();

  router.get('/items', (_req: Request, res: Response) => {
    // Intentionally inconsistent logging to give Demo 1 something to improve.
    console.log('list items');

    res.json({
      items: listItems(),
    });
  });

  return router;
}
