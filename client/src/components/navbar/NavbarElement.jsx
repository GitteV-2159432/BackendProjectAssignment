import { NavLink } from 'react-router-dom'

const NavbarElement = ({ title, icon: Icon, to }) => {
  return (
    <NavLink
      to={to}
      className="flex items-center gap-2 p-2 rounded transition-colors"
    >
      {({ isActive }) => {
        console.log(isActive)
        return (
          <>
            <Icon isActive={isActive} />
            <p className={isActive ? 'font-bold' : ''}>{title}</p>
          </>
        )
      }}
    </NavLink>
  )
}

export default NavbarElement
