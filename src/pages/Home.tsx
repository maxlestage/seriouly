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

            <GlassCard className="feature-card">
              <div className="feature-card__icon">🎯</div>
              <h3 className="feature-card__title">Matching intelligent</h3>
              <p className="feature-card__desc">
                Un algorithme qui apprend de vos préférences pour vous proposer des profils vraiment compatibles.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ===== LICENCES ===== */}
      <section className="licences" id="licences">
        <div className="licences__inner">
          <h2 className="licences__title">
            Licence <span className="text-gradient">propriétaire</span>
          </h2>
          <p className="licences__subtitle">
            Copyright &copy; 2024-2026 Lestage Maxime Nathan — Tous droits réservés.
          </p>

          <div className="licences__grid">
            <div className="licences__card">
              <h3 className="licences__card-title">1. Propriété intellectuelle</h3>
              <p className="licences__card-text">
                Le logiciel « Seriously », incluant l'ensemble de son code source, sa documentation, ses assets graphiques, son architecture technique, ses algorithmes et ses bases de données, est la propriété exclusive et intégrale de Lestage Maxime Nathan.
              </p>
            </div>

            <div className="licences__card">
              <h3 className="licences__card-title">2. Interdictions</h3>
              <p className="licences__card-text">
                Sauf autorisation écrite préalable, il est strictement interdit de : copier, reproduire, modifier, forker, distribuer, sous-licencier ou utiliser le Logiciel à des fins commerciales. Toute ingénierie inverse est également prohibée.
              </p>
            </div>

            <div className="licences__card">
              <h3 className="licences__card-title">3. Marque &amp; identité</h3>
              <p className="licences__card-text">
                Le nom « Seriously », le logo, le design et l'identité visuelle associés sont des éléments protégés. Toute utilisation, reproduction ou imitation est interdite sans autorisation écrite du Propriétaire.
              </p>
            </div>

            <div className="licences__card">
              <h3 className="licences__card-title">4. Projet commercial</h3>
              <p className="licences__card-text">
                Le Logiciel est un projet commercial. Toute exploitation commerciale, directe ou indirecte, est réservée exclusivement au Propriétaire ou à toute entité juridique qu'il désignera expressément.
              </p>
            </div>

            <div className="licences__card">
              <h3 className="licences__card-title">5. Sanctions</h3>
              <p className="licences__card-text">
                Toute violation expose le contrevenant à des poursuites civiles pour contrefaçon (art. L335-1 CPI), des poursuites pénales (jusqu'à 3 ans d'emprisonnement et 300 000 € d'amende), et le versement de dommages et intérêts.
              </p>
            </div>

            <div className="licences__card">
              <h3 className="licences__card-title">6. Loi applicable</h3>
              <p className="licences__card-text">
                Licence régie par le droit français. Tout litige sera soumis à la compétence exclusive des tribunaux de Bordeaux (France).<br />
                Contact : contact@seriously-app.com
              </p>
            </div>
          </div>

          <div className="licences__techs">
            <h3 className="licences__techs-title">Technologies &amp; licences tierces</h3>
            <div className="licences__techs-grid">
              <div className="licences__tech">
                <span className="licences__tech-name">Ruby on Rails 8.1</span>
                <span className="licences__tech-licence">MIT License</span>
              </div>
              <div className="licences__tech">
                <span className="licences__tech-name">React 19</span>
                <span className="licences__tech-licence">MIT License</span>
              </div>
              <div className="licences__tech">
                <span className="licences__tech-name">Vite 7</span>
                <span className="licences__tech-licence">MIT License</span>
              </div>
              <div className="licences__tech">
                <span className="licences__tech-name">TypeScript 5.9</span>
                <span className="licences__tech-licence">Apache 2.0</span>
              </div>
              <div className="licences__tech">
                <span className="licences__tech-name">Stripe</span>
                <span className="licences__tech-licence">MIT License</span>
              </div>
              <div className="licences__tech">
                <span className="licences__tech-name">Sidekiq &amp; Redis</span>
                <span className="licences__tech-licence">LGPL / BSD</span>
              </div>
              <div className="licences__tech">
                <span className="licences__tech-name">JWT / Bcrypt</span>
                <span className="licences__tech-licence">MIT License</span>
              </div>
              <div className="licences__tech">
                <span className="licences__tech-name">Sentry</span>
                <span className="licences__tech-licence">MIT License</span>
              </div>
            </div>
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
