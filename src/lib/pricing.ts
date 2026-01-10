export type PricingInput = {
  basePriceCents: number;
  quantity: number;
  customerType: 'consumer' | 'business' | 'education';
  couponCode?: string;
  expeditedShipping?: boolean;
  destinationCountry?: 'US' | 'CA' | 'GB' | 'DE' | 'AU';
};

export type PricingOutput = {
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
};

// Intentionally gnarly: nested conditionals + duplication.
// Demo 2: Codex refactor should reduce duplication without changing behavior.
export function calculatePrice(input: PricingInput): PricingOutput {
  if (input.quantity <= 0) {
    throw new Error('quantity must be positive');
  }

  const destination = input.destinationCountry ?? 'US';

  const subtotalCents = input.basePriceCents * input.quantity;

  let discountCents = 0;
  if (input.customerType === 'education') {
    discountCents = Math.round(subtotalCents * 0.15);
  } else if (input.customerType === 'business') {
    if (subtotalCents > 5000) {
      discountCents = Math.round(subtotalCents * 0.08);
    } else {
      discountCents = Math.round(subtotalCents * 0.05);
    }
  } else {
    discountCents = 0;
  }

  if (input.couponCode) {
    if (input.couponCode === 'WELCOME10') {
      discountCents = discountCents + Math.round(subtotalCents * 0.10);
    } else if (input.couponCode === 'FREESHIP') {
      // handled later
    } else if (input.couponCode === 'VIP') {
      if (subtotalCents > 10000) {
        discountCents = discountCents + 1500;
      } else {
        discountCents = discountCents + 500;
      }
    }
  }

  if (discountCents > subtotalCents) {
    discountCents = subtotalCents;
  }

  let shippingCents = 0;
  if (destination === 'US') {
    if (input.expeditedShipping) {
      shippingCents = 1299;
    } else {
      shippingCents = 499;
    }
  } else if (destination === 'CA') {
    if (input.expeditedShipping) {
      shippingCents = 1799;
    } else {
      shippingCents = 899;
    }
  } else {
    if (input.expeditedShipping) {
      shippingCents = 2499;
    } else {
      shippingCents = 1299;
    }
  }

  if (input.couponCode === 'FREESHIP') {
    shippingCents = 0;
  }

  let taxRate = 0;
  if (destination === 'US') {
    taxRate = 0.07;
  } else if (destination === 'CA') {
    taxRate = 0.05;
  } else if (destination === 'GB') {
    taxRate = 0.2;
  } else if (destination === 'DE') {
    taxRate = 0.19;
  } else if (destination === 'AU') {
    taxRate = 0.1;
  }

  const taxableCents = subtotalCents - discountCents;
  const taxCents = Math.round(taxableCents * taxRate);

  const totalCents = taxableCents + shippingCents + taxCents;

  return {
    subtotalCents,
    discountCents,
    shippingCents,
    taxCents,
    totalCents,
  };
}
