import { useState, useEffect } from 'react';
import './Splash.css';

const logoUrl = `${import.meta.env.BASE_URL}logo-seriously.png`;

const Splash = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fade-out after 800ms, remove from DOM after 1200ms
    const fadeTimer = setTimeout(() => setFading(true), 800);
    const hideTimer = setTimeout(() => setVisible(false), 1200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`splash ${fading ? 'splash--fading' : ''}`}>
      <div className="splash__content">
        <img src={logoUrl} alt="Seriously" className="splash__logo" />
        <span className="splash__name">Seriously</span>
      </div>
    </div>
  );
};

export default Splash;
