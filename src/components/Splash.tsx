import { useState, useEffect } from 'react';
import './Splash.css';

const logoUrl = `${import.meta.env.BASE_URL}logo-seriously.png`;

const Splash = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fade-out after 1.6s, remove from DOM after 2.2s
    const fadeTimer = setTimeout(() => setFading(true), 1600);
    const hideTimer = setTimeout(() => setVisible(false), 2200);
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
