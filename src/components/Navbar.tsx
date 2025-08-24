import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            <img src="/images/Lamisec_white_logo.png" alt="LamiSec Logo" className="logo-img" />
          </Link>
        </div>
        
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Strona główna
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/produkty" 
              className={`nav-link ${isActive('/produkty') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Produkty
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/technologia" 
              className={`nav-link ${isActive('/technologia') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Technologia
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/zamow" 
              className={`nav-link ${isActive('/zamow') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Zamów
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/kontakt" 
              className={`nav-link ${isActive('/kontakt') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Kontakt
            </Link>
          </li>
        </ul>
        
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
