import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../src/server.js';

describe('items routes', () => {
  it('GET /items returns items', async () => {
    const app = createApp();

    const res = await request(app).get('/items');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items.length).toBeGreaterThan(0);
    // Intentionally brittle: asserts an exact ID to give Demo 3 a reason to tighten expectations later.
    expect(res.body.items[0].id).toBe('a1');
  });
});
