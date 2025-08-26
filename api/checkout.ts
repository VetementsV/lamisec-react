import Stripe from "stripe";

// Validate environment variables
const requiredEnvVars = {
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  EXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.EXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  BASE_URL: process.env.BASE_URL,
};

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Pricing constants (server-side only)
const PRICING = {
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

const VAT_RATE = 0.23;

// Glass packaging optimization functions
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

function computeGlassPackaging(requiredKg: number) {
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
  
  // Calculate costs (NET)
  const materialNet = (finalN20 * 720) + (n5 * 250) + (n1 * 60);
  const vat = materialNet * VAT_RATE;
  const brutto = materialNet + vat;
  
  return {
    n20: finalN20,
    n5,
    n1,
    totalKg,
    materialNet,
    vat,
    brutto
  };
}

export default async function handler(req: any, res: any) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for missing environment variables
  if (missingEnvVars.length > 0) {
    console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
    return res.status(500).json({ error: `Missing environment variables: ${missingEnvVars.join(', ')}` });
  }

  try {
    // Log the incoming request for debugging
    console.log('[lamisec] 📥 Checkout request:', {
      method: req.method,
      headers: req.headers,
      body: req.body,
      timestamp: new Date().toISOString()
    });

    // Parse and validate request body
    const { product, areaM2, kg, unit } = req.body;

    // Log parsed values
    console.log('[lamisec] 🔍 Parsed values:', { product, areaM2, kg, unit });

    // Validate product
    if (!product || !['szklo', 'marmur'].includes(product)) {
      console.log('[lamisec] ❌ Invalid product:', product);
      return res.status(400).json({ error: 'Invalid product type. Must be "szklo" or "marmur"' });
    }

    // Validate unit
    if (!unit || !['m2', 'kg'].includes(unit)) {
      console.log('[lamisec] ❌ Invalid unit:', unit);
      return res.status(400).json({ error: 'Invalid unit. Must be "m2" or "kg"' });
    }

    // XOR validation: exactly one of areaM2 or kg must be provided
    if (unit === 'm2' && (!areaM2 || areaM2 <= 0 || areaM2 > 10000)) {
      console.log('[lamisec] ❌ Invalid areaM2:', areaM2);
      return res.status(400).json({ error: 'Invalid area. Must be between 0.1 and 10000 m²' });
    }
    
    if (unit === 'kg' && (!kg || kg <= 0 || kg > 10000 || !Number.isInteger(kg))) {
      console.log('[lamisec] ❌ Invalid kg:', kg);
      return res.status(400).json({ error: 'Invalid kg amount. Must be an integer between 1 and 10000 kg' });
    }

    // Ensure only one value is provided
    if (unit === 'm2' && kg !== undefined) {
      console.log('[lamisec] ❌ Both areaM2 and kg provided:', { areaM2, kg });
      return res.status(400).json({ error: 'Cannot provide both areaM2 and kg' });
    }
    
    if (unit === 'kg' && areaM2 !== undefined) {
      console.log('[lamisec] ❌ Both areaM2 and kg provided:', { areaM2, kg });
      return res.status(400).json({ error: 'Cannot provide both areaM2 and kg' });
    }

    console.log('[lamisec] ✅ Validation passed, proceeding with calculation...');

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let metadata: Record<string, any> = {};
    let computedData: any = {};

    if (product === 'szklo') {
      if (unit === 'm2') {
        // Glass calculation by area
        const requiredKg = areaM2 * PRICING.glass.consumption;
        const packaging = computeGlassPackaging(requiredKg);
        const pricePerM2 = areaM2 > 0 ? packaging.materialNet / areaM2 : 0;

        console.log('[lamisec] 🧮 Glass m2 calculation:', {
          areaM2, requiredKg, packaging, pricePerM2
        });

        lineItems.push({
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'LamiSec Glass Protection',
              description: `LamiSec - ochrona szkła/okien, ${areaM2} m²`,
            },
            unit_amount: Math.round(packaging.brutto * 100), // Convert to grosze
          },
          quantity: 1,
        });

        metadata = {
          product: 'szklo',
          unit: 'm2',
          areaM2: areaM2.toString(),
          totalKg: packaging.totalKg.toString(),
          n20: packaging.n20.toString(),
          n5: packaging.n5.toString(),
          n1: packaging.n1.toString(),
          net: packaging.materialNet.toString(),
          vat: packaging.vat.toString(),
          brutto: packaging.brutto.toString(),
          pricePerM2: pricePerM2.toString(),
        };

        computedData = {
          kgRequired: packaging.totalKg,
          packaging: { n20: packaging.n20, n5: packaging.n5, n1: packaging.n1 },
          net: packaging.materialNet,
          vat: packaging.vat,
          brutto: packaging.brutto,
          pricePerM2: pricePerM2,
          product: 'szklo'
        };
      } else {
        // Glass calculation by kg
        const normalizedKg = Math.ceil(kg);
        const packaging = computeGlassPackaging(normalizedKg);

        console.log('[lamisec] 🧮 Glass kg calculation:', {
          kg, normalizedKg, packaging
        });

        lineItems.push({
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'LamiSec Glass Protection',
              description: `LamiSec - ochrona szkła/okien, ${normalizedKg} kg`,
            },
            unit_amount: Math.round(packaging.brutto * 100), // Convert to grosze
          },
          quantity: 1,
        });

        metadata = {
          product: 'szklo',
          unit: 'kg',
          kg: normalizedKg.toString(),
          totalKg: packaging.totalKg.toString(),
          n20: packaging.n20.toString(),
          n5: packaging.n5.toString(),
          n1: packaging.n1.toString(),
          net: packaging.materialNet.toString(),
          vat: packaging.vat.toString(),
          brutto: packaging.brutto.toString(),
        };

        computedData = {
          kgRequired: packaging.totalKg,
          packaging: { n20: packaging.n20, n5: packaging.n5, n1: packaging.n1 },
          net: packaging.materialNet,
          vat: packaging.vat,
          brutto: packaging.brutto,
          product: 'szklo'
        };
      }
    } else {
      if (unit === 'm2') {
        // Marble calculation by area
        const requiredKg = Math.ceil(areaM2 * PRICING.marble.consumption);
        const materialNet = requiredKg * PRICING.marble.pricePerKg;
        const vat = materialNet * VAT_RATE;
        const brutto = materialNet + vat;
        const pricePerM2 = areaM2 > 0 ? materialNet / areaM2 : 0;

        console.log('[lamisec] 🧮 Marble m2 calculation:', {
          areaM2, requiredKg, materialNet, vat, brutto, pricePerM2
        });

        lineItems.push({
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'LamiSec Marble Protektor',
              description: `LamiSec - protektor (marmur), ${areaM2} m²`,
            },
            unit_amount: Math.round(brutto * 100), // Convert to grosze
          },
          quantity: 1,
        });

        metadata = {
          product: 'marmur',
          unit: 'm2',
          areaM2: areaM2.toString(),
          totalKg: requiredKg.toString(),
          n20: '0',
          n5: '0',
          n1: '0',
          net: materialNet.toString(),
          vat: vat.toString(),
          brutto: brutto.toString(),
          pricePerM2: pricePerM2.toString(),
        };

        computedData = {
          kgRequired: requiredKg,
          packaging: { n20: 0, n5: 0, n1: 0 },
          net: materialNet,
          vat: vat,
          brutto: brutto,
          pricePerM2: pricePerM2,
          product: 'marmur'
        };
      } else {
        // Marble calculation by kg
        const normalizedKg = Math.ceil(kg);
        const materialNet = normalizedKg * PRICING.marble.pricePerKg;
        const vat = materialNet * VAT_RATE;
        const brutto = materialNet + vat;

        console.log('[lamisec] 🧮 Marble kg calculation:', {
          kg, normalizedKg, materialNet, vat, brutto
        });

        lineItems.push({
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'LamiSec Marble Protektor',
              description: `LamiSec - protektor (marmur), ${normalizedKg} kg`,
            },
            unit_amount: Math.round(brutto * 100), // Convert to grosze
          },
          quantity: 1,
        });

        metadata = {
          product: 'marmur',
          unit: 'kg',
          kg: normalizedKg.toString(),
          totalKg: normalizedKg.toString(),
          n20: '0',
          n5: '0',
          n1: '0',
          net: materialNet.toString(),
          vat: vat.toString(),
          brutto: brutto.toString(),
        };

        computedData = {
          kgRequired: normalizedKg,
          packaging: { n20: 0, n5: 0, n1: 0 },
          net: materialNet,
          vat: vat,
          brutto: brutto,
          product: 'marmur'
        };
      }
    }

    console.log('[lamisec] 🎯 Final data:', {
      lineItems,
      metadata,
      computedData
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/sukces?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/anulowano`,
      metadata: metadata,
      currency: 'pln',
    });

    console.log('[lamisec] ✅ Stripe session created:', {
      sessionId: session.id,
      url: session.url
    });

    // Return session URL
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('[lamisec] ❌ Checkout error:', error);
    console.error('[lamisec] ❌ Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ error: 'Internal server error' });
  }
}
