import styles from '../styles/Home.module.css'
import Logo from '../components/icons/Logo.jsx'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar.jsx'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.homeContainer}>
      <TopBar />
      <main className={styles.mainContent}>
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
            <button onClick={'/register'} className={styles.signUpBtn}>
              Sign up
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Home
