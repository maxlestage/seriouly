import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollToSection';
import './Navbar.css';

const logoUrl = `${import.meta.env.BASE_URL}logo-seriously.png`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAnchorClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(sectionId, location.pathname, navigate);
  };

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar__logo" onClick={handleLinkClick}>
          <img src={logoUrl} alt="Seriously" className="navbar__logo-img" />
          <span className="navbar__logo-text">Seriously</span>
        </Link>

        <div className="navbar__links">
          <Link
            to="/"
            className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
          >
            Accueil
          </Link>
          <a
            href="#features"
            className="navbar__link"
            onClick={handleAnchorClick('features')}
          >
            Fonctionnalités
          </a>
          <Link
            to="/messages"
            className={`navbar__link ${location.pathname === '/messages' ? 'navbar__link--active' : ''}`}
          >
            Messages
          </Link>
          <Link
            to="/about"
            className={`navbar__link ${location.pathname === '/about' ? 'navbar__link--active' : ''}`}
          >
            À propos
          </Link>
        </div>

        <div className="navbar__cta">
          <a href="#download" className="navbar__btn interactive" onClick={handleAnchorClick('download')}>
            Télécharger
          </a>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <Link
          to="/"
          className={`navbar__mobile-link ${location.pathname === '/' ? 'navbar__mobile-link--active' : ''}`}
          onClick={handleLinkClick}
        >
          Accueil
        </Link>
        <a
          href="#features"
          className="navbar__mobile-link"
          onClick={handleAnchorClick('features')}
        >
          Fonctionnalités
        </a>
        <Link
          to="/messages"
          className={`navbar__mobile-link ${location.pathname === '/messages' ? 'navbar__mobile-link--active' : ''}`}
          onClick={handleLinkClick}
        >
          Messages
        </Link>
        <Link
          to="/about"
          className={`navbar__mobile-link ${location.pathname === '/about' ? 'navbar__mobile-link--active' : ''}`}
          onClick={handleLinkClick}
        >
          À propos
        </Link>
        <a
          href="#download"
          className="navbar__mobile-cta"
          onClick={handleAnchorClick('download')}
        >
          Télécharger
        </a>
      </div>

      {menuOpen && <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;
