import { useState, useEffect, useRef, useCallback } from 'react';
import { computePackaging, computeMarblePackaging } from '../lib/packaging';
import type { PackagingResult } from '../lib/packaging';
import { PRICING } from '../lib/pricing';
import './Zamow.css';

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Zamow = () => {
  const [area, setArea] = useState<number>(1);
  const [material, setMaterial] = useState<'glass' | 'marble'>('glass');
  const [results, setResults] = useState<PackagingResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounce area input to prevent thrashing
  const debouncedArea = useDebounce(area, 300);

  // Validation function
  const validateInputs = useCallback(() => {
    if (!debouncedArea || debouncedArea <= 0) {
      setValidationError('Podaj powierzchnię w m²');
      return false;
    }
    if (debouncedArea > 10000) {
      setValidationError('Powierzchnia nie może przekraczać 10 000 m²');
      return false;
    }
    if (!material) {
      setValidationError('Wybierz produkt');
      return false;
    }
    setValidationError('');
    return true;
  }, [debouncedArea, material]);

  // Calculate function
  const calculate = useCallback(() => {
    if (!validateInputs()) return;
    
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      try {
        let result: PackagingResult;
        
        if (material === 'glass') {
          const requiredKg = debouncedArea * PRICING.glass.consumption;
          result = computePackaging(requiredKg, debouncedArea, true); // VAT always applied
        } else {
          result = computeMarblePackaging(debouncedArea, true); // VAT always applied
        }
        
        setResults(result);
      } catch (error) {
        console.error('Calculation error:', error);
        setResults(null);
      } finally {
        setIsCalculating(false);
      }
    }, 200);
  }, [debouncedArea, material, validateInputs]);

  // Auto-calculate when inputs change
  useEffect(() => {
    if (validateInputs()) {
      calculate();
    } else {
      setResults(null);
    }
  }, [debouncedArea, material, calculate, validateInputs]);

  const formatCurrency = (amount: number) => {
    if (typeof amount !== 'number' || isNaN(amount)) return '0.00 PLN';
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
    if (!results || !validateInputs()) return;
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: material === 'glass' ? 'szklo' : 'marmur',
          areaM2: debouncedArea,
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert('Błąd podczas tworzenia sesji płatności. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Błąd połączenia. Sprawdź połączenie internetowe i spróbuj ponownie.');
    }
  };

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const getInfoNote = () => {
    if (material === 'glass') {
      return 'Zakres zużycia szkła: 80–100 g/m² (używamy 90 g/m²)';
    } else {
      return 'Zużycie marmuru: 350 g/m² (używamy 350 g/m²)';
    }
  };

  const isFormValid = validateInputs();
  const showResults = results && isFormValid;

  return (
    <div className="zamow">
      <div className="container">
        <div className="page-header">
          <h1>Zamów online</h1>
          <p>Kup LamiSec na podstawie wprowadzonej powierzchni – cena obliczana automatycznie.</p>
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
                className={`form-input ${validationError && !isFormValid ? 'error' : ''}`}
                aria-describedby={validationError ? 'validation-hint' : undefined}
              />
              {validationError && (
                <div id="validation-hint" className="validation-hint show" role="alert">
                  {validationError}
                </div>
              )}
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

            <div className="form-info">
              <div className="info-item">
                <i className="fas fa-info-circle"></i>
                <span>{getInfoNote()}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-calculator"></i>
                <span>Kalkulacja aktualizuje się automatycznie po wprowadzeniu danych</span>
              </div>
            </div>
          </div>

          {/* Right side - Results */}
          <div className="calculator-results" ref={resultsRef}>
            <h3>Wyniki obliczeń</h3>
            
            {isCalculating && (
              <div className="no-results">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Obliczam...</p>
              </div>
            )}

            {!isCalculating && !showResults && (
              <div className="no-results">
                <i className="fas fa-calculator"></i>
                <p>Wprowadź powierzchnię i wybierz produkt, aby zobaczyć wyniki</p>
              </div>
            )}

            {showResults && results && (
              <div aria-live="polite">
                <div className="result-item">
                  <span className="result-label">Szacowane zużycie:</span>
                  <span className="result-value">{results.totalKg || 0} kg</span>
                </div>

                {material === 'glass' && (
                  <div className="result-item">
                    <span className="result-label">Sugerowane opakowania:</span>
                    <span className="result-value">{formatPackaging(results.n20 || 0, results.n5 || 0, results.n1 || 0)}</span>
                  </div>
                )}

                <div className="result-item">
                  <span className="result-label">Cena (NETTO):</span>
                  <span className="result-value">{formatCurrency(results.materialNet || 0)}</span>
                </div>

                <div className="result-item">
                  <span className="result-label">VAT (23%):</span>
                  <span className="result-value">{formatCurrency(results.vat || 0)}</span>
                </div>

                <div className="result-item total">
                  <span className="result-label">Razem (BRUTTO):</span>
                  <span className="result-value">{formatCurrency(results.brutto || 0)}</span>
                </div>

                <div className="result-item">
                  <span className="result-label">Cena za m²:</span>
                  <span className="result-value">{formatCurrency(results.pricePerM2 || 0)}</span>
                </div>

                <div className="calculator-actions">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={!isFormValid}
                    aria-disabled={!isFormValid}
                    className="btn btn-primary checkout-btn"
                  >
                    Przejdź do płatności
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zamow;
