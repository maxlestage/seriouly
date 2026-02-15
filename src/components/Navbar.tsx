import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollToSection';
import './Navbar.css';

const logoUrl = `${import.meta.env.BASE_URL}logo-seriously.png`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(sectionId, location.pathname, navigate);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
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
    </nav>
  );
};

export default Navbar;
