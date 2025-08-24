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

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
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

        // Here you would typically:
        // 1. Save order to database
        // 2. Send confirmation email
        // 3. Update inventory
        // 4. Notify fulfillment team
        
        // For now, we'll just log the order details
        if (session.metadata) {
          const { product, area_m2, totalKg, materialNet, brutto } = session.metadata;
          
          console.log("Order details:", {
            product,
            area_m2: area_m2 ? `${area_m2} m²` : "N/A",
            totalKg: totalKg ? `${totalKg} kg` : "N/A",
            materialNet: materialNet ? `${materialNet} PLN` : "N/A",
            brutto: brutto ? `${brutto} PLN` : "N/A",
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
