import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img 
            src="/images/Lamisec_white_logo.png" 
            alt="LamiSec" 
          />
        </Link>
        
        <button className="navbar-toggle" onClick={toggleMenu}>
          <i className={`fas fa-${isOpen ? 'times' : 'bars'}`}></i>
        </button>
        
        <ul className={`navbar-nav ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={closeMenu} className={isActive('/') ? 'active' : ''}>
              Strona główna
            </Link>
          </li>
          <li>
            <Link to="/produkty" onClick={closeMenu} className={isActive('/produkty') ? 'active' : ''}>
              Produkty
            </Link>
          </li>
          <li>
            <Link to="/technologia" onClick={closeMenu} className={isActive('/technologia') ? 'active' : ''}>
              Technologia
            </Link>
          </li>
          <li>
            <Link to="/zamow" onClick={closeMenu} className={isActive('/zamow') ? 'active' : ''}>
              Zamów
            </Link>
          </li>
          <li>
            <Link to="/kontakt" onClick={closeMenu} className={isActive('/kontakt') ? 'active' : ''}>
              Kontakt
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
