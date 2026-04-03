import { useState } from 'react'
import './Login.css'

interface LoginProps {
  onLogin: (pin: string) => boolean
}

const Login = ({ onLogin }: LoginProps) => {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!onLogin(pin)) {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__logo">S</div>
        <h1 className="login__title">Seriously Admin</h1>
        <p className="login__subtitle">Accès réservé</p>

        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className={`login__input ${shake ? 'login__input--shake' : ''} ${error ? 'login__input--error' : ''}`}
            type="password"
            placeholder="Code PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autoFocus
          />
          <button className="login__btn" type="submit">
            Connexion
          </button>
        </form>

        {error && <p className="login__error">Code incorrect</p>}
      </div>
    </div>
  )
}

export default Login
