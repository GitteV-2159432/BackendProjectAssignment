import '../styles/home.css'
import Logo from '../components/icons/Logo.jsx'
import { Link } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

const Home = () => {
    const { token, logout } = useAuth()

    return (
        <div className="home-container">
            <header className="top-bar">
                <div className="top-buttons">
                    {token ? (
                        <button className="logout-btn" onClick={logout}>
                        Log out
                      </button>
                    ) : (
                        <>
                            <Link to="/login" className="sign-in-link">
                                Sign in
                            </Link>
                            <Link to="/register" className="sign-up-btn">
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </header>

            <main className="Home__main-content">
                <div className="Home__logo-wrapper">
                    <Logo />
                </div>
                <div className="Home__content-wrapper">
                    <h1 className="headline">
                        NO EXCUSES.
                        <br />
                        JUST REPS.
                    </h1>
                    <p className="subheading">
                        Whether you’re a gym rookie or a seasoned lifter, we’ve got you
                        covered.
                    </p>
                    <div className="cta-group">
                        <p className="cta-text">GET STARTED FOR FREE!</p>
                        <Link to="/register" className="sign-up-btn large">
                            Sign up
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Home
