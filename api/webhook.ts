import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validate required environment variables
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Missing STRIPE_SECRET_KEY");
    return res.status(500).json({ error: "Server configuration error" });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const sig = req.headers["stripe-signature"] as string;
  if (!sig) {
    console.error("Missing stripe-signature header");
    return res.status(400).json({ error: "Missing stripe-signature header" });
  }

  let raw: string;
  try {
    // Try to get raw body using micro buffer, with fallback
    raw = (typeof (req as any).text === "function") 
      ? await (req as any).text() 
      : (await buffer(req)).toString();
  } catch (error) {
    console.error("Failed to read request body:", error);
    return res.status(400).json({ error: "Failed to read request body" });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res.status(400).json({ error: "Webhook signature verification failed" });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Log the successful payment
        console.log("Payment successful:", {
          sessionId: session.id,
          customerEmail: session.customer_email,
          amount: session.amount_total,
          currency: session.currency,
          metadata: session.metadata,
        });

        // Log detailed order information
        if (session.metadata) {
          const { product, areaM2, kgRequired, net, vat, brutto, pricePerM2 } = session.metadata;
          
          console.log("Order details:", {
            product,
            areaM2: areaM2 ? `${areaM2} m²` : "N/A",
            kgRequired: kgRequired ? `${kgRequired} kg` : "N/A",
            net: net ? `${net} PLN` : "N/A",
            vat: vat ? `${vat} PLN` : "N/A",
            brutto: brutto ? `${brutto} PLN` : "N/A",
            pricePerM2: pricePerM2 ? `${pricePerM2} PLN/m²` : "N/A",
          });
        }
        break;

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment intent succeeded:", paymentIntent.id);
        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", failedPayment.id, failedPayment.last_payment_error);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    res.status(500).json({ error: "Webhook handler failed" });
  }
}
