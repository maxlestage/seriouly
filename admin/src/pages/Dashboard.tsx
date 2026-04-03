import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import StatsOverview from '../components/StatsOverview'
import UsersPanel from '../components/UsersPanel'
import ReportsPanel from '../components/ReportsPanel'
import SettingsPanel from '../components/SettingsPanel'
import './Dashboard.css'

interface DashboardProps {
  onLogout: () => void
}

export type Page = 'overview' | 'users' | 'reports' | 'settings'

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [page, setPage] = useState<Page>('overview')

  return (
    <div className="dashboard">
      <Sidebar activePage={page} onNavigate={setPage} onLogout={onLogout} />
      <main className="dashboard__main">
        <header className="dashboard__header">
          <h1 className="dashboard__page-title">
            {page === 'overview' && 'Vue d\'ensemble'}
            {page === 'users' && 'Utilisateurs'}
            {page === 'reports' && 'Signalements'}
            {page === 'settings' && 'Paramètres'}
          </h1>
          <span className="dashboard__date">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </header>
        <div className="dashboard__content">
          {page === 'overview' && <StatsOverview />}
          {page === 'users' && <UsersPanel />}
          {page === 'reports' && <ReportsPanel />}
          {page === 'settings' && <SettingsPanel />}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
