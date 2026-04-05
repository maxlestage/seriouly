import './ReportsPanel.css'

const ReportsPanel = () => {
  return (
    <div className="reports">
      <div className="reports__filters">
        <button className="reports__filter reports__filter--active">Tous</button>
        <button className="reports__filter">En attente</button>
        <button className="reports__filter">Résolus</button>
      </div>

      <div className="reports__empty">
        <div className="reports__empty-icon">🛡️</div>
        <h3>Aucun signalement</h3>
        <p>Les signalements d'utilisateurs apparaitront ici une fois le backend connecté.</p>
      </div>
    </div>
  )
}

export default ReportsPanel
