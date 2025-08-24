import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validate required environment variables
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Missing STRIPE_SECRET_KEY");
    return res.status(500).json({ error: "Server configuration error" });
  }

  if (!process.env.BASE_URL) {
    console.error("Missing BASE_URL");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const { product, areaM2 } = req.body;

    // Input validation
    if (!product || (product !== "szklo" && product !== "marmur")) {
      return res.status(400).json({ error: "Invalid product type. Must be 'szklo' or 'marmur'" });
    }

    if (!areaM2 || typeof areaM2 !== "number" || areaM2 < 0.1 || areaM2 > 50000) {
      return res.status(400).json({ error: "Invalid area. Must be between 0.1 and 50,000 m²" });
    }

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let metadata: Record<string, any> = {};
    let computedData: any = {};

    if (product === "szklo") {
      // Glass packaging calculation
      const requiredKgRaw = areaM2 * 0.09; // 90 g/m² consumption
      const requiredKg = Math.ceil(requiredKgRaw * 100) / 100; // Round up to 0.01
      const req = Math.ceil(requiredKg); // Round up to whole kg
      
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
      const pricePerM2 = areaM2 > 0 ? materialNet / areaM2 : 0;

      // Add glass products to line items (using BRUTTO prices)
      if (finalN20 > 0) {
        lineItems.push({
          price_data: {
            currency: "pln",
            product_data: {
              name: "LamiSec Glass 20kg",
              description: "LamiSec - ochrona szkła/okien, 20kg",
            },
            unit_amount: Math.round(44 * 100), // 44 PLN (36 + 23% VAT) in grosze
          },
          quantity: finalN20 * 20,
        });
      }

      if (n5 > 0) {
        lineItems.push({
          price_data: {
            currency: "pln",
            product_data: {
              name: "LamiSec Glass 5kg",
              description: "LamiSec - ochrona szkła/okien, 5kg",
            },
            unit_amount: Math.round(62 * 100), // 62 PLN (50 + 23% VAT) in grosze
          },
          quantity: n5 * 5,
        });
      }

      if (n1 > 0) {
        lineItems.push({
          price_data: {
            currency: "pln",
            product_data: {
              name: "LamiSec Glass 1kg",
              description: "LamiSec - ochrona szkła/okien, 1kg",
            },
            unit_amount: Math.round(74 * 100), // 74 PLN (60 + 23% VAT) in grosze
          },
          quantity: n1,
        });
      }

      metadata = {
        product: "szklo",
        areaM2: areaM2.toString(),
        kgRequired: totalKg.toString(),
        n20: finalN20.toString(),
        n5: n5.toString(),
        n1: n1.toString(),
        net: materialNet.toString(),
        vat: vat.toString(),
        brutto: brutto.toString(),
        pricePerM2: pricePerM2.toString(),
      };

      computedData = {
        kgRequired: totalKg,
        packaging: { n20: finalN20, n5, n1 },
        net: materialNet,
        vat: vat,
        brutto: brutto,
        pricePerM2: pricePerM2,
        product: "szklo"
      };
    } else {
      // Marble calculation
      const requiredKg = Math.ceil(areaM2 * 0.35); // 350 g/m² consumption
      const materialNet = requiredKg * 85; // 85 PLN/kg NET
      const vat = materialNet * 0.23;
      const brutto = materialNet + vat;
      const pricePerM2 = areaM2 > 0 ? materialNet / areaM2 : 0;

      lineItems.push({
        price_data: {
          currency: "pln",
          product_data: {
            name: "LamiSec Marble Protektor",
            description: "LamiSec - protektor (marmur)",
          },
          unit_amount: Math.round(105 * 100), // 105 PLN (85 + 23% VAT) in grosze
        },
        quantity: requiredKg,
      });

      metadata = {
        product: "marmur",
        areaM2: areaM2.toString(),
        kgRequired: requiredKg.toString(),
        n20: "0",
        n5: "0",
        n1: "0",
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
        product: "marmur"
      };
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.BASE_URL}/sukces?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/anulowano`,
      metadata: metadata,
      currency: "pln",
      customer_email: req.body.email || undefined,
    });

    // Return session URL and computed data
    res.status(200).json({ 
      url: session.url,
      ...computedData
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Internal server error" });
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
