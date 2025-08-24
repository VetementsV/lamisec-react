# LamiSec React - Profesjonalne Materiały Ochronne

Nowoczesna aplikacja React dla firmy LamiSec, oferująca profesjonalne materiały ochronne do szkła, marmuru i kabin malarskich.

## 🚀 Funkcjonalności

- **Strona główna** z hero section i produktami
- **Produkty** - szczegółowe informacje o szkło i marmur
- **Technologia** - karta technologiczna
- **Zamów online** - kalkulator kosztów z automatycznym pakowaniem
- **Kontakt** - informacje kontaktowe
- **Stripe Checkout** - bezpieczne płatności online

## 🛠️ Technologie

- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router v6
- **Styling**: CSS3 z custom properties
- **Płatności**: Stripe Checkout
- **Deployment**: Vercel (serverless functions)

## 📦 Instalacja

1. **Klonuj repozytorium**
   ```bash
   git clone https://github.com/VetementsV/lamisec-react.git
   cd lamisec-react
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Skonfiguruj zmienne środowiskowe**
   ```bash
   cp env.example .env.local
   ```
   
   Edytuj `.env.local` i dodaj swoje klucze Stripe:
   ```env
   STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   BASE_URL=http://localhost:5173
   ```

4. **Uruchom aplikację w trybie deweloperskim**
   ```bash
   npm run dev
   ```

   Aplikacja będzie dostępna pod adresem: http://localhost:5173

## 🔧 Konfiguracja Stripe

### 1. Klucze API
- Zaloguj się do [Stripe Dashboard](https://dashboard.stripe.com/)
- Przejdź do **Developers > API keys**
- Skopiuj **Publishable key** i **Secret key**
- Dodaj je do pliku `.env.local`

### 2. Webhook
- W Stripe Dashboard przejdź do **Developers > Webhooks**
- Kliknij **Add endpoint**
- URL: `https://yourdomain.com/api/webhook`
- Events: `checkout.session.completed`
- Skopiuj **Signing secret** i dodaj do `STRIPE_WEBHOOK_SECRET`

## 🚀 Deployment na Vercel

### 1. Import repozytorium
- Zaloguj się do [Vercel](https://vercel.com/)
- Kliknij **New Project**
- Wybierz repozytorium `lamisec-react`
- Kliknij **Import**

### 2. Konfiguracja środowiska
W sekcji **Environment Variables** dodaj:
```
STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
BASE_URL=https://yourdomain.com
```

### 3. Deploy
- Kliknij **Deploy**
- Po udanym deploy, skopiuj URL
- Zaktualizuj `BASE_URL` w Stripe webhook
- Zaktualizuj `BASE_URL` w Vercel environment variables
- Redeploy

## 📊 Algorytm pakowania (szkło)

Aplikacja automatycznie oblicza optymalne opakowania dla minimalizacji kosztów:

1. **Oblicz wymagane kg**: `area * 0.09` (zaokrąglone w górę)
2. **Użyj 20kg opakowań**: `Math.floor(requiredKg / 20)`
3. **Dla pozostałych kg**:
   - **Opcja A**: 5kg + 1kg opakowania
   - **Opcja B**: tylko 5kg opakowania  
   - **Opcja C**: dodatkowe 20kg opakowanie
4. **Wybierz najtańszą opcję**

### Przykłady:
- **60 m²**: 5.4 kg → 6 kg → 1 × 5kg + 1 × 1kg
- **300 m²**: 27 kg → 27 kg → 1 × 20kg + 1 × 5kg + 2 × 1kg
- **280 m²**: 25.2 kg → 26 kg → 1 × 20kg + 1 × 5kg + 1 × 1kg

## 🎨 Struktura projektu

```
src/
├── components/          # Komponenty wielokrotnego użytku
│   ├── Navbar.tsx      # Nawigacja główna
│   └── Navbar.css
├── lib/                 # Biblioteki biznesowe
│   ├── pricing.ts      # Cennik produktów
│   └── packaging.ts    # Algorytm pakowania
├── pages/               # Strony aplikacji
│   ├── Home.tsx        # Strona główna
│   ├── Produkty.tsx    # Przegląd produktów
│   ├── Szklo.tsx       # Szczegóły szkła
│   ├── Marmur.tsx      # Szczegóły marmuru
│   ├── Technologia.tsx # Karta technologiczna
│   ├── Zamow.tsx       # Kalkulator/kalkulacja
│   ├── Kontakt.tsx     # Informacje kontaktowe
│   ├── Sukces.tsx      # Potwierdzenie płatności
│   └── Anulowano.tsx   # Anulowana płatność
└── App.tsx              # Główny komponent z routingiem

api/                     # Serverless functions (Vercel)
├── checkout.ts          # Tworzenie sesji Stripe
└── webhook.ts           # Obsługa webhooków Stripe
```

## 🔒 Bezpieczeństwo

- **Walidacja po stronie serwera** wszystkich danych wejściowych
- **Weryfikacja podpisu webhook** Stripe
- **Cennik po stronie serwera** - brak zaufania do wartości klienta
- **Rate limiting** (implementacja podstawowa)
- **HTTPS tylko** w produkcji

## 📱 Responsywność

Aplikacja jest w pełni responsywna z breakpointami:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px  
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🧪 Testowanie

### Testowanie płatności
Użyj testowych kart Stripe:
- **Sukces**: `4242 4242 4242 4242`
- **Błąd**: `4000 0000 0000 0002`
- **Wymaga 3D Secure**: `4000 0025 0000 3155`

### Testowanie webhooków
- Użyj [Stripe CLI](https://stripe.com/docs/stripe-cli) do testowania lokalnie
- W produkcji webhook automatycznie otrzymuje zdarzenia

## 🔄 Aktualizacje

### Cennik
Edytuj `src/lib/pricing.ts`:
```typescript
export const PRICING: PricingData = {
  glass: {
    consumption: 0.09, // kg/m²
    buckets: {
      '1kg': 60,   // PLN/kg
      '5kg': 50,   // PLN/kg
      '20kg': 36,  // PLN/kg
    },
  },
  // ...
};
```

### Zużycie materiałów
Edytuj wartości `consumption` w `src/lib/pricing.ts`

## 📞 Wsparcie

- **Email**: kontakt@lamisec.pl
- **Telefon**: +48 669 484 039
- **WhatsApp**: +48 669 484 039

## 📄 Licencja

© 2024 LamiSec - BENET. Wszystkie prawa zastrzeżone.

---

**Uwaga**: Przed wdrożeniem na produkcję upewnij się, że:
1. Używasz **live keys** Stripe (nie test)
2. Webhook jest skonfigurowany na produkcji
3. `BASE_URL` wskazuje na właściwą domenę
4. Wszystkie environment variables są ustawione
