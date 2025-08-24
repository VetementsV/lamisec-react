import './Kontakt.css';

const Kontakt = () => {
  return (
    <div className="kontakt">
      <div className="container">
        <div className="page-header">
          <h1>Kontakt i Reprezentacje</h1>
          <p>Skontaktuj się z nami w dogodny dla Ciebie sposób</p>
        </div>

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
              <a href="tel:+380682837200" className="messenger-btn telegram">
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

        <div className="contact-cta">
          <div className="cta-content">
            <h3>Potrzebujesz wyceny lub masz pytania?</h3>
            <p>
              Nasi specjaliści są gotowi pomóc Ci w wyborze odpowiedniego materiału 
              ochronnego i udzielić szczegółowych informacji o produktach LamiSec.
            </p>
            <div className="cta-buttons">
              <a href="tel:+48669484039" className="btn btn-primary">
                <i className="fas fa-phone"></i>
                Zadzwoń teraz
              </a>
              <a href="https://wa.me/48669484039" className="btn btn-secondary">
                <i className="fab fa-whatsapp"></i>
                Napisz na WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;
