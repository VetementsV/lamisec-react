import { useState } from 'react';
import { PRICING } from '../lib/pricing';
import './SzybkiZakup.css';

const SzybkiZakup = () => {
  const [glassQuantities, setGlassQuantities] = useState({
    n1: 0,
    n5: 0,
    n20: 0
  });
  
  const [marbleKg, setMarbleKg] = useState<number>(1);
  const [includeVAT, setIncludeVAT] = useState<boolean>(true);

  const calculateGlassTotal = () => {
    const { n1, n5, n20 } = glassQuantities;
    const total = (n1 * PRICING.glass.buckets['1kg']) + 
                  (n5 * PRICING.glass.buckets['5kg'] * 5) + 
                  (n20 * PRICING.glass.buckets['20kg'] * 20);
    return includeVAT ? total * 1.23 : total;
  };

  const calculateMarbleTotal = () => {
    const total = marbleKg * PRICING.marble.pricePerKg;
    return includeVAT ? total * 1.23 : total;
  };

  const getGlassTotalKg = () => {
    const { n1, n5, n20 } = glassQuantities;
    return n1 + (n5 * 5) + (n20 * 20);
  };

  const handleGlassQuantityChange = (type: '1kg' | '5kg' | '20kg', value: number) => {
    const newValue = Math.max(0, value);
    setGlassQuantities(prev => ({
      ...prev,
      [type === '1kg' ? 'n1' : type === '5kg' ? 'n5' : 'n20']: newValue
    }));
  };

  const handleCheckout = async (productType: 'glass' | 'marble') => {
    try {
      let payload;
      
      if (productType === 'glass') {
        const totalKg = getGlassTotalKg();
        if (totalKg === 0) {
          alert('Wybierz ilość produktów przed przejściem do płatności.');
          return;
        }
        
        payload = {
          quick: 'glass',
          n1: glassQuantities.n1,
          n5: glassQuantities.n5,
          n20: glassQuantities.n20
        };
      } else {
        if (marbleKg <= 0) {
          alert('Wybierz ilość produktów przed przejściem do płatności.');
          return;
        }
        
        payload = {
          quick: 'marble',
          kg: marbleKg
        };
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        alert('Błąd podczas tworzenia sesji płatności. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Błąd połączenia. Sprawdź połączenie internetowe i spróbuj ponownie.');
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} PLN`;
  };

  return (
    <div className="szybki-zakup">
      <div className="container">
        <div className="page-header">
          <h1>Szybki Zakup</h1>
          <p>Kup materiały ochronne bez obliczania powierzchni</p>
        </div>

        <div className="quick-buy-container">
          {/* Glass Products */}
          <div className="product-section">
            <h2>LamiSec – ochrona szkła/okien</h2>
            <div className="product-cards">
              <div className="product-card">
                <div className="card-header">
                  <h3>1 kg</h3>
                  <p className="price">{formatCurrency(PRICING.glass.buckets['1kg'])}/kg</p>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleGlassQuantityChange('1kg', glassQuantities.n1 - 1)}
                    disabled={glassQuantities.n1 === 0}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{glassQuantities.n1}</span>
                  <button
                    onClick={() => handleGlassQuantityChange('1kg', glassQuantities.n1 + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <p className="total-price">
                  {formatCurrency(glassQuantities.n1 * PRICING.glass.buckets['1kg'])}
                </p>
              </div>

              <div className="product-card">
                <div className="card-header">
                  <h3>5 kg</h3>
                  <p className="price">{formatCurrency(PRICING.glass.buckets['5kg'])}/kg</p>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleGlassQuantityChange('5kg', glassQuantities.n5 - 1)}
                    disabled={glassQuantities.n5 === 0}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{glassQuantities.n5}</span>
                  <button
                    onClick={() => handleGlassQuantityChange('5kg', glassQuantities.n5 + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <p className="total-price">
                  {formatCurrency(glassQuantities.n5 * PRICING.glass.buckets['5kg'] * 5)}
                </p>
              </div>

              <div className="product-card">
                <div className="card-header">
                  <h3>20 kg</h3>
                  <p className="price">{formatCurrency(PRICING.glass.buckets['20kg'])}/kg</p>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleGlassQuantityChange('20kg', glassQuantities.n20 - 1)}
                    disabled={glassQuantities.n20 === 0}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{glassQuantities.n20}</span>
                  <button
                    onClick={() => handleGlassQuantityChange('20kg', glassQuantities.n20 + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <p className="total-price">
                  {formatCurrency(glassQuantities.n20 * PRICING.glass.buckets['20kg'] * 20)}
                </p>
              </div>
            </div>

            {getGlassTotalKg() > 0 && (
              <div className="glass-summary">
                <h3>Podsumowanie zamówienia szkła</h3>
                <div className="summary-details">
                  <p>Łączna ilość: <strong>{getGlassTotalKg()} kg</strong></p>
                  <p>Cena netto: <strong>{formatCurrency(calculateGlassTotal() / (includeVAT ? 1.23 : 1))}</strong></p>
                  {includeVAT && <p>VAT (23%): <strong>{formatCurrency((calculateGlassTotal() / 1.23) * 0.23)}</strong></p>}
                  <p className="total">Razem: <strong>{formatCurrency(calculateGlassTotal())}</strong></p>
                </div>
                <button
                  onClick={() => handleCheckout('glass')}
                  className="btn btn-primary checkout-btn"
                >
                  Przejdź do płatności
                </button>
              </div>
            )}
          </div>

          {/* Marble Products */}
          <div className="product-section">
            <h2>LamiSec – protektor (marmur)</h2>
            <div className="marble-card">
              <div className="card-header">
                <h3>Protektor marmurowy</h3>
                <p className="price">{formatCurrency(PRICING.marble.pricePerKg)}/kg</p>
              </div>
              <div className="quantity-controls">
                <label htmlFor="marble-kg">Ilość (kg):</label>
                <input
                  type="number"
                  id="marble-kg"
                  min="1"
                  step="1"
                  value={marbleKg}
                  onChange={(e) => setMarbleKg(Math.max(1, parseInt(e.target.value) || 1))}
                  className="quantity-input"
                />
              </div>
              <p className="total-price">
                {formatCurrency(marbleKg * PRICING.marble.pricePerKg)}
              </p>
              
              <div className="marble-summary">
                <h4>Podsumowanie zamówienia</h4>
                <div className="summary-details">
                  <p>Ilość: <strong>{marbleKg} kg</strong></p>
                  <p>Cena netto: <strong>{formatCurrency(marbleKg * PRICING.marble.pricePerKg)}</strong></p>
                  {includeVAT && <p>VAT (23%): <strong>{formatCurrency((marbleKg * PRICING.marble.pricePerKg) * 0.23)}</strong></p>}
                  <p className="total">Razem: <strong>{formatCurrency(calculateMarbleTotal())}</strong></p>
                </div>
                <button
                  onClick={() => handleCheckout('marble')}
                  className="btn btn-primary checkout-btn"
                >
                  Przejdź do płatności
                </button>
              </div>
            </div>
          </div>

          {/* VAT Toggle */}
          <div className="vat-toggle">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeVAT}
                onChange={(e) => setIncludeVAT(e.target.checked)}
                className="form-checkbox"
              />
              <span className="checkmark"></span>
              Uwzględnij VAT 23%
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SzybkiZakup;
