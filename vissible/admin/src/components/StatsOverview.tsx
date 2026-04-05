import './StatsOverview.css'

const STATS = [
  { label: 'Utilisateurs', value: '0', trend: '—', icon: '👥' },
  { label: 'Matchs aujourd\'hui', value: '0', trend: '—', icon: '💜' },
  { label: 'Messages envoyés', value: '0', trend: '—', icon: '💬' },
  { label: 'Signalements', value: '0', trend: '—', icon: '🚨' },
]

const RECENT_ACTIVITY = [
  { type: 'info', text: 'Application admin créée', time: 'maintenant' },
  { type: 'info', text: 'En attente de connexion au backend', time: '—' },
]

const StatsOverview = () => {
  return (
    <div className="stats">
      <div className="stats__grid">
        {STATS.map((stat) => (
          <div className="stats__card" key={stat.label}>
            <div className="stats__card-header">
              <span className="stats__card-icon">{stat.icon}</span>
              <span className="stats__card-trend">{stat.trend}</span>
            </div>
            <div className="stats__card-value">{stat.value}</div>
            <div className="stats__card-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="stats__section">
        <h2 className="stats__section-title">Activité récente</h2>
        <div className="stats__activity">
          {RECENT_ACTIVITY.map((item, i) => (
            <div className="stats__activity-item" key={i}>
              <span className={`stats__activity-dot stats__activity-dot--${item.type}`} />
              <span className="stats__activity-text">{item.text}</span>
              <span className="stats__activity-time">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsOverview
