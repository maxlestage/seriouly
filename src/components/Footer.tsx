import './Footer.css';

const logoUrl = `${import.meta.env.BASE_URL}logo-seriously.png`;

const BUILD_VERSION = '1.0.0';
const BUILD_YEAR = '2026';
const BUILD_NUMBER = '20260214';

const Footer = () => {
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
          <a href="/about" className="footer__link">À propos</a>
          <a href="/messages" className="footer__link">Messages</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
