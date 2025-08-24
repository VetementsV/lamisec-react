# LamiSec React Application

Modern React application for LamiSec professional protective materials with Stripe Checkout integration.

## Features

- **React 18 + TypeScript + Vite**: Modern development stack
- **React Router v6**: Client-side routing
- **Stripe Checkout**: Secure payment processing
- **Serverless API**: Vercel functions for backend logic
- **Polish UI**: Complete Polish language interface
- **Responsive Design**: Mobile-first approach

## Local Development

### Prerequisites

- Node.js 18+ (recommended: Node.js 20)
- npm or yarn

### Setup

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/VetementsV/lamisec-react.git
   cd lamisec-react
   npm install
   ```

2. **Environment variables:**
   Create `.env.local` file:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   BASE_URL=http://localhost:5173
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

## Vercel Deployment

### 1. Import Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: `https://github.com/VetementsV/lamisec-react`
4. Select the repository and click "Deploy"

### 2. Environment Variables

In Vercel project settings, add these environment variables:

```env
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_... # Webhook signing secret
BASE_URL=https://your-project.vercel.app # Your Vercel URL
```

### 3. Stripe Webhook Setup

1. **In Stripe Dashboard:**
   - Go to Developers → Webhooks
   - Click "Add endpoint"
   - URL: `https://your-project.vercel.app/api/webhook`
   - Events: Select `checkout.session.completed`
   - Click "Add endpoint"

2. **Copy Webhook Secret:**
   - Click on the created webhook
   - Click "Reveal" next to "Signing secret"
   - Copy the `whsec_...` value
   - Add it to Vercel as `STRIPE_WEBHOOK_SECRET`

3. **Redeploy:**
   - Go back to Vercel
   - Click "Redeploy" to apply environment variables

## Testing

### Test Card
Use Stripe test card: `4242 4242 4242 4242`

### Test Flow
1. Go to `/zamow`
2. Enter area (e.g., 20 m²)
3. Select product (szkło/marmur)
4. Click "Przejdź do płatności"
5. Complete payment with test card
6. Should redirect to `/sukces`

### Webhook Testing
1. In Stripe Dashboard → Webhooks
2. Click on your webhook
3. Click "Send test webhook"
4. Select `checkout.session.completed`
5. Check Vercel Runtime logs for webhook receipt

## API Endpoints

### `/api/checkout` (POST)
Creates Stripe Checkout Session.

**Request:**
```json
{
  "product": "szklo" | "marmur",
  "areaM2": number
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/...",
  "kgRequired": 2,
  "packaging": { "n20": 0, "n5": 0, "n1": 2 },
  "net": 120.00,
  "vat": 27.60,
  "brutto": 147.60,
  "pricePerM2": 6.00,
  "product": "szklo"
}
```

### `/api/webhook` (POST)
Handles Stripe webhooks.

### `/api/health` (GET)
Health check endpoint.

## Pricing Algorithm

### Glass (Szkło)
- **Consumption**: 0.09 kg/m² (90 g/m²)
- **Packaging**: 20kg, 5kg, 1kg buckets
- **Prices (NET)**:
  - 20kg: 720 PLN (36 PLN/kg)
  - 5kg: 250 PLN (50 PLN/kg)
  - 1kg: 60 PLN (60 PLN/kg)
- **Algorithm**: Minimizes total cost by choosing optimal bucket combination

### Marble (Marmur)
- **Consumption**: 0.35 kg/m² (350 g/m²)
- **Price**: 85 PLN/kg (NET)
- **Packaging**: Per kg (no bucket discounts)

### VAT
- Always applied: 23%
- All prices shown as NET + VAT = BRUTTO

## Project Structure

```
lamisec-react/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── lib/           # Business logic (pricing, packaging)
│   └── App.tsx        # Main app component
├── api/               # Vercel serverless functions
│   ├── checkout.ts    # Stripe Checkout creation
│   ├── webhook.ts     # Stripe webhook handler
│   └── health.ts      # Health check
├── public/            # Static assets
└── vercel.json        # Vercel configuration
```

## Troubleshooting

### Common Issues

1. **500 errors on API endpoints:**
   - Check environment variables in Vercel
   - Verify Stripe keys are correct
   - Check Vercel Runtime logs

2. **Webhook signature verification fails:**
   - Ensure `STRIPE_WEBHOOK_SECRET` is correct
   - Verify webhook URL in Stripe Dashboard
   - Check webhook endpoint is accessible

3. **Checkout session creation fails:**
   - Verify `STRIPE_SECRET_KEY` is correct
   - Check `BASE_URL` environment variable
   - Ensure Stripe account is in test mode

### Vercel Logs
- Go to Vercel Dashboard → Your Project → Functions
- Click on function name to view logs
- Check "Runtime Logs" for detailed error information

## Development Notes

- **ESM Only**: Project uses ES modules throughout
- **TypeScript**: Strict type checking enabled
- **Security**: All pricing computed server-side
- **Validation**: Input validation on both client and server
- **Error Handling**: Comprehensive error handling with user-friendly messages

## License

Private project for LamiSec.
