export interface PricingData {
  glass: {
    consumption: number;
    buckets: {
      '1kg': number;
      '5kg': number;
      '20kg': number;
    };
  };
  marble: {
    consumption: number;
    pricePerKg: number;
  };
}

export const PRICING: PricingData = {
  glass: {
    consumption: 0.09, // kg/m²
    buckets: {
      '1kg': 60,   // PLN/kg
      '5kg': 50,   // PLN/kg
      '20kg': 36,  // PLN/kg
    },
  },
  marble: {
    consumption: 0.35, // kg/m²
    pricePerKg: 85,    // PLN/kg
  },
};

export const VAT_RATE = 0.23;

export function calculateNetPrice(kg: number, product: 'glass' | 'marble'): number {
  if (product === 'glass') {
    // This would need the packaging algorithm
    return 0;
  } else {
    return kg * PRICING.marble.pricePerKg;
  }
}

export function calculateVAT(netPrice: number): number {
  return netPrice * VAT_RATE;
}

export function calculateBrutto(netPrice: number): number {
  return netPrice + calculateVAT(netPrice);
}
