import { Link } from 'react-router-dom';
import './Szklo.css';

const Szklo = () => {
  return (
    <div className="szklo">
      <div className="szklo-container">
        <div className="page-header">
          <h1>LamiSec – ochrona szkła/okien</h1>
          <p>
            Profesjonalny materiał ochronny przeznaczony do zabezpieczania powierzchni szklanych. 
            Zapewnia długotrwałą ochronę przed zarysowaniami i zanieczyszczeniami.
          </p>
        </div>

        <div className="product-overview">
          <div className="product-image">
            <img src="images/szklo.jpg" alt="LamiSec - ochrona szkła/okien" />
          </div>
          <div className="product-info">
            <h2>Ochrona Szkła i Okien</h2>
            <p>
              LamiSec to specjalistyczny materiał ochronny, który tworzy niewidzialną warstwę 
              zabezpieczającą powierzchnie szklane przed uszkodzeniami mechanicznymi, 
              zanieczyszczeniami i wpływami atmosferycznymi.
            </p>
            <ul className="product-features">
              <li>Zużycie: 80-100 g/m² (średnio 90 g/m²)</li>
              <li>Wysoka przyczepność do powierzchni szklanych</li>
              <li>Łatwe usuwanie bez pozostawiania śladów</li>
              <li>Odporność na wilgoć i promieniowanie UV</li>
              <li>Przezroczystość zachowująca estetykę</li>
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
                  Idealny do ochrony okien, drzwi szklanych, witryn sklepowych, 
                  balustrad, mebli szklanych oraz innych powierzchni szklanych 
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
                <i className="fas fa-building"></i>
                <h4>Budownictwo</h4>
                <p>Ochrona okien i drzwi podczas budowy i remontów</p>
              </div>
              <div className="application-item">
                <i className="fas fa-store"></i>
                <h4>Handel</h4>
                <p>Witryny sklepowe i wystawy</p>
              </div>
              <div className="application-item">
                <i className="fas fa-home"></i>
                <h4>Mieszkania</h4>
                <p>Balkony, tarasy i elementy wykończeniowe</p>
              </div>
              <div className="application-item">
                <i className="fas fa-industry"></i>
                <h4>Przemysł</h4>
                <p>Maszyny i urządzenia z elementami szklanymi</p>
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

export default Szklo;
