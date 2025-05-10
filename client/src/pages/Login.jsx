import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/icons/Logo.jsx'
import MessageContainer from '../components/MessageContainer.jsx'
import useAuth from '../context/useAuth.js'
import styles from '../styles/Auth.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (res.ok) {
      login(data.token)
      navigate('/dashboard')
    } else {
      setError(data.message || 'Login failed')
    }
  }

  return (
    <div className={styles.authContainer}>
      <main className={styles.mainContent}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <div className={styles.contentWrapper}>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <p className={styles.subheading}>Welcome back! Please log in.</p>
            {error && <MessageContainer role={'alert'} message={error} />}

            <div>
              <label htmlFor="email">E-mail address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <button type="submit">Sign in</button>
            <p>
              Don't have an account?{' '}
              <Link
                className={styles.formLink}
                to="/register"
                aria-label="Sign up for new account"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
