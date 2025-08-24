import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { product, area_m2, includeVAT, quick, n1, n5, n20, kg } = req.body;

    // Input validation
    if (!product || (product !== 'szklo' && product !== 'marble')) {
      return res.status(400).json({ error: 'Invalid product type' });
    }

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let metadata: Record<string, any> = {};

    if (quick) {
      // Quick buy flow
      if (quick === 'glass') {
        const quantities = { n1: n1 || 0, n5: n5 || 0, n20: n20 || 0 };
        const totalKg = quantities.n1 + (quantities.n5 * 5) + (quantities.n20 * 20);
        
        if (totalKg === 0) {
          return res.status(400).json({ error: 'No products selected' });
        }

        // Add glass products to line items
        if (quantities.n1 > 0) {
          lineItems.push({
            price_data: {
              currency: 'pln',
              product_data: {
                name: 'LamiSec Glass 1kg',
                description: 'LamiSec - ochrona szkła/okien, 1kg',
              },
              unit_amount: includeVAT ? 74 : 60, // 60 PLN + 23% VAT = 74 PLN
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
              unit_amount: includeVAT ? 62 : 50, // 50 PLN + 23% VAT = 62 PLN
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
              unit_amount: includeVAT ? 44 : 36, // 36 PLN + 23% VAT = 44 PLN
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
      } else if (quick === 'marble') {
        if (!kg || kg <= 0) {
          return res.status(400).json({ error: 'Invalid marble quantity' });
        }

        lineItems.push({
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'LamiSec Marble Protektor',
              description: 'LamiSec - protektor (marmur)',
            },
            unit_amount: includeVAT ? 105 : 85, // 85 PLN + 23% VAT = 105 PLN
          },
          quantity: Math.ceil(kg),
        });

        metadata = {
          product: 'marble',
          kg: Math.ceil(kg),
          quick: true,
        };
      }
    } else {
      // Area-based calculation flow
      if (!area_m2 || area_m2 < 0.1 || area_m2 > 50000) {
        return res.status(400).json({ error: 'Invalid area' });
      }

      if (typeof includeVAT !== 'boolean') {
        return res.status(400).json({ error: 'Invalid VAT flag' });
      }

      // Calculate packaging and pricing (this should match client-side logic)
      let materialNet = 0;
      let totalKg = 0;
      let n20 = 0, n5 = 0, n1 = 0;

      if (product === 'szklo') {
        const consumption = 0.09; // 90 g/m²
        const requiredKg = Math.ceil(area_m2 * consumption);
        totalKg = requiredKg;

        // Simplified packaging algorithm (should match client-side)
        n20 = Math.floor(requiredKg / 20);
        const rem = requiredKg - (20 * n20);
        
        if (rem > 0) {
          if (rem <= 5) {
            n5 = 1;
          } else if (rem <= 10) {
            n5 = 2;
          } else if (rem <= 15) {
            n5 = 3;
          } else {
            n20 += 1;
          }
        }

        materialNet = (n20 * 36 * 20) + (n5 * 50 * 5);
      } else {
        const consumption = 0.35; // 350 g/m²
        totalKg = Math.ceil(area_m2 * consumption);
        materialNet = totalKg * 85;
      }

      const vat = includeVAT ? materialNet * 0.23 : 0;
      const brutto = materialNet + vat;

      // Create line items based on calculated packaging
      if (product === 'szklo') {
        if (n20 > 0) {
          lineItems.push({
            price_data: {
              currency: 'pln',
              product_data: {
                name: 'LamiSec Glass 20kg',
                description: 'LamiSec - ochrona szkła/okien, 20kg',
              },
              unit_amount: includeVAT ? 44 : 36,
            },
            quantity: n20,
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
              unit_amount: includeVAT ? 62 : 50,
            },
            quantity: n5,
          });
        }
      } else {
        lineItems.push({
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'LamiSec Marble Protektor',
              description: 'LamiSec - protektor (marmur)',
            },
            unit_amount: includeVAT ? 105 : 85,
          },
          quantity: totalKg,
        });
      }

      metadata = {
        product,
        area_m2,
        includeVAT,
        n20,
        n5,
        n1,
        totalKg,
        materialNet,
        brutto,
      };
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/sukces?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/anulowano`,
      metadata,
      customer_email: req.body.email || undefined,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['PL', 'DE', 'CZ', 'SK', 'LT', 'LV', 'EE'],
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
