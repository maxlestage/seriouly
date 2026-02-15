import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';

const logoUrl = `${import.meta.env.BASE_URL}logo-seriously.png`;

const BUILD_VERSION = '1.0.0';
const BUILD_YEAR = '2026';
const BUILD_NUMBER = '20260214';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLicencesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('licences')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('licences')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={logoUrl} alt="Seriously" className="footer__logo" />
          <span className="footer__name">Seriously</span>
        </div>

        <div className="footer__meta">
          <span className="footer__year">&copy; {BUILD_YEAR} Seriously</span>
          <span className="footer__separator">·</span>
          <span className="footer__build">v{BUILD_VERSION}</span>
          <span className="footer__separator">·</span>
          <span className="footer__build">Build #{BUILD_NUMBER}</span>
        </div>

        <div className="footer__links">
          <Link to="/about" className="footer__link">À propos</Link>
          <Link to="/messages" className="footer__link">Messages</Link>
          <a href="#licences" className="footer__link" onClick={handleLicencesClick}>Licences</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
