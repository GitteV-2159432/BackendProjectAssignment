import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/NavBar.jsx'

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Navbar />
        <Outlet />
    </div>  
);
}
export default Layout
