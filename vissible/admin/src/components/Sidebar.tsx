import type { Page } from '../pages/Dashboard'
import './Sidebar.css'

interface SidebarProps {
  activePage: Page
  onNavigate: (page: Page) => void
  onLogout: () => void
}

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
  { id: 'users', label: 'Utilisateurs', icon: '👥' },
  { id: 'reports', label: 'Signalements', icon: '🚨' },
  { id: 'settings', label: 'Paramètres', icon: '⚙️' },
]

const Sidebar = ({ activePage, onNavigate, onLogout }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">S</div>
        <div>
          <div className="sidebar__name">Seriously</div>
          <div className="sidebar__role">Admin Panel</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`sidebar__item ${activePage === item.id ? 'sidebar__item--active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="sidebar__item-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__status">
          <span className="sidebar__status-dot" />
          <span>En ligne</span>
        </div>
        <button className="sidebar__logout" onClick={onLogout}>
          Déconnexion
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
