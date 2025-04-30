import '../styles/home.css';
import Logo from '../components/Logo.jsx'

const Home = () => {
  return (
    <div className="home-container">
        <Logo/>
      <h1 className="headline">NO EXCUSES.<br />JUST REPS.</h1>
      <p className="subheading">Whether you’re a gym rookie or a seasoned lifter, we’ve got you covered.</p>
      <div className="button-group">
        <button className="btn primary">Sign up</button>
        <button className="btn secondary">Sign in</button>
      </div>
    </div>
  );
}

export default Home;