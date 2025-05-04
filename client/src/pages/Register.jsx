import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/icons/Logo.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from '../styles/Auth.module.css'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

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
        body: JSON.stringify({ firstName,lastName, email, password }),
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
      <TopBar />
      <main className={styles.mainContent}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <div className={styles.contentWrapper}>
          <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <div className={styles.inputRow}>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className={styles.inputRow}>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>

      </main>
    </div>
  )
}
/*
<label htmlFor="firstName">First Name</label>
<label htmlFor="lastName">Last Name</label>
<label htmlFor="email">E-mail</label>
<label htmlFor="Password">Password</label> 
*/
export default Register
