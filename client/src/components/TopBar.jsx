import useAuth from '../context/useAuth.js'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/TopBar.module.css'

const TopBar = () => {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className={styles.topBar}>
      <div className={styles.topButtons}>
        {token ? (
          <button className={styles.signUpBtn} onClick={logout}>
            Log out
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className={styles.signInLink}
            >
              Sign in
            </button>
            <button
              onClick={() => navigate('/register')}
              className={styles.signUpBtn}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default TopBar
