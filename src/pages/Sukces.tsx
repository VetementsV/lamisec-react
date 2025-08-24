import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import './Sukces.css';

const Sukces = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="sukces-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          
          <h1>Płatność zakończona pomyślnie!</h1>
          <p>
            Dziękujemy za Twoje zamówienie. Twoja płatność została przetworzona 
            i otrzymaliśmy potwierdzenie.
          </p>
          
          {sessionId && (
            <div className="session-info">
              <p><strong>Numer sesji:</strong> {sessionId}</p>
              <p>Zachowaj ten numer do celów kontaktowych.</p>
            </div>
          )}
          
          <div className="next-steps">
            <h3>Co dalej?</h3>
            <ul>
              <li>Otrzymasz email z potwierdzeniem zamówienia</li>
              <li>Nasz zespół przygotuje Twoje zamówienie</li>
              <li>Skontaktujemy się z Tobą w sprawie dostawy</li>
            </ul>
          </div>
          
          <div className="success-actions">
            <Link to="/" className="btn btn-primary">
              Wróć do strony głównej
            </Link>
            <Link to="/kontakt" className="btn btn-outline">
              Skontaktuj się z nami
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sukces;
