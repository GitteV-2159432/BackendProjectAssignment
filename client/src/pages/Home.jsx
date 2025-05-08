import { useNavigate } from 'react-router-dom'
import Logo from '../components/icons/Logo.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from '../styles/Home.module.css'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.homeContainer}>
      <TopBar />
      <main role="main" className={styles.mainContent}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <div className={styles.contentWrapper}>
          <h1 className={styles.headline}>
            NO EXCUSES.
            <br />
            JUST REPS.
          </h1>
          <p className={styles.subheadline}>
            Whether you’re a gym rookie or a seasoned lifter, we’ve got you
            covered.
          </p>
          <div className={styles.ctaGroup}>
            <p className={styles.ctaText}>GET STARTED FOR FREE!</p>
            <button
              onClick={() => navigate('/register')}
              className={styles.signUpBtn}
              aria-label="Sign up and create your workout account"
            >
              Sign up
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Home
