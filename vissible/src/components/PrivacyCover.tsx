import { useEffect, useState } from 'react';
import './PrivacyCover.css';

const logoUrl = `${import.meta.env.BASE_URL}logo-seriously.png`;

// Touch devices: the app switcher only fires `blur`, often before `visibilitychange`.
// On desktop, clicking another window must not hide the page.
const isTouch = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

/**
 * Confidential mode, like the Altim app: as soon as the page leaves the foreground
 * (app switcher, other tab), a cover hides the content so the snapshot shows nothing.
 */
const PrivacyCover = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hide = () => setHidden(true);
    const show = () => setHidden(false);
    const onVisibility = () => (document.hidden ? hide() : show());
    const onBlur = () => {
      if (isTouch()) hide();
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', hide);
    window.addEventListener('pageshow', show);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', show);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', hide);
      window.removeEventListener('pageshow', show);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', show);
    };
  }, []);

  if (!hidden) return null;

  return (
    <div className="privacy-cover" aria-hidden="true">
      <img src={logoUrl} alt="" className="privacy-cover__logo" />
      <svg className="privacy-cover__lock" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.5 4.5 5.5v5.6c0 4.6 3.1 8.8 7.5 10.4 4.4-1.6 7.5-5.8 7.5-10.4V5.5L12 2.5Z" />
        <rect x="8.75" y="10.5" width="6.5" height="5.5" rx="1.2" />
        <path d="M10 10.5V9a2 2 0 0 1 4 0v1.5" />
      </svg>
    </div>
  );
};

export default PrivacyCover;
