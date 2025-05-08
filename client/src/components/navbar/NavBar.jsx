import AccountIcon from '../icons/AccountIcon.jsx'
import DashboardIcon from '../icons/DashboardIcon.jsx'
import ExercisesIcon from '../icons/ExercisesIcon.jsx'
import Logo from '../icons/Logo.jsx'
import PlansIcon from '../icons/PlansIcon.jsx'
import WorkoutsIcon from '../icons/WorkoutsIcon.jsx'
import NavbarItemsList from './NavbarItemsList.jsx'

const navItems = [
  { title: 'Dashboard', icon: DashboardIcon, to: '/dashboard' },
  { title: 'Plans', icon: PlansIcon, to: '/plans' },
  { title: 'Workouts', icon: WorkoutsIcon, to: '/workouts' },
  { title: 'Exercises', icon: ExercisesIcon, to: '/exercises' },
  { title: 'Account', icon: AccountIcon, to: '/account' },
]

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 overflow-y-auto h-screen w-26 p-2 bg-[#40434E]/50 flex flex-col items-center z-50"
      aria-label="Primary navigation"
    >
      <div className="mb-10">
        <Logo />
      </div>
      <NavbarItemsList items={navItems} />
    </nav>
  )
}

export default Navbar
