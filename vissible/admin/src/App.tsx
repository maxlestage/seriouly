import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './App.css'

const ADMIN_PIN = '1234' // TODO: remplacer par auth serveur

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const session = sessionStorage.getItem('seriously-admin')
    if (session === 'ok') setAuthenticated(true)
  }, [])

  const handleLogin = (pin: string) => {
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('seriously-admin', 'ok')
      setAuthenticated(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    sessionStorage.removeItem('seriously-admin')
    setAuthenticated(false)
  }

  if (!authenticated) return <Login onLogin={handleLogin} />
  return <Dashboard onLogout={handleLogout} />
}

export default App
