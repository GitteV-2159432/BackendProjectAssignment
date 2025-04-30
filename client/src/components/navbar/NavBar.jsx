import Logo from '../icons/Logo.jsx'
import NavbarElement from './NavbarElement.jsx'
import DashboardIcon from '../icons/DashboardIcon.jsx'
import PlansIcon from '../icons/PlansIcon.jsx'
import WorkoutsIcon from '../icons/WorkoutsIcon.jsx'
import AccountIcon from '../icons/AccountIcon.jsx'

const navElements = [
  { title: 'Dashboard', icon: DashboardIcon, to: '/' },
  { title: 'Plans', icon: PlansIcon, to: '/plans' },
  { title: 'Workouts', icon: WorkoutsIcon, to: '/workouts' },
  { title: 'Account', icon: AccountIcon, to: '/account' },
]

const Navbar = () => {
  return (
    <nav className="flex flex-col p-4 gap-2">
      <Logo />
      {navElements.map((el, index) => (
        <NavbarElement key={index} title={el.title} icon={el.icon} to={el.to} />
      ))}
    </nav>
  )
}

export default Navbar
