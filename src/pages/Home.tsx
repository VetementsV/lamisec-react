import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './Home.css';

const Home = () => {
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.get("s") === "produkty") {
      const productsSection = document.getElementById("produkty");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
      // Remove param from URL
      window.history.replaceState({}, "", "/");
    }
  }, [search]);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('produkty');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              <button onClick={scrollToProducts} className="btn btn-secondary">
                Dowiedz się więcej
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/Lamisec_logo.jpg" alt="LamiSec - Profesjonalne Materiały Ochronne" />
          </div>
        </div>
      </section>

      {/* Product Information Section */}
      <section id="produkty" className="product">
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
          <h2 className="section-title">Zrównoważony Rozwój</h2>
          <div className="sustainability-content">
            <div className="sustainability-text">
              <h3>Ekologiczne Materiały Ochronne</h3>
              <p>
                LamiSec to nie tylko skuteczność, ale także odpowiedzialność ekologiczna. 
                Nasze materiały są przyjazne dla środowiska i spełniają najwyższe standardy 
                zrównoważonego rozwoju.
              </p>
              <ul className="sustainability-features">
                <li>Materiały biodegradowalne</li>
                <li>Minimalne zużycie zasobów</li>
                <li>Bezpieczne dla zdrowia</li>
                <li>Certyfikowane produkty</li>
              </ul>
            </div>
            <div className="sustainability-image">
              <img src="/images/ekologia.png" alt="Zrównoważony rozwój LamiSec" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Skontaktuj się z Nami</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Biuro Sprzedaży</h3>
              <p><i className="fas fa-phone"></i> +48 22 123 45 67</p>
              <p><i className="fas fa-envelope"></i> biuro@lamisec.pl</p>
              <p><i className="fas fa-map-marker-alt"></i> ul. Przykładowa 123, 00-000 Warszawa</p>
            </div>
            <div className="contact-cta">
              <p>Potrzebujesz profesjonalnej porady?</p>
              <Link to="/kontakt" className="btn btn-primary">
                Napisz do nas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
