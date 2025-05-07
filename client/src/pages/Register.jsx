import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/icons/Logo.jsx'
import styles from '../styles/Auth.module.css'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        alert('User created! You can now log in.')
        navigate('/login')
      } else {
        alert(data.message || 'Registration failed')
      }
    } catch (err) {
      console.error('Registration error:', err)
      alert('Something went wrong')
    }
  }

  return (
    <div className={styles.authContainer}>
      <main className={styles.mainContent}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <div className={styles.contentWrapper}>
          <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <div className={styles.inputRow}>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                required
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                required
              />
            </div>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <div className={styles.inputRow}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <button type="submit">Sign Up</button>
            <p>
              Already have an account?{' '}
              <Link className={styles.formLink} to="/login">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Register
