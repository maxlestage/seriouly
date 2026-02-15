import './About.css';

const CURRENT_YEAR = new Date().getFullYear();
const BUILD_DATE = new Date().toISOString().slice(0, 10).replace(/-/g, '');

const About = () => {
  return (
    <div className="about">
      <section className="about__hero">
        <div className="about__orb" />
        <div className="about__content">
          <h1 className="about__title">
            À propos de <span className="text-gradient">Seriously</span>
          </h1>
          <p className="about__subtitle">
            Une application de rencontres pensée pour les connexions authentiques.
          </p>
        </div>
      </section>

      <section className="about__section">
        <div className="about__inner">
          <div className="about__card">
            <h2>Notre mission</h2>
            <p>
              Seriously est née d'une conviction simple : les rencontres en ligne méritent mieux.
              Plus de profils vides, plus de swipes sans fin. Ici, chaque interaction compte.
            </p>
          </div>

          <div className="about__card">
            <h2>Comment ça marche</h2>
            <p>
              Votre profil mélange photos et phrases personnelles.
              Les autres peuvent liker un élément précis — une photo, une réponse — pour
              montrer exactement ce qui les a touchés.
            </p>
          </div>

          <div className="about__card">
            <h2>La messagerie</h2>
            <p>
              Double-tap sur un message pour l'aimer. Des conversations vivantes,
              expressives, et naturelles. Comme dans la vraie vie.
            </p>
          </div>

          <div className="about__card">
            <h2>Sécurité</h2>
            <p>
              Vérification de photos, modération intelligente, et respect total
              de votre vie privée. Vos données restent les vôtres.
            </p>
          </div>
        </div>
      </section>

      <section className="about__footer-info">
        <div className="about__version-block">
          <span className="about__version-year">{CURRENT_YEAR}</span>
          <span className="about__version-sep">·</span>
          <span className="about__version-num">Version 1.0.0 — Build #{BUILD_DATE}</span>
        </div>
        <p className="about__legal">
          &copy; {CURRENT_YEAR} Seriously — Lestage Maxime Nathan
        </p>
      </section>
    </div>
  );
};

export default About;
