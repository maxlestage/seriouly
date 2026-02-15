import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollToSection';
import './Footer.css';

const logoUrl = `${import.meta.env.BASE_URL}logo-seriously.png`;

const BUILD_VERSION = '1.0.0';
const CURRENT_YEAR = new Date().getFullYear();
const BUILD_DATE = new Date().toISOString().slice(0, 10).replace(/-/g, '');

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(sectionId, location.pathname, navigate);
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={logoUrl} alt="Seriously" className="footer__logo" />
          <span className="footer__name">Seriously</span>
        </div>

        <div className="footer__meta">
          <span className="footer__year">&copy; {CURRENT_YEAR} Seriously</span>
          <span className="footer__separator">·</span>
          <span className="footer__build">v{BUILD_VERSION}</span>
          <span className="footer__separator">·</span>
          <span className="footer__build">Build #{BUILD_DATE}</span>
        </div>

        <div className="footer__links">
          <a href="#features" className="footer__link" onClick={handleAnchorClick('features')}>Fonctionnalités</a>
          <a href="#download" className="footer__link" onClick={handleAnchorClick('download')}>Télécharger</a>
          <a href="#licences" className="footer__link" onClick={handleAnchorClick('licences')}>Licences</a>
          <Link to="/messages" className="footer__link">Messages</Link>
          <Link to="/about" className="footer__link">À propos</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
