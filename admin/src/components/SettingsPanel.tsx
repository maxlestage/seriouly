import './SettingsPanel.css'

const SettingsPanel = () => {
  return (
    <div className="settings">
      <div className="settings__section">
        <h2 className="settings__section-title">Application</h2>
        <div className="settings__card">
          <div className="settings__row">
            <div>
              <div className="settings__label">Nom de l'app</div>
              <div className="settings__value">Seriously</div>
            </div>
          </div>
          <div className="settings__row">
            <div>
              <div className="settings__label">Version</div>
              <div className="settings__value">0.0.1</div>
            </div>
          </div>
          <div className="settings__row">
            <div>
              <div className="settings__label">Environnement</div>
              <div className="settings__value">Production</div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings__section">
        <h2 className="settings__section-title">Modération</h2>
        <div className="settings__card">
          <div className="settings__row">
            <div>
              <div className="settings__label">Modération IA</div>
              <div className="settings__desc">Filtrage automatique des contenus inappropriés</div>
            </div>
            <div className="settings__toggle settings__toggle--on">ON</div>
          </div>
          <div className="settings__row">
            <div>
              <div className="settings__label">Vérification photos</div>
              <div className="settings__desc">Vérification d'authenticité des photos de profil</div>
            </div>
            <div className="settings__toggle settings__toggle--on">ON</div>
          </div>
          <div className="settings__row">
            <div>
              <div className="settings__label">Mode maintenance</div>
              <div className="settings__desc">Désactiver l'accès public temporairement</div>
            </div>
            <div className="settings__toggle">OFF</div>
          </div>
        </div>
      </div>

      <div className="settings__section">
        <h2 className="settings__section-title">Sécurité</h2>
        <div className="settings__card">
          <div className="settings__row">
            <div>
              <div className="settings__label">Code PIN admin</div>
              <div className="settings__desc">Modifier le code d'accès au panel</div>
            </div>
            <button className="settings__btn">Modifier</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
