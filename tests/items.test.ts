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

  describe('GET /items/:id', () => {
    const testCases = [
      {
        description: 'returns item when found',
        id: 'a1',
        expectedStatus: 200,
        expectedBody: { item: { id: 'a1', name: 'Pencil', priceCents: 199, categoryId: 'cat2' } },
      },
      {
        description: 'returns item when found (second item)',
        id: 'b2',
        expectedStatus: 200,
        expectedBody: { item: { id: 'b2', name: 'Notebook', priceCents: 599, categoryId: 'cat1' } },
      },
      {
        description: 'returns 404 when item not found',
        id: 'nonexistent',
        expectedStatus: 404,
        expectedBody: {
          error: {
            code: 'NOT_FOUND',
            message: 'Item with id nonexistent not found',
          },
        },
      },
    ];

    testCases.forEach(({ description, id, expectedStatus, expectedBody }) => {
      it(description, async () => {
        const app = createApp();
        const res = await request(app).get(`/items/${id}`);
        expect(res.status).toBe(expectedStatus);
        expect(res.body).toEqual(expectedBody);
      });
    });
  });
});
