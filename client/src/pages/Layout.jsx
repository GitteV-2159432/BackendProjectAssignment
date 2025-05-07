import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/NavBar.jsx'

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex flex-col w-full ml-26">
        <main className="flex-grow p-6 overflow-x-hidden overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default Layout
