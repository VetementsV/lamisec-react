import { useState, useEffect, useRef } from 'react';
import { computePackaging, computeMarblePackaging } from '../lib/packaging';
import type { PackagingResult } from '../lib/packaging';
import { PRICING } from '../lib/pricing';
import './Zamow.css';

const Zamow = () => {
  const [area, setArea] = useState<number>(1);
  const [material, setMaterial] = useState<'glass' | 'marble'>('glass');
  const [results, setResults] = useState<PackagingResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    if (area < 0.1) return;
    
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      let result: PackagingResult;
      
      if (material === 'glass') {
        const requiredKg = area * PRICING.glass.consumption;
        result = computePackaging(requiredKg, area, true); // VAT always applied
      } else {
        result = computeMarblePackaging(area, true); // VAT always applied
      }
      
      setResults(result);
      setIsCalculating(false);
      
      // Smooth scroll to results
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300);
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (area >= 0.1) {
      calculate();
    }
  }, [area, material]);

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} PLN`;
  };

  const formatPackaging = (n20: number, n5: number, n1: number) => {
    const parts = [];
    if (n20 > 0) parts.push(`${n20} × 20 kg`);
    if (n5 > 0) parts.push(`${n5} × 5 kg`);
    if (n1 > 0) parts.push(`${n1} × 1 kg`);
    return parts.join(', ') || 'Brak';
  };

  const handleCheckout = async () => {
    if (!results) return;

    try {
      setIsCalculating(true);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: material,
          areaM2: area,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout failed');
      }

      const data = await response.json();
      
      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Błąd podczas tworzenia zamówienia. Spróbuj ponownie.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getInfoNote = () => {
    if (material === 'glass') {
      return 'Zakres zużycia szkła: 80–100 g/m² (używamy 90 g/m²)';
    } else {
      return 'Zużycie marmuru: 350 g/m² (używamy 350 g/m²)';
    }
  };

  return (
    <div className="zamow">
      <div className="container">
        <div className="page-header">
          <h1>Kalkulator Kosztów</h1>
          <p>Oblicz koszty materiałów ochronnych na podstawie powierzchni</p>
        </div>

        <div className="calculator-container">
          {/* Left side - Form */}
          <div className="calculator-form">
            <div className="form-group">
              <label htmlFor="surface-area">Powierzchnia (m²):</label>
              <input
                type="number"
                id="surface-area"
                min="0.1"
                step="0.1"
                value={area}
                onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
                placeholder="Wprowadź powierzchnię"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="material-type">Produkt:</label>
              <select
                id="material-type"
                value={material}
                onChange={(e) => setMaterial(e.target.value as 'glass' | 'marble')}
                className="form-select"
              >
                <option value="glass">LamiSec – szkło/okna</option>
                <option value="marble">LamiSec – protektor (marmur)</option>
              </select>
            </div>

            <button
              type="button"
              onClick={calculate}
              disabled={area < 0.1 || isCalculating}
              className="btn btn-primary calculate-btn"
            >
              {isCalculating ? 'Obliczam...' : 'Oblicz koszty'}
            </button>

            <div className="form-info">
              <div className="info-item">
                <i className="fas fa-info-circle"></i>
                <span>{getInfoNote()}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-industry"></i>
                <span>
                  Ceny hurtowe dostępne po negocjacji. 
                  <a href="/kontakt">Skontaktuj się z nami</a>.
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Results */}
          <div className="calculator-results" ref={resultsRef}>
            <h3>Wyniki obliczeń</h3>
            
            {results ? (
              <>
                <div className="result-item">
                  <span className="result-label">Szacowane zużycie (kg):</span>
                  <span className="result-value">{results.totalKg} kg</span>
                </div>

                {material === 'glass' && (
                  <div className="result-item">
                    <span className="result-label">Sugerowane opakowania:</span>
                    <span className="result-value">
                      {formatPackaging(results.n20, results.n5, results.n1)}
                    </span>
                  </div>
                )}

                <div className="result-item">
                  <span className="result-label">Cena (NETTO):</span>
                  <span className="result-value">{formatCurrency(results.materialNet)}</span>
                </div>

                <div className="result-item">
                  <span className="result-label">VAT (23%):</span>
                  <span className="result-value">{formatCurrency(results.vat)}</span>
                </div>

                <div className="result-item total">
                  <span className="result-label">Razem (BRUTTO):</span>
                  <span className="result-value">{formatCurrency(results.brutto)}</span>
                </div>

                <div className="result-item">
                  <span className="result-label">Cena za m²:</span>
                  <span className="result-value">{formatCurrency(results.pricePerM2)}</span>
                </div>

                <div className="calculator-actions">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="btn btn-primary checkout-btn"
                  >
                    Przejdź do płatności
                  </button>
                </div>
              </>
            ) : (
              <div className="no-results">
                <i className="fas fa-calculator"></i>
                <p>Wprowadź powierzchnię i wybierz materiał, aby zobaczyć wyniki</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zamow;
