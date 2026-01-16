import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../src/server.js';

describe('categories routes', () => {
  it('GET /categories returns categories', async () => {
    const app = createApp();

    const res = await request(app).get('/categories');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.categories)).toBe(true);
    expect(res.body.categories.length).toBeGreaterThan(0);
    expect(res.body.categories[0].id).toBe('cat1');
  });

  describe('GET /categories/:id', () => {
    const testCases = [
      {
        description: 'returns category when found',
        id: 'cat1',
        expectedStatus: 200,
        expectedBody: {
          category: {
            id: 'cat1',
            name: 'Office Supplies',
            description: 'Essential office supplies for everyday use',
          },
        },
      },
      {
        description: 'returns category when found (second category)',
        id: 'cat2',
        expectedStatus: 200,
        expectedBody: {
          category: {
            id: 'cat2',
            name: 'Writing Tools',
            description: 'Pens, pencils, and markers',
          },
        },
      },
      {
        description: 'returns 404 when category not found',
        id: 'nonexistent',
        expectedStatus: 404,
        expectedBody: {
          error: {
            code: 'NOT_FOUND',
            message: 'Category with id nonexistent not found',
          },
        },
      },
    ];

    testCases.forEach(({ description, id, expectedStatus, expectedBody }) => {
      it(description, async () => {
        const app = createApp();
        const res = await request(app).get(`/categories/${id}`);
        expect(res.status).toBe(expectedStatus);
        expect(res.body).toEqual(expectedBody);
      });
    });
  });

  describe('GET /categories/:id/items', () => {
    const testCases = [
      {
        description: 'returns items for category',
        id: 'cat2',
        expectedStatus: 200,
        expectedBody: {
          items: [
            { id: 'a1', name: 'Pencil', priceCents: 199, categoryId: 'cat2' },
          ],
        },
      },
      {
        description: 'returns multiple items for category',
        id: 'cat1',
        expectedStatus: 200,
        expectedBody: {
          items: [
            { id: 'b2', name: 'Notebook', priceCents: 599, categoryId: 'cat1' },
          ],
        },
      },
      {
        description: 'returns empty array for category with no items',
        id: 'cat3',
        expectedStatus: 200,
        expectedBody: {
          items: [
            { id: 'c3', name: 'Eraser', priceCents: 149, categoryId: 'cat3' },
          ],
        },
      },
      {
        description: 'returns 404 when category not found',
        id: 'nonexistent',
        expectedStatus: 404,
        expectedBody: {
          error: {
            code: 'NOT_FOUND',
            message: 'Category with id nonexistent not found',
          },
        },
      },
    ];

    testCases.forEach(({ description, id, expectedStatus, expectedBody }) => {
      it(description, async () => {
        const app = createApp();
        const res = await request(app).get(`/categories/${id}/items`);
        expect(res.status).toBe(expectedStatus);
        expect(res.body).toEqual(expectedBody);
      });
    });
  });
});
