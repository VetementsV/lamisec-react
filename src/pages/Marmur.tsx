import { Link } from 'react-router-dom';
import './Marmur.css';

const Marmur = () => {
  return (
    <div className="marmur">
      <div className="marmur-container">
        <div className="page-header">
          <h1>LamiSec – protektor (marmur)</h1>
          <p>
            Profesjonalny materiał ochronny dedykowany powierzchniom marmurowym. 
            Chroni przed uszkodzeniami mechanicznymi i chemicznymi.
          </p>
        </div>

        <div className="product-overview">
          <div className="product-image">
            <img src="/images/mramur.jpg" alt="LamiSec - protektor (marmur)" />
          </div>
          <div className="product-info">
            <h2>Protektor Marmuru</h2>
            <p>
              LamiSec to specjalistyczny materiał ochronny, który tworzy niewidzialną warstwę 
              zabezpieczającą powierzchnie marmurowe przed uszkodzeniami mechanicznymi, 
              chemicznymi i wpływami atmosferycznymi.
            </p>
            <ul className="product-features">
              <li>Zużycie: 350 g/m²</li>
              <li>Ochrona przed kwasami i substancjami chemicznymi</li>
              <li>Odporność na ścieranie i uderzenia</li>
              <li>Przezroczystość zachowująca naturalną estetykę</li>
              <li>Łatwe usuwanie bez pozostawiania śladów</li>
            </ul>
            <div className="product-cta">
              <Link to="/zamow" className="btn btn-primary">
                Oblicz koszty
              </Link>
            </div>
          </div>
        </div>

        <div className="product-details">
          <div className="details-container">
            <div className="details-grid">
              <div className="detail-card">
                <h3>Zastosowanie</h3>
                <p>
                  Idealny do ochrony blatów kuchennych, parapetów, schodów, 
                  posadzek, elewacji oraz innych powierzchni marmurowych 
                  w budownictwie i przemyśle.
                </p>
              </div>
              <div className="detail-card">
                <h3>Korzyści</h3>
                <p>
                  Zmniejsza ryzyko uszkodzeń podczas transportu, montażu i użytkowania. 
                  Ułatwia czyszczenie i utrzymanie powierzchni w idealnym stanie.
                </p>
              </div>
              <div className="detail-card">
                <h3>Trwałość</h3>
                <p>
                  Materiał pozostaje skuteczny przez cały okres montażu i może być 
                  łatwo usunięty po zakończeniu prac bez uszkodzenia powierzchni.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="applications">
          <div className="applications-container">
            <h2>Główne Zastosowania</h2>
            <div className="applications-grid">
              <div className="application-item">
                <i className="fas fa-utensils"></i>
                <h4>Kuchnie</h4>
                <p>Blaty kuchenne i parapety</p>
              </div>
              <div className="application-item">
                <i className="fas fa-stairs"></i>
                <h4>Schody</h4>
                <p>Stopnie i balustrady</p>
              </div>
              <div className="application-item">
                <i className="fas fa-home"></i>
                <h4>Mieszkania</h4>
                <p>Posadzki i elementy wykończeniowe</p>
              </div>
              <div className="application-item">
                <i className="fas fa-building"></i>
                <h4>Budynki</h4>
                <p>Elewacje i lobby</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Gotowy do Zamówienia?</h2>
          <p>
            Skorzystaj z naszego kalkulatora, aby obliczyć dokładne koszty materiałów 
            dla Twojego projektu, lub skontaktuj się z nami po indywidualną wycenę.
          </p>
          <div className="cta-buttons">
            <Link to="/zamow" className="btn btn-primary">
              Oblicz koszty
            </Link>
            <Link to="/kontakt" className="btn btn-outline">
              Skontaktuj się
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marmur;
