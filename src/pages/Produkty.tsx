import { Link } from 'react-router-dom';
import './Produkty.css';

const Produkty = () => {
  return (
    <div className="produkty">
      <div className="container">
        <div className="page-header">
          <h1>Produkty LamiSec</h1>
          <p>Profesjonalne materiały ochronne do szkła, marmuru i kabin malarskich</p>
        </div>

        <div className="products-grid">
          <div className="product-card">
            <div className="product-image">
              <img src="/images/szklo1.jpg" alt="LamiSec - ochrona szkła/okien" />
            </div>
            <div className="product-content">
              <h3>LamiSec – ochrona szkła/okien</h3>
              <p>
                Specjalistyczny materiał ochronny przeznaczony do zabezpieczania 
                powierzchni szklanych. Zapewnia długotrwałą ochronę przed 
                zarysowaniami i zanieczyszczeniami.
              </p>
              <ul className="product-features">
                <li>Zużycie: 80-100 g/m² (średnio 90 g/m²)</li>
                <li>Dostępne opakowania: 1kg, 5kg, 20kg</li>
                <li>Wysoka przyczepność</li>
                <li>Łatwe usuwanie</li>
              </ul>
              <div className="product-actions">
                <Link to="/produkty/szklo" className="btn btn-primary">
                  Zobacz szczegóły
                </Link>
                <Link to="/zamow" className="btn btn-outline">
                  Oblicz koszty
                </Link>
              </div>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image">
              <img src="/images/mramur.jpg" alt="LamiSec - protektor (marmur)" />
            </div>
            <div className="product-content">
              <h3>LamiSec – protektor (marmur)</h3>
              <p>
                Profesjonalny materiał ochronny dedykowany powierzchniom marmurowym. 
                Chroni przed uszkodzeniami mechanicznymi i chemicznymi.
              </p>
              <ul className="product-features">
                <li>Zużycie: 350 g/m²</li>
                <li>Ochrona przed kwasami</li>
                <li>Odporność na ścieranie</li>
                <li>Przezroczystość</li>
              </ul>
              <div className="product-actions">
                <Link to="/produkty/marmur" className="btn btn-primary">
                  Zobacz szczegóły
                </Link>
                <Link to="/zamow" className="btn btn-outline">
                  Oblicz koszty
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="products-cta">
          <h2>Potrzebujesz profesjonalnej porady?</h2>
          <p>
            Skontaktuj się z nami, aby uzyskać indywidualną wycenę 
            i profesjonalne wsparcie techniczne.
          </p>
          <div className="cta-buttons">
            <Link to="/kontakt" className="btn btn-primary">
              Skontaktuj się
            </Link>
            <Link to="/technologia" className="btn btn-outline">
              Zobacz kartę technologiczną
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produkty;
