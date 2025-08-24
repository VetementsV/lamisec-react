import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLUListElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Lock body scroll
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);
    // Focus first interactive element in menu
    setTimeout(() => {
      const firstLink = menuRef.current?.querySelector('a');
      firstLink?.focus();
    }, 100);
  };

  const closeMenu = () => {
    setIsOpen(false);
    // Return focus to burger button
    burgerRef.current?.focus();
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
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
        
        <button 
          ref={burgerRef}
          className="navbar-toggle" 
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
          type="button"
        >
          <i className={`fas fa-${isOpen ? 'times' : 'bars'}`}></i>
        </button>
        
        <ul 
          ref={menuRef}
          id="mobile-menu"
          className={`navbar-nav ${isOpen ? 'open' : ''}`}
          role="menu"
        >
          <li role="none">
            <Link 
              to="/" 
              onClick={closeMenu} 
              className={isActive('/') ? 'active' : ''}
              role="menuitem"
            >
              Strona główna
            </Link>
          </li>
          <li role="none">
            <Link 
              to="/produkty" 
              onClick={closeMenu} 
              className={isActive('/produkty') ? 'active' : ''}
              role="menuitem"
            >
              Produkty
            </Link>
          </li>
          <li role="none">
            <Link 
              to="/technologia" 
              onClick={closeMenu} 
              className={isActive('/technologia') ? 'active' : ''}
              role="menuitem"
            >
              Technologia
            </Link>
          </li>
          <li role="none">
            <Link 
              to="/zamow" 
              onClick={closeMenu} 
              className={isActive('/zamow') ? 'active' : ''}
              role="menuitem"
            >
              Zamów
            </Link>
          </li>
          <li role="none">
            <Link 
              to="/kontakt" 
              onClick={closeMenu} 
              className={isActive('/kontakt') ? 'active' : ''}
              role="menuitem"
            >
              Kontakt
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
