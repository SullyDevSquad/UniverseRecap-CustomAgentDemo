import { describe, expect, it } from 'vitest';

import { calculatePrice } from '../src/lib/pricing.js';

describe('pricing', () => {
  it('calculates a stable total for a basic US consumer purchase', () => {
    const result = calculatePrice({
      basePriceCents: 1000,
      quantity: 2,
      customerType: 'consumer',
      destinationCountry: 'US',
      expeditedShipping: false,
    });

    // subtotal 2000, discount 0, shipping 499, tax 140
    expect(result).toEqual({
      subtotalCents: 2000,
      discountCents: 0,
      shippingCents: 499,
      taxCents: 140,
      totalCents: 2639,
    });
  });
});
