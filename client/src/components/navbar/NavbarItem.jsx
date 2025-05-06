import { NavLink } from 'react-router-dom'

const NavbarItem = ({ title, icon, to }) => {
  return (
    <NavLink to={to} className="block">
      {({ isActive }) => (
        <div className="flex flex-col items-center gap-1">
          <div
            aria-hidden="true"
            className={`px-4.5 py-1 rounded-full 
              ${isActive ? 'bg-[#C297B8]/50' : ''}`}
          >
            {icon({ isActive })}
          </div>
          <span className={'text-sm font-medium'}>{title}</span>
        </div>
      )}
    </NavLink>
  )
}

export default NavbarItem
