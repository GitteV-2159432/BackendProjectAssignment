import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import useAuth from '../context/useAuth.js'
import styles from '../styles/Account.module.css'
import fetchWithAuth from '../utils/fetchWithAuth.js'

const Account = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const { getUser, logout } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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
    setSuccessMessage('')
    setErrorMessage('')

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    const user = await getUser()
    if (!user || !user._id) {
      setErrorMessage('Failed to retrieve user ID.')
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
      setErrorMessage('Error updating account.')
      return
    }

    setSuccessMessage('Account updated successfully!')
  }

  return (
    <div className={styles.accountContainer}>
      <TopBar />
      <h1 className={styles.heading}>Account</h1>
      <div className={styles.contentWrapper}>
        {errorMessage && (
          <div
            role="alert"
            className="px-4 py-2 mb-4 text-red-600 bg-red-100 rounded"
          >
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            aria-live="polite"
            className="px-4 py-2 mb-4 text-green-700 bg-green-100 rounded"
          >
            {successMessage}
          </div>
        )}

        <form role="form" onSubmit={handleSubmit}>
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
                autoComplete="given-name"
                required
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
                autoComplete="family-name"
                required
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
              autoComplete="email"
              required
            />
          </div>
          <h2 className={styles.sectionTitle}>Change Password</h2>
          <div className={styles.inputRow}>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
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
                autoComplete="new-password"
              />
            </div>
          </div>
          <button type="submit" aria-label="Save account information">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default Account
