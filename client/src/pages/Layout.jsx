import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/NavBar.jsx'

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <main className="flex-grow overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
