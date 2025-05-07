import { Link } from 'react-router-dom'
import useAuth from '../context/useAuth.js'
import styles from '../styles/TopBar.module.css'

const TopBar = () => {
  const { token, logout } = useAuth()
  return (
    <header className={styles.topBar}>
      <div className={styles.topButtons}>
        {token ? (
          <button className={styles.signUpBtn} onClick={logout}>
            Log out
          </button>
        ) : (
          <>
            <Link to="/login" className={styles.signInLink}>
              Sign in
            </Link>
            <Link to="/register" className={styles.signUpBtn}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default TopBar
