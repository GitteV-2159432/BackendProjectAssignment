import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/icons/Logo.jsx'
import useAuth from '../context/useAuth.js'
import '../styles/auth.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, token } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

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
      alert(data.message)
    }
  }

  return (
    <div className="auth-container">
      <header className="top-bar">
        <div className="top-buttons">
          <Link to="/login" className="sign-in-link">
            Sign in
          </Link>
          <Link to="/register" className="sign-up-btn">
            Sign up
          </Link>
        </div>
      </header>
      <main className="main-content">
        <div className="logo-wrapper">
          <Logo />
        </div>
        <div className="content-wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <h2>Welcome back! Please log in.</h2>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign in</button>
            <p>Don't have an account? <Link className='form-link' to="/register">Sign up</Link></p>
          </form>
        </div>
      </main>
    </div>
  )
}

/**
 * <label htmlFor="email">E-mail</label>
 * <label htmlFor="password">Password</label>
 */

export default Login
