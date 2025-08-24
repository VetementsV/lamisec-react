import { Link } from 'react-router-dom';
import './Produkty.css';

const Produkty = () => {
  return (
    <div className="produkty">
      <div className="container">
        <div className="page-header">
          <h1>Produkty LamiSec</h1>
          <p>Profesjonalne materiały ochronne do różnych powierzchni</p>
        </div>

        <div className="products-grid">
          <div className="product-card large">
            <div className="product-image">
              <img src="/images/szklo.jpg" alt="LamiSec - ochrona szkła/okien" />
            </div>
            <div className="product-content">
              <h2>LamiSec – ochrona szkła/okien</h2>
              <p>
                Specjalistyczny materiał ochronny przeznaczony do zabezpieczania 
                powierzchni szklanych. Zapewnia długotrwałą ochronę przed 
                zarysowaniami i zanieczyszczeniami.
              </p>
              <ul className="product-features">
                <li>Zużycie: 80-100 g/m² (średnio 90 g/m²)</li>
                <li>Dostępne opakowania: 1kg, 5kg, 20kg</li>
                <li>Wysoka przyczepność do powierzchni szklanych</li>
                <li>Łatwe usuwanie bez pozostawiania śladów</li>
                <li>Odporność na wilgoć i zmiany temperatury</li>
                <li>Przezroczystość zachowująca estetykę</li>
              </ul>
              <div className="product-actions">
                <Link to="/produkty/szklo" className="btn btn-outline">
                  Zobacz szczegóły
                </Link>
                <Link to="/zamow" className="btn btn-primary">
                  Oblicz koszty
                </Link>
              </div>
            </div>
          </div>

          <div className="product-card large">
            <div className="product-image">
              <img src="/images/mramur.jpg" alt="LamiSec - protektor (marmur)" />
            </div>
            <div className="product-content">
              <h2>LamiSec – protektor (marmur)</h2>
              <p>
                Profesjonalny materiał ochronny dedykowany powierzchniom marmurowym. 
                Chroni przed uszkodzeniami mechanicznymi i chemicznymi.
              </p>
              <ul className="product-features">
                <li>Zużycie: 350 g/m²</li>
                <li>Specjalna formuła dla powierzchni marmurowych</li>
                <li>Ochrona przed kwasami i zasadami</li>
                <li>Odporność na ścieranie i uderzenia</li>
                <li>Przezroczystość zachowująca estetykę</li>
                <li>Długotrwała ochrona</li>
              </ul>
              <div className="product-actions">
                <Link to="/produkty/marmur" className="btn btn-outline">
                  Zobacz szczegóły
                </Link>
                <Link to="/zamow" className="btn btn-primary">
                  Oblicz koszty
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="products-cta">
          <div className="cta-content">
            <h3>Potrzebujesz pomocy w wyborze?</h3>
            <p>
              Nasi specjaliści pomogą Ci wybrać odpowiedni materiał ochronny 
              dla Twojej powierzchni i zastosowania.
            </p>
            <div className="cta-buttons">
              <Link to="/kontakt" className="btn btn-primary">
                Skontaktuj się z nami
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produkty;
