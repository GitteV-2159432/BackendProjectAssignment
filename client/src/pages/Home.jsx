import styles from '../styles/Home.module.css'
import Logo from '../components/icons/Logo.jsx'
import { Link } from 'react-router-dom'
import useAuth from '../context/useAuth.js'
import TopBar from '../components/TopBar.jsx'

const Home = () => {
    const { token, logout } = useAuth()

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
                        <Link to="/register" className={styles.signUpBtn}>
                            Sign up
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Home
