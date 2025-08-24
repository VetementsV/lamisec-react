import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">LamiSec</h1>
            <h2 className="hero-subtitle">Profesjonalne Materiały Ochronne</h2>
            <p className="hero-description">
              Innowacyjne rozwiązania ochronne do szkła, marmuru i kabin malarskich. 
              Zabezpiecz swoje powierzchnie przed zniszczeniem i zanieczyszczeniem.
            </p>
            <div className="hero-buttons">
              <Link to="/zamow" className="btn btn-primary">
                Zamów online
              </Link>
              <Link to="/zamow" className="btn btn-secondary">
                Oblicz wg powierzchni
              </Link>
              <Link to="/szybki-zakup" className="btn btn-outline">
                Szybki zakup (bez powierzchni)
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/Lamisec_logo.jpg" alt="LamiSec - Profesjonalne Materiały Ochronne" />
          </div>
        </div>
      </section>

      {/* Product Information Section */}
      <section className="product">
        <div className="container">
          <h2 className="section-title">Produkty LamiSec</h2>
          <div className="product-grid">
            <div className="product-card">
              <div className="product-icon">
                <i className="fas fa-window-maximize"></i>
              </div>
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
              <Link to="/produkty/szklo" className="btn btn-outline">
                Zobacz szczegóły
              </Link>
            </div>
            
            <div className="product-card">
              <div className="product-icon">
                <i className="fas fa-gem"></i>
              </div>
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
              <Link to="/produkty/marmur" className="btn btn-outline">
                Zobacz szczegóły
              </Link>
            </div>
          </div>
          
          <div className="product-cta">
            <p>Masz pytania? <Link to="/kontakt">Skontaktuj się z nami</Link></p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="technologia">
        <div className="container">
          <h2 className="section-title">Karta Technologiczna</h2>
          <p className="tech-intro">
            Poznaj szczegółowy proces aplikacji materiałów ochronnych LamiSec. 
            Nasza karta technologiczna zawiera kompletne informacje o każdym etapie procesu.
          </p>
          <div className="tech-cta">
            <Link to="/technologia" className="btn btn-primary">
              Zobacz pełną kartę technologiczną
            </Link>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="sustainability">
        <div className="container">
          <h2 className="section-title">Zrównoważony Rozwój i Ekologia</h2>
          <div className="sustainability-content">
            <div className="sustainability-text">
              <h3>Nasze zobowiązanie ekologiczne</h3>
              <p>
                LamiSec to nie tylko wysokiej jakości materiały ochronne, ale także 
                produkty przyjazne środowisku. Nasze materiały są wytwarzane z 
                poszanowaniem zasad zrównoważonego rozwoju.
              </p>
              <div className="eco-features">
                <div className="eco-feature">
                  <i className="fas fa-recycle"></i>
                  <h4>Materiały biodegradowalne</h4>
                  <p>Nasze produkty ulegają naturalnemu rozkładowi</p>
                </div>
                <div className="eco-feature">
                  <i className="fas fa-leaf"></i>
                  <h4>Bezpieczne dla środowiska</h4>
                  <p>Nie zawierają szkodliwych substancji chemicznych</p>
                </div>
                <div className="eco-feature">
                  <i className="fas fa-solar-panel"></i>
                  <h4>Energooszczędna produkcja</h4>
                  <p>Minimalizujemy zużycie energii podczas produkcji</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <h2 className="section-title">Kontakt i Reprezentacje</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <div>
                  <h4>Sprzedaż biurowa</h4>
                  <p>+48 669 484 039</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-globe"></i>
                <div>
                  <h4>Menedżer eksportu</h4>
                  <p>+48 576 001 657</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>kontakt@lamisec.pl</p>
                </div>
              </div>
            </div>
            
            <div className="contact-messengers">
              <h3>Komunikatory</h3>
              <div className="messenger-buttons">
                <a href="https://wa.me/48669484039" className="messenger-btn whatsapp">
                  <i className="fab fa-whatsapp"></i>
                  WhatsApp
                </a>
                <a href="https://t.me/lamisec" className="messenger-btn telegram">
                  <i className="fab fa-telegram"></i>
                  Telegram
                </a>
              </div>
            </div>
            
            <div className="contact-social">
              <h3>Media społecznościowe</h3>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
