import { useEffect, useRef } from 'react';
import GlassCard from '../components/GlassCard';
import './Home.css';

const logoUrl = `${import.meta.env.BASE_URL}logo-seriously.png`;

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${scrollY * 0.3}px) scale(${1 - scrollY * 0.0005})`;
        logoRef.current.style.opacity = `${1 - scrollY * 0.002}`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      {/* ===== HERO ===== */}
      <section className="hero" ref={heroRef}>
        {/* Animated gradient orbs */}
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />

        <div className="hero__content">
          <div className="hero__logo-wrapper" ref={logoRef}>
            <img
              src={logoUrl}
              alt="Seriously"
              className="hero__logo"
            />
            <div className="hero__logo-glow" />
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line">L'amour,</span>
            <span className="hero__title-line hero__title-line--accent">
              pour de <em>vrai</em>.
            </span>
          </h1>

          <p className="hero__subtitle">
            Des rencontres authentiques, sans filtre, sans artifice.
            <br />
            Seriously réinvente la connexion humaine.
          </p>

          <div className="hero__cta-group">
            <a href="#features" className="hero__cta interactive">
              Découvrir
              <span className="hero__cta-arrow">→</span>
            </a>
            <a href="#download" className="hero__cta hero__cta--outline interactive">
              Télécharger l'app
            </a>
          </div>

          <div className="hero__badge">
            <span className="hero__badge-year">2026</span>
            <span className="hero__badge-dot" />
            <span className="hero__badge-build">Build #20260214 · v1.0.0</span>
          </div>
        </div>

        <div className="hero__scroll-hint">
          <div className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll</span>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features" id="features">
        <div className="features__inner">
          <h2 className="features__title">
            Pourquoi <span className="text-gradient">Seriously</span> ?
          </h2>

          <div className="features__grid">
            <GlassCard className="feature-card">
              <div className="feature-card__icon">♥</div>
              <h3 className="feature-card__title">Likes ciblés</h3>
              <p className="feature-card__desc">
                Aimez une photo ou une phrase en particulier. Montrez exactement ce qui vous plaît.
              </p>
            </GlassCard>

            <GlassCard className="feature-card">
              <div className="feature-card__icon">💬</div>
              <h3 className="feature-card__title">Chat intuitif</h3>
              <p className="feature-card__desc">
                Double-tap pour aimer un message. Des conversations vivantes et expressives.
              </p>
            </GlassCard>

            <GlassCard className="feature-card">
              <div className="feature-card__icon">✨</div>
              <h3 className="feature-card__title">Profils authentiques</h3>
              <p className="feature-card__desc">
                Photos et prompts intercalés pour montrer votre personnalité, pas juste votre visage.
              </p>
            </GlassCard>

            <GlassCard className="feature-card">
              <div className="feature-card__icon">🔒</div>
              <h3 className="feature-card__title">Sécurité totale</h3>
              <p className="feature-card__desc">
                Vérification de photos, modération IA, et respect absolu de vos données.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD ===== */}
      <section className="download" id="download">
        <div className="download__inner">
          <div className="download__glow" />
          <h2 className="download__title">
            Prêt à trouver <em>la bonne personne</em> ?
          </h2>
          <p className="download__desc">
            Téléchargez Seriously gratuitement et commencez à matcher pour de vrai.
          </p>
          <div className="download__buttons">
            <a href="#" className="download__btn interactive">
              <span className="download__btn-icon">🍎</span>
              <div>
                <span className="download__btn-small">Disponible sur</span>
                <span className="download__btn-big">App Store</span>
              </div>
            </a>
            <a href="#" className="download__btn interactive">
              <span className="download__btn-icon">▶</span>
              <div>
                <span className="download__btn-small">Disponible sur</span>
                <span className="download__btn-big">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
