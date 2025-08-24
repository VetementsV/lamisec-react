import { Link } from 'react-router-dom';
import './Anulowano.css';

const Anulowano = () => {
  return (
    <div className="anulowano-page">
      <div className="container">
        <div className="cancelled-content">
          <div className="cancelled-icon">
            <i className="fas fa-times-circle"></i>
          </div>
          
          <h1>Płatność została anulowana</h1>
          <p>
            Twoja płatność została anulowana. Nie martw się - Twoje zamówienie 
            nie zostało przetworzone i nie zostałeś obciążony.
          </p>
          
          <div className="help-info">
            <h3>Potrzebujesz pomocy?</h3>
            <p>
              Jeśli masz pytania lub chcesz spróbować ponownie, 
              jesteśmy tutaj, aby Ci pomóc.
            </p>
          </div>
          
          <div className="cancelled-actions">
            <Link to="/zamow" className="btn btn-primary">
              Spróbuj ponownie
            </Link>
            <Link to="/kontakt" className="btn btn-outline">
              Skontaktuj się z nami
            </Link>
            <Link to="/" className="btn btn-secondary">
              Wróć do strony głównej
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anulowano;
