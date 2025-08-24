import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { product, area_m2, quick, n1, n5, n20, kg } = req.body;

    // Input validation
    if (!product || (product !== 'szklo' && product !== 'marble')) {
      return res.status(400).json({ error: 'Invalid product type' });
    }

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let metadata: Record<string, any> = {};
    let computedData: any = {};

    if (quick) {
      // Quick buy flow
      if (quick === 'glass') {
        const quantities = { n1: n1 || 0, n5: n5 || 0, n20: n20 || 0 };
        const totalKg = quantities.n1 + (quantities.n5 * 5) + (quantities.n20 * 20);
        
        if (totalKg === 0) {
          return res.status(400).json({ error: 'No products selected' });
        }

        // Calculate NET prices (VAT will be added by Stripe)
        const materialNet = (quantities.n1 * 60) + (quantities.n5 * 250) + (quantities.n20 * 720);
        const vat = materialNet * 0.23;
        const brutto = materialNet + vat;

        // Add glass products to line items (using BRUTTO prices)
        if (quantities.n1 > 0) {
          lineItems.push({
            price_data: {
              currency: 'pln',
              product_data: {
                name: 'LamiSec Glass 1kg',
                description: 'LamiSec - ochrona szkła/okien, 1kg',
              },
              unit_amount: Math.round(74 * 100), // 74 PLN (60 + 23% VAT) in grosze
            },
            quantity: quantities.n1,
          });
        }

        if (quantities.n5 > 0) {
          lineItems.push({
            price_data: {
              currency: 'pln',
              product_data: {
                name: 'LamiSec Glass 5kg',
                description: 'LamiSec - ochrona szkła/okien, 5kg',
              },
              unit_amount: Math.round(62 * 100), // 62 PLN (50 + 23% VAT) in grosze
            },
            quantity: quantities.n5,
          });
        }

        if (quantities.n20 > 0) {
          lineItems.push({
            price_data: {
              currency: 'pln',
              product_data: {
                name: 'LamiSec Glass 20kg',
                description: 'LamiSec - ochrona szkła/okien, 20kg',
              },
              unit_amount: Math.round(44 * 100), // 44 PLN (36 + 23% VAT) in grosze
            },
            quantity: quantities.n20,
          });
        }

        metadata = {
          product: 'glass',
          n1: quantities.n1,
          n5: quantities.n5,
          n20: quantities.n20,
          totalKg,
          quick: true,
        };

        computedData = {
          kgRequired: totalKg,
          packaging: { n20: quantities.n20, n5: quantities.n5, n1: quantities.n1 },
          net: materialNet,
          vat: vat,
          brutto: brutto,
          pricePerM2: 0, // Not applicable for quick buy
          product: 'glass'
        };
      } else if (quick === 'marble') {
        if (!kg || kg <= 0) {
          return res.status(400).json({ error: 'Invalid marble quantity' });
        }

        const materialNet = kg * 85;
        const vat = materialNet * 0.23;
        const brutto = materialNet + vat;

        lineItems.push({
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'LamiSec Marble Protektor',
              description: 'LamiSec - protektor (marmur)',
            },
            unit_amount: Math.round(105 * 100), // 105 PLN (85 + 23% VAT) in grosze
          },
          quantity: kg,
        });

        metadata = {
          product: 'marble',
          kg,
          quick: true,
        };

        computedData = {
          kgRequired: kg,
          packaging: { n20: 0, n5: 0, n1: 0 },
          net: materialNet,
          vat: vat,
          brutto: brutto,
          pricePerM2: materialNet / kg,
          product: 'marble'
        };
      }
    } else {
      // Area-based calculation
      if (!area_m2 || area_m2 < 0.1 || area_m2 > 50000) {
        return res.status(400).json({ error: 'Invalid area' });
      }

      if (product === 'szklo') {
        // Glass packaging calculation
        const requiredKg = area_m2 * 0.09; // 90 g/m²
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
        const vat = materialNet * 0.23;
        const brutto = materialNet + vat;
        const pricePerM2 = area_m2 > 0 ? materialNet / area_m2 : 0;

        // Add glass products to line items
        if (finalN20 > 0) {
          lineItems.push({
            price_data: {
              currency: 'pln',
              product_data: {
                name: 'LamiSec Glass 20kg',
                description: 'LamiSec - ochrona szkła/okien, 20kg',
              },
              unit_amount: Math.round(44 * 100), // 44 PLN (36 + 23% VAT) in grosze
            },
            quantity: finalN20 * 20,
          });
        }

        if (n5 > 0) {
          lineItems.push({
            price_data: {
              currency: 'pln',
              product_data: {
                name: 'LamiSec Glass 5kg',
                description: 'LamiSec - ochrona szkła/okien, 5kg',
              },
              unit_amount: Math.round(62 * 100), // 62 PLN (50 + 23% VAT) in grosze
            },
            quantity: n5 * 5,
          });
        }

        if (n1 > 0) {
          lineItems.push({
            price_data: {
              currency: 'pln',
              product_data: {
                name: 'LamiSec Glass 1kg',
                description: 'LamiSec - ochrona szkła/okien, 1kg',
              },
              unit_amount: Math.round(74 * 100), // 74 PLN (60 + 23% VAT) in grosze
            },
            quantity: n1,
          });
        }

        metadata = {
          product: 'glass',
          area_m2,
          n20: finalN20,
          n5,
          n1,
          totalKg,
          materialNet,
          brutto,
          quick: false,
        };

        computedData = {
          kgRequired: totalKg,
          packaging: { n20: finalN20, n5, n1 },
          net: materialNet,
          vat: vat,
          brutto: brutto,
          pricePerM2: pricePerM2,
          product: 'glass'
        };
      } else {
        // Marble calculation
        const requiredKg = Math.ceil(area_m2 * 0.35);
        const materialNet = requiredKg * 85;
        const vat = materialNet * 0.23;
        const brutto = materialNet + vat;
        const pricePerM2 = area_m2 > 0 ? materialNet / area_m2 : 0;

        lineItems.push({
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'LamiSec Marble Protektor',
              description: 'LamiSec - protektor (marmur)',
            },
            unit_amount: Math.round(105 * 100), // 105 PLN (85 + 23% VAT) in grosze
          },
          quantity: requiredKg,
        });

        metadata = {
          product: 'marble',
          area_m2,
          kg: requiredKg,
          materialNet,
          brutto,
          quick: false,
        };

        computedData = {
          kgRequired: requiredKg,
          packaging: { n20: 0, n5: 0, n1: 0 },
          net: materialNet,
          vat: vat,
          brutto: brutto,
          pricePerM2: pricePerM2,
          product: 'marble'
        };
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/sukces?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/anulowano`,
      metadata: metadata,
      currency: 'pln',
      customer_email: req.body.email || undefined,
    });

    // Return session URL and computed data
    res.status(200).json({ 
      url: session.url,
      ...computedData
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper functions for glass packaging optimization
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
