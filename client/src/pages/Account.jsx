import TopBar from '../components/TopBar.jsx'
import styles from '../styles/Account.module.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'
import fetchWithAuth from '../utils/fetchWithAuth.js'

const Account = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const { getUser, logout } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser()
      if (user) {
        setFirstName(user.firstName || '')
        setLastName(user.lastName || '')
        setEmail(user.email || '')
      }
    }
    fetchUser()
  }, [getUser])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    const user = await getUser()
    if (!user || !user._id) {
      alert('Failed to retrieve user ID')
      logout()
      return
    }

    const updatedData = {
      firstName,
      lastName,
      email,
    }

    if (password) {
      updatedData.password = password
    }

    const { result, error } = await fetchWithAuth(
      `/users/${user._id}`,
      logout,
      {
        method: 'PATCH',
        body: updatedData,
      }
    )

    if (error) {
      console.error('Failed to update user:', error)
      alert('Error updating account')
      return
    }

    alert('Account updated successfully!')
    navigate('/dashboard')
  }

  return (
    <div className={styles.accountContainer}>
      <TopBar />
      <h1 className={styles.heading}>Account</h1>
      <div className={styles.contentWrapper}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder={firstName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder={lastName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <h2 className={styles.sectionTitle}>Change Password</h2>
          <div className={styles.inputRow}>
            <div>
              <label htmlFor="Password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}

export default Account
