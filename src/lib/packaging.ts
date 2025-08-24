import { PRICING } from './pricing';

export interface PackagingResult {
  n20: number;  // number of 20kg buckets
  n5: number;   // number of 5kg buckets  
  n1: number;   // number of 1kg buckets
  totalKg: number;
  materialNet: number;
  vat: number;
  brutto: number;
  pricePerM2: number;
}

export function computePackaging(requiredKg: number, area: number, includeVAT: boolean = true): PackagingResult {
  // Always round up to whole kilograms
  const req = Math.ceil(requiredKg);
  
  // Start with 20kg buckets
  const n20 = Math.floor(req / 20);
  const rem = req - (20 * n20);
  
  let n5 = 0;
  let n1 = 0;
  
  if (rem === 0) {
    // Perfect fit with 20kg buckets
    n5 = 0;
    n1 = 0;
  } else {
    // Evaluate options for remaining kg
    const optionA = evaluateOptionA(rem);
    const optionB = evaluateOptionB(rem);
    const optionC = evaluateOptionC(rem);
    
    // Pick the cheapest option
    const cheapest = Math.min(optionA.cost, optionB.cost, optionC.cost);
    
    if (cheapest === optionC.cost) {
      // Option C: extra 20kg bucket
      n5 = 0;
      n1 = 0;
      // n20 will be incremented below
    } else if (cheapest === optionA.cost) {
      // Option A: 5kg + 1kg buckets
      n5 = optionA.n5;
      n1 = optionA.n1;
    } else {
      // Option B: only 5kg buckets
      n5 = optionB.n5;
      n1 = 0;
    }
  }
  
  // If we chose option C, increment n20
  const finalN20 = n20 + (n5 === 0 && n1 === 0 && rem > 0 ? 1 : 0);
  const totalKg = (finalN20 * 20) + (n5 * 5) + n1;
  
  // Calculate costs using bucket prices (not per-kg prices)
  const materialNet = (finalN20 * 720) + (n5 * 250) + (n1 * 60);
  
  const vat = includeVAT ? materialNet * 0.23 : 0;
  const brutto = materialNet + vat;
  const pricePerM2 = area > 0 ? materialNet / area : 0;
  
  return {
    n20: finalN20,
    n5,
    n1,
    totalKg,
    materialNet,
    vat,
    brutto,
    pricePerM2
  };
}

function evaluateOptionA(rem: number): { cost: number; n5: number; n1: number } {
  const n5 = Math.floor(rem / 5);
  const remaining = rem - (5 * n5);
  const n1 = Math.ceil(remaining);
  const cost = (n5 * 250) + (n1 * 60);
  return { cost, n5, n1 };
}

function evaluateOptionB(rem: number): { cost: number; n5: number } {
  const n5 = Math.ceil(rem / 5);
  const cost = n5 * 250;
  return { cost, n5 };
}

function evaluateOptionC(rem: number): { cost: number } {
  const cost = 720; // 20kg bucket
  return { cost };
}

// For marble, simple calculation
export function computeMarblePackaging(area: number, includeVAT: boolean = true): PackagingResult {
  const requiredKg = Math.ceil(area * PRICING.marble.consumption);
  const materialNet = requiredKg * PRICING.marble.pricePerKg;
  const vat = includeVAT ? materialNet * 0.23 : 0;
  const brutto = materialNet + vat;
  const pricePerM2 = area > 0 ? materialNet / area : 0;
  
  return {
    n20: 0,
    n5: 0,
    n1: 0,
    totalKg: requiredKg,
    materialNet,
    vat,
    brutto,
    pricePerM2
  };
}
