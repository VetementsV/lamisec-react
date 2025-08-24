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
      '5kg': 50,   // PLN/kg (bucket 5kg = 250 PLN)
      '20kg': 36,  // PLN/kg (bucket 20kg = 720 PLN)
    },
  },
  marble: {
    consumption: 0.35, // kg/m²
    pricePerKg: 85,    // PLN/kg
  },
};

export const VAT_RATE = 0.23;

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(2)} PLN`;
};

// Helper function to calculate VAT
export const calculateVAT = (netAmount: number): number => {
  return netAmount * VAT_RATE;
};

// Helper function to calculate brutto
export const calculateBrutto = (netAmount: number): number => {
  return netAmount + calculateVAT(netAmount);
};
