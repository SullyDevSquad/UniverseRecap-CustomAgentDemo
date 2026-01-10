import express from 'express';

import { createItemsRouter } from './routes/items.js';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/healthz', (_req, res) => {
    res.json({ ok: true });
  });

  app.use(createItemsRouter());

  // Simple fallback to keep behavior obvious.
  app.use((_req, res) => {
    res.status(404).json({ error: 'not found' });
  });

  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const app = createApp();
  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
}
