import AccountIcon from '../icons/AccountIcon.jsx'
import DashboardIcon from '../icons/DashboardIcon.jsx'
import Logo from '../icons/Logo.jsx'
import PlansIcon from '../icons/PlansIcon.jsx'
import WorkoutsIcon from '../icons/WorkoutsIcon.jsx'
import NavbarItemsList from './NavbarItemsList.jsx'

const navItems = [
  { title: 'Dashboard', icon: DashboardIcon, to: '/dashboard' },
  { title: 'Plans', icon: PlansIcon, to: '/plans' },
  { title: 'Workouts', icon: WorkoutsIcon, to: '/workouts' },
  { title: 'Exercises', icon: WorkoutsIcon, to: '/exercises' },
  { title: 'Account', icon: AccountIcon, to: '/account' },
]

const Navbar = () => {
  return (
    <nav className="flex flex-col items-center h-screen min-w-[10%] w-50 gap-6 px-2 py-6 bg-[#40434E]/50">
      <div className="mb-6">
        <Logo />
      </div>
      <NavbarItemsList items={navItems} />
    </nav>
  )
}

export default Navbar
