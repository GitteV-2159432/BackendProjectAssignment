import PageContainer from '../components/PageContainer'
import styles from '../styles/Account.module.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Account = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  //const [password, setPassword] = useState('')
  //const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.accountContainer}>
      <h1>Account</h1>
      <div className={styles.contentWrapper}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
          <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Account
